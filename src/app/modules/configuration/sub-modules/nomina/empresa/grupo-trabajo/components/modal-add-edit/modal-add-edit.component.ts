import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GrupoTrabajo, dayType } from '../../interfaces/grupo-trabajo.interfaces';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GrupoTrabajoService } from '../../services/grupo-trabajo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() gruposTrabajo!     : GrupoTrabajo[];
  @Input() grupoTrabajoSelect!: GrupoTrabajo | undefined;

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit      : boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  // Objeto
  dayType: dropdownType[] = dayType;

  constructor(private grupoTrabajoService: GrupoTrabajoService, 
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
    this.form.reset(this.grupoTrabajoSelect);
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
    let data: GrupoTrabajo = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.desemp.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      console.log('editar', data);
      this.gruposTrabajo[this.findIndexById(this.form.getRawValue().codtipnom)] = this.form.getRawValue();
      this.spinner.hide();
      this.closeModal();
      return;
    }
    
    // Crear
    console.log('crear', data);
    this.gruposTrabajo.push(data);
    this.spinner.hide();
    this.closeModal();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.gruposTrabajo.length; i++) {
      if (this.gruposTrabajo[i].codtipnom === id) {
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

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

}
