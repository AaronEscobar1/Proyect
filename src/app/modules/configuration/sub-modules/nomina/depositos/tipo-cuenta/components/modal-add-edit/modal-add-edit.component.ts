import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TipoCuenta } from '../../interaces/tipo-cuenta.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TipoCuentaService } from '../../services/tipo-cuenta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para validaciones de valores duplicados 
  @Input() tiposCuentas!: TipoCuenta[];

  // Variable de seleccion para editar
  @Input() tipoCuentaSelect!: TipoCuenta | undefined;

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

  constructor(private tipoCuentaService: TipoCuentaService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      tipcta: ['', [ Validators.required, Validators.maxLength(1), this.validatedId.bind(this) ]],
      descta: ['', [ Validators.required, Validators.maxLength(20) ]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['tipcta'].enable();
      return;
    }
    this.form.controls['tipcta'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.tipoCuentaSelect);
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
    let data: TipoCuenta = this.form.getRawValue();

    this.spinner.show();

    // Editar
    if(this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { tipcta, ...dataUpdate} = data;
      this.tipoCuentaService.update(tipcta, dataUpdate)
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
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el tipo de cuenta.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.tipoCuentaService.create(data)
      .subscribe({
        next: resp => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.selectRowService.selectRow$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el tipo de cuenta.', life: 3000});
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
  get tipctaMsgError(): string {
    const errors = this.form.get('tipcta')?.errors;
    if ( errors?.required )
      return 'El código es obligatorio.';
    else if ( errors?.maxlength )
      return 'El código es de longitud de 1 dígito, formato alfanumérico.';
    else if ( errors?.duplicated )
      return 'El código esta registrado.';
    return '';
  }

  // Mensajes de errores dinamicos
  get desctaMsgError(): string {
    const errors = this.form.get('descta')?.errors;
    if ( errors?.required ) 
      return 'La descripción es obligatoria.';
    else if ( errors?.maxlength ) 
      return 'La descripción es de longitud máxima de 20 dígitos, formato alfanumérico.';
    return '';
  }

  /**
   * Validar id duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.tiposCuentas.findIndex(val => val.tipcta === control.value) > -1 ?
                                      {'duplicated': true} :
                                      null;
  }

}
