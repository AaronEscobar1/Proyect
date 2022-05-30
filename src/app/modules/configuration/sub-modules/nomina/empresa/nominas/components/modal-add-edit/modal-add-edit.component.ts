import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Nominas, daysData, redondeoData } from '../../interfaces/nominas.interfaces';
import { NominasService } from '../../services/nominas.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styles: [
  ]
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() nominas!    : Nominas[];
  @Input() nominaSelect!: Nominas | undefined;

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit      : boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal = new EventEmitter();
  @Output() onLoadData   = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  days = daysData;
  redondeo = redondeoData;
  
  constructor(private nominasService: NominasService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      codemp: [''],
      desemp: [''],
      codnom: [''],
      desnom: [''],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.controls['codemp'].enable();
      this.form.controls['desemp'].enable();
      this.form.controls['codnom'].enable();
      this.form.controls['desnom'].enable();
      return;
    }
    this.form.controls['codemp'].disable();
    this.form.controls['desemp'].disable();
    this.form.controls['codnom'].disable();
    this.form.controls['desnom'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.nominaSelect);
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
    let data: Nominas = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.desemp.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      console.log('editar', data);
      this.nominas[this.findIndexById(this.form.getRawValue().codemp)] = this.form.getRawValue();
      this.spinner.hide();
      this.closeModal();
      return;
    }
    
    // Crear
    console.log('crear', data);
    this.nominas.push(data);
    this.spinner.hide();
    this.closeModal();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.nominas.length; i++) {
      if (this.nominas[i].codemp === id) {
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
