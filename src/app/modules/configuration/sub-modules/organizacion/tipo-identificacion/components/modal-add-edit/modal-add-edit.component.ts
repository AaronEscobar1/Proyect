import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TipoIdentificacion } from '../../interfaces/tipo-identificacion.interfaces';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TipoIdentificacionService } from '../../services/tipo-identificacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() tiposIdentificacion!     : TipoIdentificacion[];
  @Input() tipoIdentificacionSelect!: TipoIdentificacion | undefined;

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

  constructor(private tipoIdentificacionService: TipoIdentificacionService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      id: ['', [ Validators.required, Validators.maxLength(2), this.validatedId.bind(this)] ],
      descrip: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesc.bind(this) ]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (!this.isEdit) {
      this.form.controls['id'].enable();
      return;
    }
    this.form.controls['id'].disable();
    this.form.reset(this.tipoIdentificacionSelect); 
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: TipoIdentificacion = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.descrip.trim();
    
    this.spinner.show();
    
    if (this.isEdit) {
      // Editar
      this.tipoIdentificacionService.update(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.selectRowService.selectRow$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el tipo de identificación.', life: 3000});
        }
      });
      return;
    }

    // Crear
    this.tipoIdentificacionService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.selectRowService.selectRow$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo creado el tipo de identificación.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid( campo: string ) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

  // Mensajes de errores dinamicos
  get idMsgError(): string {
    const errors = this.form.get('id')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud de 2 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get descripMsgError(): string {
    const errors = this.form.get('descrip')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
    }
    return '';
  }

  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.tiposIdentificacion.findIndex(val => val.id === control.value) > -1 ?
                                              {'duplicated': true} :
                                              null;
  }

  validatedDesc(control: AbstractControl): ValidationErrors | null {
    // Validaciones para crear
    if ( !this.isEdit ) {
      if ( !control.value ) { return null; }
      return this.tiposIdentificacion.findIndex(val => val.descrip.trim().toLowerCase() === control.value.trim().toLowerCase()) > -1 ? 
                                                {'duplicated': true} :
                                                null;
    }
    // Validaciones para editar 
    if ( this.form.getRawValue().descrip == null ) { return null; }
    return this.tiposIdentificacion.findIndex(val => val.descrip.trim().toLowerCase() === this.form.getRawValue().descrip.trim().toLowerCase() && 
                                              val.id !== this.form.getRawValue().id) > -1 ? 
                                              {'duplicated': true} :
                                              null;
  }

}
