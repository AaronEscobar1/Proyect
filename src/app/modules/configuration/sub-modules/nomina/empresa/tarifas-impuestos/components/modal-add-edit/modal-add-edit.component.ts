import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TarifaImpuesto, TipoTarifa, FrecuenciaImpuesto, TarifaImpuestoUpdate } from '../../interfaces/tarifas-impuestos.interfaces';
import { FormGroup, FormBuilder, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { TarifasImpuestosService } from '../../services/tarifas-impuestos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { Helpers } from 'src/app/shared/helpers/helpers';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['modal-add-edit.component.scss']
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados 
  @Input() tarifasImpuestos: TarifaImpuesto[] = [];

  // Variable de seleccion para editar
  @Input() tarifaImpuestoSelect!: TarifaImpuesto | undefined;

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

  // Objeto de tipos tarifas de impuesto
  @Input() tiposTarifas: TipoTarifa[] = [];

  // Objeto de frecuencia de impuesto
  @Input() frecuenciasImpuesto: FrecuenciaImpuesto[] = [];

  constructor(private companyNominaService: CompanyNominaService,
              private tarifasImpuestosService: TarifasImpuestosService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      idEmpresa: [  ],
      // Año y mes
      anomes:    [  , [ Validators.required, this.validateDate.bind(this) ] ],
      // Remuneracion
      remdes:    [  , [ Validators.required, this.validateRem.bind(this) ] ],
      remhas:    [  , [ Validators.required, this.validateRem.bind(this) ] ],
      // Tipos
      tipreg:    [  , [ Validators.required ] ],
      frecue:    [  , [ Validators.required ] ],
      // Tasa imponible
      tasim1:    [  , [ this.validateTas.bind(this) ]],
      tasim2:    [  , [ this.validateTas.bind(this) ]],
      // Valor sustraendo
      valsus:    [  , [ this.validateValsus.bind(this) ]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      const formInit = { tipreg: '0', frecue: '0' };
      this.form.reset(formInit);
      this.form.controls['anomes'].enable();
      this.form.controls['remdes'].enable();
      this.form.controls['remhas'].enable();
      this.form.controls['tipreg'].enable();
      this.form.controls['frecue'].enable();
      return;
    }
    // Deshabilitamos los campos que no se pueden editar
    this.form.controls['anomes'].disable();
    this.form.controls['remdes'].disable();
    this.form.controls['remhas'].disable();
    this.form.controls['tipreg'].disable();
    this.form.controls['frecue'].disable();
    // Comprobar si la tarifa tiene fecha para darle formato y establecerlo en el formulario
    if ( this.tarifaImpuestoSelect && this.tarifaImpuestoSelect.anomes ) {
      this.tarifaImpuestoSelect.anomes = new Date(this.tarifaImpuestoSelect.anomes);
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.tarifaImpuestoSelect);
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
    let data: TarifaImpuesto = this.form.getRawValue();
    // Formatear fecha para crear 
    data.anomes = `${new Date(data.anomes).toISOString().slice(0, 10)}T00:00:00`;
    // Validar valores desde y hasta
    if( Number(data.remdes) >= Number(data.remhas) ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'El valor desde no puede ser mayor o igual al valor hasta.', life: 3000});
      return;
    }

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      const dataUpdate: TarifaImpuestoUpdate = { tasim1: data.tasim1, tasim2: data.tasim2, valsus: data.valsus };
      this.tarifasImpuestosService.update(data, dataUpdate)
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
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la tarifa de impuesto.', life: 3000});
          } 
        });
      return;
    }
    
    // Crear
    // Asignar el id empresa al centro de trabajo para crear
    data.idEmpresa = this.empresaRow ? this.empresaRow.id: '';
    this.tarifasImpuestosService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la tarifa de impuesto.', life: 3000});
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
  get anomesMsgError(): string {
    const errors = this.form.get('anomes')?.errors;
    if ( errors?.required ) {
      return 'La fecha es obligatoria.';
    } else if ( errors?.duplicated ) {
      return 'La fecha esta registrada.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get remdesMsgError(): string {
    const errors = this.form.get('remdes')?.errors;
    if ( errors?.required ) {
      return 'El valor desde es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'El valor desde es de longitud máxima de 12 enteros y 2 decimales, formato numérico.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get remhasMsgError(): string {
    const errors = this.form.get('remhas')?.errors;
    if ( errors?.required ) {
      return 'El valor hasta es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'El valor hasta es de longitud máxima de 12 enteros y 2 decimales, formato numérico.';
    }
    return '';
  }

  /**
   * Validar fecha duplicada
   * @param control 
   * @returns ValidationErrors | null
   */ 
  validateDate(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    const fecha: Date = control.value;
    // Fecha desde el formulario formateada
    const fechaFormateada = this.helpers.formatDate(fecha);
    const duplicated = this.tarifasImpuestos.findIndex(val => {
      const fecha: Date = new Date(val.anomes);
      // Fecha desde base de datos formateada para poder validar
      const fechaBackendFormateada = this.helpers.formatDate(fecha);
      return fechaBackendFormateada === fechaFormateada
    });
    if (duplicated > -1) {
      return {'duplicated': true};
    }
    return null;
  }

  // Validar que cumpla con la expresión regular 12 números enteros y 2 decimales máximos
  validateRem(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,12})(\.[0-9]{1,2})?$/g);
    return !valuePattern.test(control.value) ?
                      {'patternError': true } :
                      null;
  }

  // Validar que cumpla con la expresión regular 3 números enteros y 2 decimales máximos
  validateTas(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,3})(\.[0-9]{1,2})?$/g);
    return !valuePattern.test(control.value) ?
                      {'patternError': true } :
                      null;
  }

  // Validar que cumpla con la expresión regular 12 números enteros y 2 decimales máximos
  validateValsus(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,12})(\.[0-9]{1,2})?$/g);
    return !valuePattern.test(control.value) ?
                      {'patternError': true } :
                      null;
  }

}
