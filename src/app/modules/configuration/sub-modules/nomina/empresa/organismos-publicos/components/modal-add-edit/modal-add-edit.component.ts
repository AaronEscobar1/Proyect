import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrganismoPublico } from '../../interfaces/organismos-publicos.interfaces';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { OrganismosPublicosService } from '../../services/organismos-publicos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para validaciones de valores duplicados 
  @Input() organismosPublicos!: OrganismoPublico[];

  // Variable de seleccion para editar
  @Input() organismoPublicoSelect!: OrganismoPublico | undefined;

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

  constructor(private organismosPublicosService: OrganismosPublicosService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      codorg: [  , [ Validators.required, Validators.maxLength(10), this.validatedId.bind(this) ]],
      nomorg: [  , [ Validators.required, Validators.maxLength(60) ]],
      siglas: [  , [ Validators.required, Validators.maxLength(20) ]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['codorg'].enable();
      return;
    }
    this.form.controls['codorg'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.organismoPublicoSelect);
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
    let data: OrganismoPublico = this.form.getRawValue();

    this.spinner.show();

    // Editar
    if(this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { codorg, ...dataUpdate } = data;
      this.organismosPublicosService.update(codorg, dataUpdate)
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
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el organismo público.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.organismosPublicosService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el organismo público.', life: 3000});
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
  get codorgMsgError(): string {
    const errors = this.form.get('codorg')?.errors;
    if ( errors?.required )
      return 'El código es obligatorio.';
    else if ( errors?.maxlength )
      return 'El código es de longitud máxima de 10 dígitos, formato alfanumérico.';
    else if ( errors?.duplicated )
      return 'El código esta registrado.';
    return '';
  }

  // Mensajes de errores dinamicos
  get nomorgMsgError(): string {
    const errors = this.form.get('nomorg')?.errors;
    if ( errors?.required ) 
      return 'El nombre es obligatorio.';
    else if ( errors?.maxlength ) 
      return 'El nombre es de longitud máxima de 60 dígitos, formato alfanumérico.';
    return '';
  }

  // Mensajes de errores dinamicos
  get siglasMsgError(): string {
    const errors = this.form.get('siglas')?.errors;
    if ( errors?.required ) 
      return 'La sigla es obligatoria.';
    else if ( errors?.maxlength ) 
      return 'La sigla es de longitud máxima de 20 dígitos, formato alfanumérico.';
    return '';
  }


  /**
   * Validar codigo duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.organismosPublicos.findIndex(val => val.codorg === control.value) > -1 ?
                                          {'duplicated': true} :
                                          null;
  }

}
