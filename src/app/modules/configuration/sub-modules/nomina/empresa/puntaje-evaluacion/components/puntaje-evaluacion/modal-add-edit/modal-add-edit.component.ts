import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../shared-empresa/interfaces/nominas.interfaces';
import { PuntajeEvaluacion, PuntajeEvaluacionUpdate } from '../../../interfaces/puntaje-evaluacion.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { PuntajeEvaluacionService } from '../../../services/puntaje-evaluacion.service';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto de puntajes de evaluación por empresa y nomina
  @Input() puntajesEvaluacion: PuntajeEvaluacion[] = [];

  // Objeto seleccionado para editar
  @Input() puntajeEvaluacionSelect!: PuntajeEvaluacion | undefined;

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

  constructor(private companyNominaService: CompanyNominaService,
              private puntajeEvaluacionService: PuntajeEvaluacionService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa: [ ],
      idNomina:  [ ],
      codpun:    [  , [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ] ],
      despun:    [  , [ Validators.required, Validators.maxLength(30) ] ],
      aumpun:    [ ]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      const initForm = { codpun: '', despun: '', aumpun: false };
      this.form.reset(initForm);
      this.form.controls['codpun'].enable();
      return;
    }
    this.form.controls['codpun'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.puntajeEvaluacionSelect);
    // Validamos si la propiedad aumpun es = 1, si es = 1 le asignamos true para marcar el check
    (this.puntajeEvaluacionSelect && this.puntajeEvaluacionSelect.aumpun) === "1" ? this.form.controls['aumpun'].reset(true) : this.form.controls['aumpun'].reset(false);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: PuntajeEvaluacion = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.aumpun = data.aumpun ? "1" : "0";
    
    this.spinner.show();

    if (this.isEdit) {
      // Editar
      const dataUpdate: PuntajeEvaluacionUpdate = { aumpun: data.aumpun, despun: data.despun };
      this.puntajeEvaluacionService.update(data, dataUpdate)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el puntaje de evaluación.', life: 3000});
        }
      });
      return;
    }
    
    // Crear
    // Asignar idEmpresa y idNomina a la data
    data.idEmpresa = this.empresaRow.id;
    data.idNomina = this.nominaRow.tipnom;
    this.puntajeEvaluacionService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el puntaje de evaluación.', life: 3000});
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
  get codpunMsgError(): string {
    const errors = this.form.get('codpun')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 4 dígitos, formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores id
  get despunMsgError(): string {
    const errors = this.form.get('despun')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos, formato alfanumérico.';
    } 
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.puntajesEvaluacion.findIndex(val => val.codpun === control.value) > -1 ?
                                        {'duplicated': true} :
                                        null;
  }

}
