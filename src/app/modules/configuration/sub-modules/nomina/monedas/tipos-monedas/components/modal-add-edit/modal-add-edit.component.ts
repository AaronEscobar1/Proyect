import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TipoMoneda } from '../../interfaces/tipo-moneda.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TipoMonedaService } from '../../services/tipo-moneda.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para validaciones de valores duplicados 
  @Input() tiposMonedas!: TipoMoneda[];

  // Variable de seleccion para editar
  @Input() tipoMonedaSelect!: TipoMoneda | undefined;

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

  constructor(private tipoMonedaService: TipoMonedaService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      id:        [  , [ Validators.required, Validators.maxLength(10), this.validatedId.bind(this) ]],
      nombre:    [  , [ Validators.required, Validators.maxLength(60) ]],
      simbolo:   [  , [ Validators.required, Validators.maxLength(10) ]],
      codigoiso: [  , [ Validators.maxLength(10) ]]
    });
  }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['id'].enable();
      return;
    }
    this.form.controls['id'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.tipoMonedaSelect);
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
    let data: TipoMoneda = this.form.getRawValue();

    this.spinner.show();

    // Editar
    if(this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { id, ...dataUpdate} = data;
      this.tipoMonedaService.update(id, dataUpdate)
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
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el tipo de moneda.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.tipoMonedaService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el tipo de moneda.', life: 3000});
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
  get idMsgError(): string {
    const errors = this.form.get('id')?.errors;
    if ( errors?.required )
      return 'El código es obligatorio.';
    else if ( errors?.maxlength )
      return 'El código es de longitud máxima de 10 dígitos, formato alfanumérico.';
    else if ( errors?.duplicated )
      return 'El código esta registrado.';
    return '';
  }

  // Mensajes de errores dinamicos
  get nombreMsgError(): string {
    const errors = this.form.get('nombre')?.errors;
    if ( errors?.required ) 
      return 'La descripción es obligatoria.';
    else if ( errors?.maxlength ) 
      return 'La descripción es de longitud máxima de 60 dígitos, formato alfanumérico.';
    return '';
  }

  // Mensajes de errores dinamicos
  get simboloMsgError(): string {
    const errors = this.form.get('simbolo')?.errors;
    if ( errors?.required ) 
      return 'El símbolo es obligatorio.';
    else if ( errors?.maxlength ) 
      return 'El símbolo es de longitud máxima de 10 dígitos, formato alfanumérico.';
    return '';
  }


  /**
   * Validar id duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.tiposMonedas.findIndex(val => val.id === control.value) > -1 ?
                                      {'duplicated': true} :
                                      null;
  }

}
