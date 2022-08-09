import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { CentroTrabajo } from '../../interfaces/distribucion-impuesto.interfaces';
import { CentroTrabajoService } from '../../services/centro-trabajo.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id para registrar la distribucion de nomina a la empresa asociada
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados 
  @Input() centrosTrabajos: CentroTrabajo[] = [];

  // Variable de seleccion para editar
  @Input() centroTrabajoSelect!: CentroTrabajo | undefined;

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

  constructor(private companyNominaService: CompanyNominaService,
              private centroTrabajoService: CentroTrabajoService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      codcen: [  , [ Validators.required, Validators.maxLength(10), this.validatedId.bind(this) ]],
      descen: [  , [ Validators.required, Validators.maxLength(30) ]],
      facrie: [ 0 , [ Validators.required, this.validateFactor.bind(this) ]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      const initForm = { codcen: '', descen: '', facrie: 0 };
      this.form.reset(initForm);
      this.form.controls['codcen'].enable();
      return;
    }
    this.form.controls['codcen'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.centroTrabajoSelect);
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
    let data: CentroTrabajo = this.form.getRawValue();
    
    this.spinner.show();
    // Editar
    if (this.isEdit) {
      this.centroTrabajoService.update(this.empresaRow.id, data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el centro de trabajo.', life: 3000});
        }
      });
      return;
    }

    // Crear
    // Asignar el id empresa al centro de trabajo para crear
    data.idEmpresa = this.empresaRow.id;

    this.centroTrabajoService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el centro de trabajo.', life: 3000});
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
  
  // Mensajes de errores id
  get codcenMsgError(): string {
    const errors = this.form.get('codcen')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 10 dígitos y formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores nombre
  get descenMsgError(): string {
    const errors = this.form.get('descen')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos y formato alfanumérico.';
    }
    return '';
  }

  // Mensajes de errores nombre
  get facrieMsgError(): string {
    const errors = this.form.get('facrie')?.errors;
    if ( errors?.required ) {
      return 'La factor es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'El factor es de longitud de 3 enteros y 10 decimales, formato númerico.';
    }
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.centrosTrabajos.findIndex(val => val.codcen === control.value) > -1 ?
                                              {'duplicated': true} :
                                              null;
  }

  // Validar que cumpla con la expresión regular 12 numeros enteros y 10 decimales maximo
  validateFactor(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let factorPattern = new RegExp(/^([0-9]{1,3})(\.[0-9]{1,10})?$/g);
    return !factorPattern.test(control.value) ? 
                          {'patternError': true } :
                          null;
  }


}
