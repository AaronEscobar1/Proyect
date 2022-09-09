import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { FactorConversion, FactorConversionCreate } from '../../interfaces/factor.interfaces';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TipoMoneda } from '../../../tipos-monedas/interfaces/tipo-moneda.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { FactorService } from '../../services/factor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados
  @Input() factoresConversion: FactorConversion[] = [];

  // Variable de seleccion para editar
  @Input() factorConversionSelect!: FactorConversion | undefined;

  // Objeto tipos de monedas
  @Input() tiposMonedas: TipoMoneda[] = [];

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
              private factorService: FactorService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa:    [  ],
      idMonOrigen:  [  , [ Validators.required, Validators.pattern('[0-9]{1,10}') ] ],
      idMonDestino: [  , [ Validators.required, Validators.pattern('[0-9]{1,10}') ] ],
      fvigencia:    [  , [ Validators.required ]],
      factconv:     [  , [ Validators.required, this.validateFactor.bind(this) ]],
      valorred:     ['1']
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      const initForm = { valorred: '1' };
      this.form.reset(initForm);
      this.form.controls['idMonOrigen'].enable();
      this.form.controls['idMonDestino'].enable();
      this.form.controls['fvigencia'].enable();
      return;
    }
    this.form.controls['idMonOrigen'].disable();
    this.form.controls['idMonDestino'].disable();
    this.form.controls['fvigencia'].disable();
    // Comprobar si el factor conversion tiene fecha para darle formato y establecerlo en el formulario
    if ( this.factorConversionSelect && this.factorConversionSelect.fvigencia ) {
      this.factorConversionSelect.fvigencia = new Date(this.factorConversionSelect.fvigencia);
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.factorConversionSelect);
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
    let data: FactorConversionCreate = this.form.getRawValue();
    // Formatear fecha para crear 
    data.fvigencia = `${new Date(data.fvigencia).toISOString().slice(0, 10)}T10:10:10`;

    this.spinner.show();

    // Editar
    if (this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idEmpresa, idMonOrigen, fvigencia, idMonDestino, ...dataUpdate } = data;
      this.factorService.update(data, dataUpdate)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el factor de conversión.', life: 3000});
        }
      });
      return;
    }
    
    // Asignarle el id empresa al formulario
    data.idEmpresa = this.empresaRow.id;
    // Crear
    this.factorService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.companyNominaService.selectRowThirdTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          if (err.error.detail.includes("ya existente") ) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo crear, factor de conversión ya existente.', life: 3000});
            this.spinner.hide();
            return false;
          }
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el factor de conversión.', life: 3000});
          return false;
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

  // Mensajes de errores
  get idMonOrigenMsgError(): string {
    const errors = this.form.get('idMonOrigen')?.errors;
    if ( errors?.required ) {
      return 'La moneda origen es obligatoria.';
    } else if ( errors?.pattern ) {
      return 'La moneda origen es de longitud máxima de 10 dígitos, formato numérico.';
    }
    return '';
  }

  // Mensajes de errores
  get idMonDestinoMsgError(): string {
    const errors = this.form.get('idMonDestino')?.errors;
    if ( errors?.required ) {
      return 'La moneda destino es obligatoria.';
    } else if ( errors?.pattern ) {
      return 'La moneda destino es de longitud máxima de 10 dígitos, formato numérico.';
    }
    return '';
  }

  // Mensajes de errores
  get factconvMsgError(): string {
    const errors = this.form.get('factconv')?.errors;
    if ( errors?.required ) {
      return 'El factor es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'El factor es de longitud de 12 enteros y 10 decimales, formato numérico.';
    }
    return '';
  }

  // Validar que cumpla con la expresión regular 12 numeros enteros y 10 decimales maximo
  validateFactor(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let capitalPattern = new RegExp(/^([0-9]{1,12})(\.[0-9]{1,10})?$/g);
    return !capitalPattern.test(control.value) ? 
                              {'patternError': true } :
                              null;
  }

}
