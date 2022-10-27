import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Concepto } from '../../../interfaces/concepto.interfaces';
import { TipoNomina } from '../../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Company } from '../../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CompanyNominaService } from '../../../../../empresa/shared-empresa/services/company-nomina.service';
import { ConceptosService } from '../../../services/conceptos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { MetodoFiscal, RutinaCalculo, TipoCalculo, ManejoDecimal, TipoSalario, Promedio } from '../../../interfaces/tablas-tipos-concepto.interfaces';
import { FORM_INIT_CONCEPTO } from './formInit';

@Component({
  selector: 'app-modal-add-edit-concepto',
  templateUrl: './modal-add-edit-concepto.component.html',
  styleUrls: ['./modal-add-edit-concepto.component.scss']
})
export class ModalAddEditConceptoComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto de conceptos por empresa y nomina
  @Input() conceptos: Concepto[] = [];

  // Objeto de conceptos que manejan saldos
  @Input() conceptosFilters: Concepto[] = [];

  // Objeto seleccionado para editar
  @Input() conceptoSelect!: Concepto | undefined;

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit      : boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();

  /****************************
   *  Objetos de tablas tipos *
   ****************************/

  // Objeto de tipo de cálculos
  @Input() tiposCalculos: TipoCalculo[] = [];

  // Objeto de métodos Fiscales
  @Input() metodosFiscales: MetodoFiscal[] = [];

  // Objeto de rutinas de Cálculos
  @Input() rutinasCalculos: RutinaCalculo[] = [];

  // Objeto de manejos decimales (redondeo)
  @Input() manejosDecimales: ManejoDecimal[] = [];

  // Objeto de tipos de salarios
  @Input() tiposSalarios: TipoSalario[] = [];

  // Objeto de promedios
  @Input() promedios: Promedio[] = [];

  // Formulario reactivo
  form!: FormGroup;

  // Variable para mover pestaña de la vista por si existe un error
  tabIndex = 3;
  
  constructor(private companyNominaService: CompanyNominaService,
              private conceptosService: ConceptosService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa: [ ],
      idNomina:  [ ],
      /** Basico */
        id:        [  , [ Validators.required, Validators.pattern('[0-9]{1,4}'), this.validatedId.bind(this)]],
        descto:    [  , [ Validators.required, Validators.maxLength(50) ]],
        prieje:    [  , [ Validators.pattern('[0-9]{1,4}') ]],
        clausu:    [  , [ Validators.maxLength(4) ]],
        functo:    [  , [ Validators.required ]],
        tipcal:    [  , [ Validators.required ]],
        tipfis:    [  ],
        rutcal:    [  ],
        mansal:    [  , [ Validators.required ]],
        graimp:    [  , [ Validators.required ]],
        noimpr:    [  ],
        noneto:    [  ],
        incdet:    [  ],
        abopre:    [  ],
        montocero: [  ],
        topmon:    [  ],
        sindec:    [  , [ Validators.required ]],
        ctoafe:    [  ],
        faccto:    [  , [ this.validateFactor.bind(this)]],
        desfac:    [  , [ Validators.maxLength(256)]],
        inactivo:  [  ],
      /** Salario */
        tipsue:     [  , [ Validators.required ]],
        promCodpro: [ ],
        salmin:     [  , [ Validators.pattern('[0-9]{0,3}') ]],
        sussue:     [  , [ Validators.required ]],
        promProsus: [ ],
        salmis:     [  , [ Validators.pattern('[0-9]{0,3}') ]],
        rutsus:     [  , [ Validators.maxLength(10) ]],
        topsue:     [ ],
      /** Valor */
        valcto:     [  , [ this.validateValor.bind(this) ]],
        sueval:     [  , [ Validators.required ]],
        promProval: [ ],
        suecav:     [ ],
        bussuv:     [ ],
        salmiv:     [ ],
        serval:     [ ],
        valmes:     [ ],
        topval:     [ ],
      /** Factor */
        suefac:     [ , [ Validators.required ]],
        promProfac: [ ],
        suecaf:     [ ],
        bussuf:     [ ],
        salmif:     [ ],
        serfac:     [ ],
        facmes:     [ ],
        faccen:     [ ],
        topfac:     [ ],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset(FORM_INIT_CONCEPTO);
      this.form.controls['id'].enable();
      return;
    }
    this.form.controls['id'].disable();
    // Seteamos los valores del row seleccionado al formulario
    console.log(this.conceptoSelect);
    this.form.reset(this.conceptoSelect);
    // Validar si la propiedad es = 1, si es = 1 le asignamos true para marcar el check
      // Básica
      (this.conceptoSelect && this.conceptoSelect.noimpr) === "1" ? this.form.controls['noimpr'].reset(true) : this.form.controls['noimpr'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.noneto) === "1" ? this.form.controls['noneto'].reset(true) : this.form.controls['noneto'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.incdet) === "1" ? this.form.controls['incdet'].reset(true) : this.form.controls['incdet'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.abopre) === "1" ? this.form.controls['abopre'].reset(true) : this.form.controls['abopre'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.montocero) === "1" ? this.form.controls['montocero'].reset(true) : this.form.controls['montocero'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.topmon)    === "1" ? this.form.controls['topmon'].reset(true) : this.form.controls['topmon'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.inactivo)  === "1" ? this.form.controls['inactivo'].reset(true) : this.form.controls['inactivo'].reset(false);
      // Salario
      (this.conceptoSelect && this.conceptoSelect.topsue) === "1" ? this.form.controls['topsue'].reset(true) : this.form.controls['topsue'].reset(false);
      // Valor
      (this.conceptoSelect && this.conceptoSelect.suecav) === "1" ? this.form.controls['suecav'].reset(true) : this.form.controls['suecav'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.bussuv) === "1" ? this.form.controls['bussuv'].reset(true) : this.form.controls['bussuv'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.salmiv) === "1" ? this.form.controls['salmiv'].reset(true) : this.form.controls['salmiv'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.valmes) === "1" ? this.form.controls['valmes'].reset(true) : this.form.controls['valmes'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.topval) === "1" ? this.form.controls['topval'].reset(true) : this.form.controls['topval'].reset(false);
      // Factor
      (this.conceptoSelect && this.conceptoSelect.suecaf) === "1" ? this.form.controls['suecaf'].reset(true) : this.form.controls['suecaf'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.bussuf) === "1" ? this.form.controls['bussuf'].reset(true) : this.form.controls['bussuf'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.salmif) === "1" ? this.form.controls['salmif'].reset(true) : this.form.controls['salmif'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.facmes) === "1" ? this.form.controls['facmes'].reset(true) : this.form.controls['facmes'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.faccen) === "1" ? this.form.controls['faccen'].reset(true) : this.form.controls['faccen'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.topfac) === "1" ? this.form.controls['topfac'].reset(true) : this.form.controls['topfac'].reset(false);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    if ( this.form.invalid ) {
      // Validar errores de pestaña basico
      if ( this.form.controls['id'].errors || this.form.controls['descto'].errors || this.form.controls['prieje'].errors || this.form.controls['clausu'].errors || this.form.controls['tipcal'].errors || this.form.controls['sindec'].errors || this.form.controls['faccto'].errors || this.form.controls['desfac'].errors ) {
        this.tabIndex = 0;
      } 
      // Validar errores de pestaña Salario
      else if ( this.form.controls['tipsue'].errors || this.form.controls['salmin'].errors || this.form.controls['sussue'].errors || this.form.controls['salmis'].errors || this.form.controls['rutsus'].errors ) {
        this.tabIndex = 1;
      } 
      // Validar errores de pestaña Valor
      else if ( this.form.controls['valcto'].errors || this.form.controls['sueval'].errors) {
        this.tabIndex = 2;
      }  
      // Validar errores de pestaña Factor 
      else if ( this.form.controls['faccto'].errors || this.form.controls['suefac'].errors ) {
        this.tabIndex = 3;
      }
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: Concepto = this.form.getRawValue();

    // Si el check de estos campos esta seleccionado se coloca el valor 1, de lo contrario 0
    // Basico
    data.noimpr    = data.noimpr    ? '1' : '0';
    data.noneto    = data.noneto    ? '1' : '0';
    data.incdet    = data.incdet    ? '1' : '0';
    data.abopre    = data.abopre    ? '1' : '0';
    data.montocero = data.montocero ? '1' : '0';
    data.topmon    = data.topmon    ? '1' : '0';
    data.inactivo  = data.inactivo  ? '1' : '0';
    // Salario
    data.topsue    = data.topsue    ? '1' : '0';
    // Valor
    data.suecav    = data.suecav    ? '1' : '0';
    data.bussuv    = data.bussuv    ? '1' : '0';
    data.salmiv    = data.salmiv    ? '1' : '0';
    data.valmes    = data.valmes    ? '1' : '0';
    data.topval    = data.topval    ? '1' : '0';
    // Factor
    data.suecaf    = data.suecaf    ? '1' : '0';
    data.bussuf    = data.bussuf    ? '1' : '0';
    data.salmif    = data.salmif    ? '1' : '0';
    data.facmes    = data.facmes    ? '1' : '0';
    data.faccen    = data.faccen    ? '1' : '0';
    data.topfac    = data.topfac    ? '1' : '0';

    // Validar si el campo factor en basico esta en null, si esta en null colocarle un 0
    if ( data.prieje == null || data.prieje == '' ) {
      data.prieje = 0;
    }
    if ( data.faccto == null || data.faccto == '' ) {
      data.faccto = 0;
    }
    // Validar si el campo minimo en salario esta en null, si esta en null colocarle un 0
    if ( data.salmin == null ) {
      data.salmin = 0;
    }
    if ( data.salmis == null) {
      data.salmis = 0;
    }
    // Validar si el campo valor en valor esta en null, si esta en null colocarle un 0
    if ( data.valcto == null || data.valcto == '' ) {
      data.valcto = 0;
    }

    // Es obligatorio colocar un sueldo de cálculo si voy a colocar un sueldo sustituto.
    if ( data.sussue && !data.tipsue ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Es obligatorio colocar un sueldo de cálculo si existe seleccionado un sueldo sustituto.', life: 5000});
    }

    console.log(data);
    return;
    this.spinner.show();

    // Editar
    if (this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idEmpresa, idNomina, id, ...dataUpdate} = data;
      this.conceptosService.update(data, dataUpdate)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el concepto.', life: 3000});
        }
      });
      return;
    }

    // Asignar idEmpresa y idNomina a la data
    data.idEmpresa = this.empresaRow.id;
    data.idNomina = this.nominaRow.tipnom;

    // Crear
    this.conceptosService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el concepto.', life: 3000});
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
  get idMsgError(): string {
    const errors = this.form.get('id')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.pattern ) {
      return 'El código es de longitud máxima de 4 dígitos, formato numérico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores descto
  get desctoMsgError(): string {
    const errors = this.form.get('descto')?.errors;
    if ( errors?.required ) {
      return 'El nombre es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El nombre es de longitud máxima de 50 dígitos, formato alfanumérico.';
    } 
    return '';
  }
    
  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.conceptos.findIndex(val => val.id.toString() === control.value) > -1 ?
                                        {'duplicated': true} :
                                        null;
  }

  // Validar que cumpla con la expresión regular 3 números enteros y 9 decimales máximos
  validateFactor(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,3})(\.[0-9]{1,9})?$/g);
    return !valuePattern.test(control.value) ?
                          {'patternError': true } :
                          null;
  }

  // Validar que cumpla con la expresión regular 25 números enteros y 9 decimales máximos
  validateValor(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,25})(\.[0-9]{1,9})?$/g);
    return !valuePattern.test(control.value) ?
                          {'patternError': true } :
                          null;
  }

}
