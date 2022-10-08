import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AumentoEvaluacion } from '../../../interfaces/aumento-evaluacion.interfaces';
import { PuntajeEvaluacion } from '../../../interfaces/puntaje-evaluacion.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AumentoEvaluacionService } from '../../../services/aumento-evaluacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-add-edit-aumento',
  templateUrl: './modal-add-edit-aumento.component.html'
})
export class ModalAddEditAumentoComponent implements OnInit {

  // Objeto seleccionado en la tabla puntaje de evaluación para obtener el idEmpresa e idNomina
  @Input() puntajeEvaluacionSelectRow!: PuntajeEvaluacion;

  // Objeto de aumento por evaluación
  @Input() aumentoEvaluacion: AumentoEvaluacion[] = [];

  // Objeto seleccionado para editar
  @Input() aumentoEvaluacionSelect!: AumentoEvaluacion | undefined;

  // Objeto para mostrar conceptos en el dropdown
  // TODO: Crear interfaz de concepto y consumir el endpoint que trae la data de base de datos
  conceptos: any[] = [];

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

  constructor(private aumentoEvaluacionService: AumentoEvaluacionService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa:    [ ],
      idNomina:     [ ],
      idEvaluacion: [ ],
      idConcepto:   [  , [ Validators.required, this.validatedIdConcepto.bind(this) ]],
      moncto:       [  , [ Validators.required, this.validateMonto.bind(this) ]],
      cancto:       [  , [ Validators.required, this.validateCantidad.bind(this) ]],
      facsue:       [  , [ Validators.required, this.validateFactor.bind(this) ]],
      incsue:       [  , [ Validators.required, this.validateIncremento.bind(this) ]]
    });
  }

  ngOnInit(): void {
    // TODO: Consumir el endpoint que trae la data de base de datos
    this.conceptos = [
      { label: 'concepto 1',  value: 1  },
      { label: 'concepto 2',  value: 2  },
      { label: 'concepto 99', value: 99 },
    ]
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['idConcepto'].enable();
      return;
    }
    this.form.controls['idConcepto'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.aumentoEvaluacionSelect);
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
    let data: AumentoEvaluacion = this.form.getRawValue();

    if ( !this.puntajeEvaluacionSelectRow ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se ha seleccionado un puntaje de evaluación.', life: 3000});
      return;
    }

    this.spinner.show();

    // Editar
    if (this.isEdit) {
      const { idEmpresa, idNomina, idEvaluacion, idConcepto, ...dataUpdate } = data;
      this.aumentoEvaluacionService.update(data, dataUpdate)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.aumentoEvaluacionService.selectRowAumento$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el aumento por evaluación.', life: 3000});
        }
      });
      return;
    }
    
    // Asignar idEmpresa, idNomina y idEvaluacion a la data
    data.idEmpresa = this.puntajeEvaluacionSelectRow.idEmpresa;
    data.idNomina = this.puntajeEvaluacionSelectRow.idNomina;
    data.idEvaluacion = this.puntajeEvaluacionSelectRow.codpun;
    // Crear
    this.aumentoEvaluacionService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.aumentoEvaluacionService.selectRowAumento$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el aumento por evaluación.', life: 3000});
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

  // Mensajes de errores id concepto
  get idConceptoMsgError() : string {
    const errors = this.form.get('idConcepto')?.errors;
    if ( errors?.required ) {
      return 'El concepto es obligatorio.';
    } else if ( errors?.duplicated ) {
      return 'El concepto ya existe.';
    }
    return '';
  }

  // Mensajes de errores monto
  get monctoMsgError(): string {
    const errors = this.form.get('moncto')?.errors;
    if ( errors?.required ) {
      return 'El monto es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'El monto es de longitud de 12 enteros y 2 decimales, formato númerico.';
    }
    return '';
  }
  
  // Mensajes de errores cantidad
  get canctoMsgError(): string {
    const errors = this.form.get('cancto')?.errors;
    if ( errors?.required ) {
      return 'La cantidad es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'La cantidad es de longitud de 4 enteros y 3 decimales, formato númerico.';
    }
    return '';
  }

  // Mensajes de errores factor
  get facsueMsgError(): string {
    const errors = this.form.get('facsue')?.errors;
    if ( errors?.required ) {
      return 'El factor es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'El factor es de longitud de 3 enteros y 10 decimales, formato númerico.';
    }
    return '';
  }

  // Mensajes de errores incremento
  get incsueMsgError(): string {
    const errors = this.form.get('incsue')?.errors;
    if ( errors?.required ) {
      return 'El incremento es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'El incremento es de longitud de 7 enteros y 5 decimales, formato númerico.';
    }
    return '';
  }

  // Validar si esta duplicado el id concepto
  validatedIdConcepto(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.aumentoEvaluacion.findIndex(val => val.idConcepto === control.value) > -1 ?
                                            {'duplicated': true} :
                                            null;
  }

  // Validar que cumpla con la expresión regular 12 numeros enteros y 2 decimales maximo
  validateMonto(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let montoPattern = new RegExp(/^([0-9]{1,12})(\.[0-9]{1,2})?$/g);
    return !montoPattern.test(control.value) ? 
                      {'patternError': true } :
                      null;
  }

  // Validar que cumpla con la expresión regular 4 numeros enteros y 3 decimales maximo
  validateCantidad(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let cantidadPattern = new RegExp(/^([0-9]{1,4})(\.[0-9]{1,3})?$/g);
    return !cantidadPattern.test(control.value) ? 
                        {'patternError': true } :
                        null;
  }

  // Validar que cumpla con la expresión regular 3 numeros enteros y 10 decimales maximo
  validateFactor(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let factorPattern = new RegExp(/^([0-9]{1,3})(\.[0-9]{1,10})?$/g);
    return !factorPattern.test(control.value) ? 
                        {'patternError': true } :
                        null;
  }

  // Validar que cumpla con la expresión regular 7 numeros enteros y 5 decimales maximo
  validateIncremento(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let factorPattern = new RegExp(/^([0-9]{1,7})(\.[0-9]{1,5})?$/g);
    return !factorPattern.test(control.value) ? 
                        {'patternError': true } :
                        null;
  }

}
