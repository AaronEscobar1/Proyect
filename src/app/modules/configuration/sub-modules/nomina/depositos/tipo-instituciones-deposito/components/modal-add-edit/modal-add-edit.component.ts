import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { TipoInstitucion } from '../../interfaces/tipo-instituciones-deposito.interfaces';
import { TipoInstitucionesDepositoService } from '../../services/tipo-instituciones-deposito.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados 
  @Input() tiposInstituciones: TipoInstitucion[] = [];

  // Variable de seleccion para editar
  @Input() tipoInstitucionSelect!: TipoInstitucion | undefined;

  // Objeto de clases instituciones depositos
  @Input() clasificaciones!: any;

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

  // Variable para obtener el form group de nmClaseTipoInstitucionTb y a su vez validar si el campo de los controles tiene errores
  get nmClaseTipoInstitucionTbFormGroup() {
    return this.form.controls['nmClaseTipoInstitucionTb'] as FormGroup;
  }

  constructor(private companyNominaService: CompanyNominaService, 
              private tipoInstitucionesDepositoService: TipoInstitucionesDepositoService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa: [ ],
      codtip:    ['', [ Validators.required, Validators.maxLength(2), this.validatedId.bind(this) ]],
      destip:    ['', [ Validators.required, Validators.maxLength(30) ]],
      nmClaseTipoInstitucionTb: this.fb.group({
        clatip:  [  , [ Validators.required ] ]
      })
    });
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      const initForm = { codtip: '', destip: '', nmClaseTipoInstitucionTb: { clatip: '0' } };
      this.form.reset(initForm);
      this.form.controls['codtip'].enable();
      return;
    }
    this.form.controls['codtip'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.tipoInstitucionSelect);
  }
  
  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
   save(): void {
    if ( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: TipoInstitucion = this.form.getRawValue();

    this.spinner.show();

    if (this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idEmpresa, codtip, ...dataUpdate} = data;
      this.tipoInstitucionesDepositoService.update(data, dataUpdate)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.companyNominaService.selectRowThirdTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el tipo institución deposito.', life: 3000});
        }
      });
      return;
    }
    
    // Crear
    // Asignar el id empresa al centro de trabajo para crear
    data.idEmpresa = this.empresaRow.id;
    this.tipoInstitucionesDepositoService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.companyNominaService.selectRowThirdTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el tipo institución deposito.', life: 3000});
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
  get codtipMsgError(): string {
    const errors = this.form.get('codtip')?.errors;
    if ( errors?.required )
      return 'El código es obligatorio.';
    else if ( errors?.maxlength )
      return 'El código es de longitud máxima de 2 dígitos, formato alfanumérico.';
    else if ( errors?.duplicated )
      return 'El código esta registrado.';
    return '';
  }

  // Mensajes de errores dinamicos
  get destipMsgError(): string {
    const errors = this.form.get('destip')?.errors;
    if ( errors?.required ) 
      return 'La descripción es obligatoria.';
    else if ( errors?.maxlength ) 
      return 'La descripción es de longitud máxima de 30 dígitos, formato alfanumérico.';
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.tiposInstituciones.findIndex(val => val.codtip === control.value) > -1 ?
                                            {'duplicated': true} :
                                            null;
  }

}
