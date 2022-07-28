import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RotacionGrupo } from '../../interfaces/rotacion-grupo.interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RotacionGrupoService } from '../../services/rotacion-grupo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { tipoJornadaData } from '../../../grupo-trabajo/interfaces/grupo-trabajo.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss']
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() rotacionGrupos!     : RotacionGrupo[];
  @Input() rotacionGrupoSelect!: RotacionGrupo | undefined;

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit      : boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Modal rotación
  titleModalRotacion: string = 'Rotación de grupos';
  rotacionModal: boolean = false;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  // Objeto
  dayType: dropdownType[] = tipoJornadaData;

  constructor(private rotacionGrupoService: RotacionGrupoService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      codemp: [''],
      desemp: [''],
      codtipnom: [''],
      destipnom: ['']
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.controls['codemp'].enable();
      this.form.controls['desemp'].enable();
      this.form.controls['codtipnom'].enable();
      this.form.controls['destipnom'].enable();
      return;
    }
    this.form.controls['codemp'].disable();
    this.form.controls['desemp'].disable();
    this.form.controls['codtipnom'].disable();
    this.form.controls['destipnom'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.rotacionGrupoSelect);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    console.log('formulario', this.form.getRawValue());
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: RotacionGrupo = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.desemp.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      console.log('editar', data);
      this.rotacionGrupos[this.findIndexById(this.form.getRawValue().codtipnom)] = this.form.getRawValue();
      this.spinner.hide();
      this.closeModal();
      return;
    }
    
    // Crear
    console.log('crear', data);
    this.rotacionGrupos.push(data);
    this.spinner.hide();
    this.closeModal();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.rotacionGrupos.length; i++) {
      if (this.rotacionGrupos[i].codtipnom === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
    this.selectRowService.selectRow$.emit(null);
  }

  // Abrir modal rotación
  openModalRotacion(): void {
    this.rotacionModal = true;
  }

  // Cerrar modal rotación
  closeModalRotacion(): void {
    this.rotacionModal = false;
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

}
