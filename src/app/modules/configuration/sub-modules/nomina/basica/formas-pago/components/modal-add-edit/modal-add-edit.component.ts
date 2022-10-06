import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { FormasPago } from '../../interfaces/formas-pago.interfaces';
import { FormasPagoService } from '../../services/formas-pago.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para validaciones de valores duplicados
  @Input() formasPagos: FormasPago[] = [];

  // Variable de seleccion para editar
  @Input() formaPagoSelect!: FormasPago | undefined;

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit: boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  constructor(private formasPagoService: FormasPagoService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
      this.form = this.fb.group({
        codpag: ['', [ Validators.required, Validators.maxLength(1), this.validatedId.bind(this) ]],
        despag: ['', [ Validators.required, Validators.maxLength(30), this.validatedDespag.bind(this)]]
      });
  }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['codpag'].enable();
      return;
    }
    this.form.controls['codpag'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.formaPagoSelect);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
   save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: FormasPago = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.despag.trim();

    this.spinner.show();

    // Editar
    if(this.isEdit) {
      const { codpag, ...dataUpdate } = data;
      this.formasPagoService.update(data, dataUpdate)
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
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la forma de pago.', life: 3000});
          }
        });
      return;
    } 

    this.formasPagoService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la forma de pago.', life: 3000});
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
   campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

  // Mensajes de errores dinamicos
  get codpagMsgError(): string {
    const errors = this.form.get('codpag')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 1 dígito.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get despagMsgError(): string {
    const errors = this.form.get('despag')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
    }
    return '';
  }

  /**
   * Validar id duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
      const duplicated = this.formasPagos.findIndex(formapago => formapago.codpag === control.value);
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
  }

   /**
   * Validar descripcion duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedDespag(control: AbstractControl): ValidationErrors | null {
    if (this.isEdit) {
      if ( !control.value ) { return null; }
      const duplicatedEdit = this.formasPagos.findIndex(
        formaPago => formaPago.despag.trim().toLowerCase() === this.form.getRawValue().despag.trim().toLowerCase() 
                  && formaPago.codpag !== this.form.getRawValue().codpag
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    }
    if( !control.value ) { return null; }
    const duplicated = this.formasPagos.findIndex(formaPago => formaPago.despag.trim().toLowerCase() === control.value.trim().toLowerCase());
    if (duplicated > -1) {
      return {'duplicated': true};
    }
    return null;
  }
}
