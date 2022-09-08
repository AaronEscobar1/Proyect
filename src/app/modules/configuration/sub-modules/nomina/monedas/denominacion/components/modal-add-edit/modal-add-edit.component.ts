import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { DenominacionMoneda } from '../../interfaces/denominacion-moneda.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { DenominacionService } from '../../services/denominacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { TipoMoneda } from '../../../tipos-monedas/interfaces/tipo-moneda.interfaces';
import { Helpers } from 'src/app/shared/helpers/helpers';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Tipo moneda seleccionada desde la tabla
  @Input() tipoMonedaRow!:  TipoMoneda;

  // Objeto para validaciones de valores duplicados 
  @Input() denominacionesMonedas!: DenominacionMoneda[];

  // Variable de seleccion para editar
  @Input() denominacionMonedaSelect!: DenominacionMoneda | undefined;

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

  // Definir el día máximo habilitado en el Calendar
  maxDate!: Date;

  constructor(private companyNominaService: CompanyNominaService,
              private denominacionService: DenominacionService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private helpers: Helpers,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa : [  ],
      idNomina  : [  ],
      idMoneda  : [  ],
      fvigencia : [  , [ Validators.required, this.validateDate.bind(this) ]],
      valor     : [  , [ Validators.required, this.validateValor.bind(this)]],
      nombre    : [  , [ Validators.required, Validators.maxLength(64) ]]
    });
  }

  ngOnInit(): void {
    this.maxDate = new Date();
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['fvigencia'].enable();
      return;
    }
    // Deshabilitamos los campos que no se pueden editar
    this.form.controls['fvigencia'].disable();
    // Comprobar si la denominación tiene fecha para darle formato y establecerlo en el formulario
    if ( this.denominacionMonedaSelect && this.denominacionMonedaSelect.fvigencia ) {
      this.denominacionMonedaSelect.fvigencia = new Date(this.denominacionMonedaSelect.fvigencia);
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.denominacionMonedaSelect);
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
    let data: DenominacionMoneda = this.form.getRawValue();
    // Formatear fecha para crear 
    data.fvigencia = `${new Date(data.fvigencia).toISOString().slice(0, 10)}T10:10:10`;

    this.spinner.show();

    // Editar
    if(this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idEmpresa, idNomina, idMoneda, fvigencia, ...dataUpdate} = data;
      this.denominacionService.update(data, dataUpdate)
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
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la denominación.', life: 3000});
          } 
        });
      return;
    }
    
    // Asignar el idEmpresa e idNomina para crear situación
    data.idEmpresa = this.empresaRow.id;
    data.idNomina = this.nominaRow.tipnom;
    data.idMoneda = this.tipoMonedaRow.id;
    // Crear
    this.denominacionService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la denominación.', life: 3000});
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
  get fvigenciaMsgError(): string {
    const errors = this.form.get('fvigencia')?.errors;
    if ( errors?.required ) {
      return 'La fecha es obligatoria.';
    } else if ( errors?.duplicated ) {
      return 'La fecha esta registrada.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get valorMsgError(): string {
    const errors = this.form.get('valor')?.errors;
    if ( errors?.required ) {
      return 'El valor es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'El valor es de longitud de 5 enteros y 2 decimales, formato numérico.';
    }
    return '';
  }

  get nombreMsgError(): string {
    const errors = this.form.get('nombre')?.errors;
    if ( errors?.required ) {
      return 'La denominación es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La denominación es de longitud máxima de 64 dígitos, formato alfanumérico.';
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
    const fechaFormateada = this.helpers.formatDateCompleta(fecha);
    const duplicated = this.denominacionesMonedas.findIndex(val => {
      const fecha: Date = new Date(val.fvigencia);
      // Fecha desde base de datos formateada para poder validar
      const fechaBackendFormateada = this.helpers.formatDateCompleta(fecha);
      return fechaBackendFormateada === fechaFormateada;
    });
    if (duplicated > -1) {
      return {'duplicated': true};
    }
    return null;
  }

  // Validar que cumpla con la expresión regular 5 numeros enteros y 2 decimales maximo
  validateValor(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let capitalPattern = new RegExp(/^([0-9]{1,5})(\.[0-9]{1,2})?$/g);
    return !capitalPattern.test(control.value) ? 
                              {'patternError': true } :
                              null;
  }

}
