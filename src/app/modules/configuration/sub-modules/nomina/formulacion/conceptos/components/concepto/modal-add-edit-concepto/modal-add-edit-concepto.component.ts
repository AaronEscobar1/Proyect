import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Concepto } from '../../../interfaces/concepto.interfaces';
import { TipoNomina } from '../../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Company } from '../../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CompanyNominaService } from '../../../../../empresa/shared-empresa/services/company-nomina.service';
import { ConceptosService } from '../../../services/conceptos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { MetodoFiscal, RutinaCalculo, TipoCalculo, ManejoDecimal, TipoSalario, Promedio, DiaSemana, FechaAniversario } from '../../../interfaces/tablas-tipos-concepto.interfaces';
import { FORM_INIT_CONCEPTO } from './formInit';
import { transformObjectToCheck } from './validaciones-concepto';

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

  // Objeto de dias semanas
  @Input() diasSemanas: DiaSemana[] = [];

  // Objeto de tipos fechas Aniversario
  @Input() fechasAniversario: FechaAniversario[] = [];

  // Formulario reactivo
  form!: FormGroup;

  // Variable para mover pestaña de la vista por si existe un error
  tabIndex = 0;
  
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
      /** Cantidad */
        cancto:     [ , [ this.validateCantidad.bind(this) ]],
        promProcan: [ ],
        suecan:     [ , [ Validators.required ]],
        promProca1: [ ],
        suecac:     [ ],
        bussuc:     [ ],
        salmic:     [ ],
        sercan:     [ ],
        facimp:     [  , [ this.validateFactorImpresion.bind(this) ]],
        candia:     [ ],
        canmes:     [ ],
        topcan:     [ ],
      /** LIMITE */
        conlim:     [ ],
        canlid:     [ , [ this.validateCantidad.bind(this) ]],
        canlih:     [ , [ this.validateCantidad.bind(this) ]],
        promProli1: [ ],
        liminf:     [ , [ this.validateSueldoDesdeHasta.bind(this) ]],
        limsup:     [ , [ this.validateSueldoDesdeHasta.bind(this) ]],
        limsue:     [ , [ Validators.required ]],
        promProlim: [ ],
        suelim:     [ ],
        salmil:     [ ],
      /** Procesar */
        autpro:     [ ],
        profij:     [ ],
        fijing:     [ ],
        prope1:     [ ],
        prope2:     [ ],
        prope3:     [ ],
        prope4:     [ ],
        prope5:     [ ],
        proani:     [ ],
        tipfea:     [ ],
        conexc:     [ ],
      /** Vacación */
        afereg:     [ ],
        conabo:     [ ],
        posvac:     [ ],
        calabo:     [ ],
        concuo:     [ ],
        ctopro:     [ ],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.tabIndex = 0;      
      this.form.reset(FORM_INIT_CONCEPTO);
      this.form.controls['id'].enable();
      this.desactiveFieldCantidadSueldo();
      this.form.controls['profij'].enable();
      this.desactiveFieldSalarioAbono();
      return;
    }
    // Validar que exista el concepto seleccionado
    if (!this.conceptoSelect) return;
    // Deshabilitar campos para editar
    this.form.controls['id'].disable();
    // Validar si la propiedad es = 1, si es = 1 le asignamos true para marcar el check
    this.conceptoSelect = transformObjectToCheck(this.conceptoSelect);
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.conceptoSelect);
    // TODO: Quitar console log
    console.log(this.conceptoSelect);
    // Si el campo tipo en pestaña Límite es igual a 1 o 2, se habilitan los campos para editar
    if ( this.conceptoSelect.conlim == '1' || this.conceptoSelect.conlim == '2' ) {
      this.activeFieldCantidadSueldo();
    }
    // Si el concepto se registró con el parametro movimiento fijo en la pestaña Procesar, no se podrá editar o destildar.
    if ( this.conceptoSelect.conexc == '1' ) {
      this.form.controls['profij'].disable();
    }
    // Si el campo abono de pestaña Vacación esa 1 se habilitan los campos par editar
    if ( this.conceptoSelect.conabo == '1' ) { 
      this.activeFieldSalarioAbono();
    }
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
      // Validar errores de pestaña Cantidad
      else if ( this.form.controls['cancto'].errors || this.form.controls['suecan'].errors || this.form.controls['facimp'].errors ) {
        this.tabIndex = 4;
      }
      // Validar errores de pestaña Limite
      else if ( this.form.controls['canlid'].errors || this.form.controls['canlih'].errors || this.form.controls['limsue'].errors || this.form.controls['liminf'].errors || this.form.controls['limsup'].errors ) {
        this.tabIndex = 5;
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
    // Cantidad
    data.suecac    = data.suecac    ? '1' : '0';
    data.bussuc    = data.bussuc    ? '1' : '0';
    data.salmic    = data.salmic    ? '1' : '0';
    data.canmes    = data.canmes    ? '1' : '0';
    data.topcan    = data.topcan    ? '1' : '0';
    // Limite
    data.suelim    = data.suelim    ? '1' : '0';
    data.salmil    = data.salmil    ? '1' : '0';
    // Procesar
    data.profij    = data.profij    ? '1' : '0';
    data.fijing    = data.fijing    ? '1' : '0';
    data.prope1    = data.prope1    ? '1' : '0';
    data.prope2    = data.prope2    ? '1' : '0';
    data.prope3    = data.prope3    ? '1' : '0';
    data.prope4    = data.prope4    ? '1' : '0';
    data.prope5    = data.prope5    ? '1' : '0';
    data.proani    = data.proani    ? '1' : '0';
    data.conexc    = data.conexc    ? '1' : '0';
    // Vacación
    data.afereg    = data.afereg    ? '1' : '0';
    data.conabo    = data.conabo    ? '1' : '0';
    data.posvac    = data.posvac    ? '1' : '0';

    // Validar si el campo (prioridad y factor) en BASICO esta en null, si esta en null colocarle un 0
    if ( data.prieje == null || data.prieje == '' ) {
      data.prieje = 0;
    }
    if ( data.faccto == null || data.faccto == '' ) {
      data.faccto = 0;
    }
    // Validar si los campos (minimos) en SALARIO esta en null, si esta en null colocarle un 0
    if ( data.salmin == null ) {
      data.salmin = 0;
    }
    if ( data.salmis == null) {
      data.salmis = 0;
    }
    // Validar si el campo (valor) en VALOR esta en null, si esta en null colocarle un 0
    if ( data.valcto == null || data.valcto == '' ) {
      data.valcto = 0;
    }
    // Validar si el campo (cantidad) en CANTIDAD esta en null, si esta en null colocarle un 0
    if ( data.cancto == null || data.cancto == '' ) {
      data.cancto = 0;
    }
    // Validar si el campo (cantidad desde) en LIMITE esta en null, si esta en null colocarle un 0
    if ( data.canlid == null || data.canlid == '' ) {
      data.canlid = 0;
    }
    // Validar si el campo (cantidad hasta) en LIMITE esta en null, si esta en null colocarle un 0
    if ( data.canlih == null || data.canlih == '' ) {
      data.canlih = 0;
    }
    // Validar si el campo (sueldo desde) en LIMITE esta en null, si esta en null colocarle un 0
    if ( data.liminf == null || data.liminf == '' ) {
      data.liminf = 0;
    }
    // Validar si el campo (sueldo hasta) en LIMITE esta en null, si esta en null colocarle un 0
    if ( data.limsup == null || data.limsup == '' ) {
      data.limsup = 0;
    }
    
    // Es obligatorio colocar un sueldo de cálculo si voy a colocar un sueldo sustituto. En pestaña SALARIO
    if ( data.sussue && !data.tipsue ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Es obligatorio colocar un sueldo de cálculo si existe seleccionado un sueldo sustituto.', life: 5000});
      this.tabIndex = 1;
      return;
    }
    // Validar que cantidad desde no sea mayor que cantidad hasta
    if ( data.canlid > data.canlih ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'La cantidad desde no puede ser mayor que cantidad hasta.', life: 5000});
      this.tabIndex = 5;
      return;
    }
    // Validar que el promedio de cantidad sea obligatorio si se llenan los campos desde y hasta 
    if ( data.canlid && data.canlih ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'El promedio de cantidad es obligatorio si se llenan los campos desde y hasta.', life: 5000});
      this.tabIndex = 5;
      return;
    }
    // Validar que sueldo desde no sea mayor que sueldo hasta
    if ( data.liminf > data.limsup ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'El sueldo desde no puede ser mayor que sueldo hasta.', life: 5000});
      this.tabIndex = 5;
      return;
    }
    // Validar que el promedio de sueldo sea obligatorio si se llenan los campos desde y hasta 
    if ( data.liminf && data.limsup ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'El promedio de sueldo es obligatorio si se llenan los campos desde y hasta.', life: 5000});
      this.tabIndex = 5;
      return;
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

  // Validar que cumpla con la expresión regular 4 números enteros y 3 decimales máximos
  validateCantidad(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,4})(\.[0-9]{1,3})?$/g);
    return !valuePattern.test(control.value) ?
                          {'patternError': true } :
                          null;
  }

  // Validar que cumpla con la expresión regular 3 números enteros y 10 decimales máximos
  validateFactorImpresion(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,3})(\.[0-9]{1,10})?$/g);
    return !valuePattern.test(control.value) ?
                          {'patternError': true } :
                          null;
  }

  // Validar que cumpla con la expresión regular 12 números enteros y 5 decimales máximos
  validateSueldoDesdeHasta(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,12})(\.[0-9]{1,5})?$/g);
    return !valuePattern.test(control.value) ?
                          {'patternError': true } :
                          null;
  }

  /**
   * Pestaña limite
   * Deshabilitar campos segun validación
   * Para rellenar las secciones cantidad o sueldo, debe ser obligatorio estar tildado generar o suspendido. 
   */
  desactiveFieldCantidadSueldo(): void {
    // Deshabilitar                                   // Resetear
    this.form.controls['canlid'].disable();           this.form.controls['canlid'].reset(0);
    this.form.controls['canlih'].disable();           this.form.controls['canlih'].reset(0);
    this.form.controls['promProli1'].disable();       this.form.controls['promProli1'].reset();  
    this.form.controls['liminf'].disable();           this.form.controls['liminf'].reset(0);
    this.form.controls['limsup'].disable();           this.form.controls['limsup'].reset(0);
    this.form.controls['limsue'].disable();           this.form.controls['limsue'].reset();
    this.form.controls['promProlim'].disable();       this.form.controls['promProlim'].reset();
    this.form.controls['suelim'].disable();           this.form.controls['suelim'].reset(false);
    this.form.controls['salmil'].disable();           this.form.controls['salmil'].reset(false);
  }

  /**
   * Pestaña limite
   * Habilitar campos segun validación
   * Para rellenar las secciones cantidad o sueldo, debe ser obligatorio estar tildado generar o suspendido. 
   */
  activeFieldCantidadSueldo(): void {
    // Habilitar
    this.form.controls['canlid'].enable();
    this.form.controls['canlih'].enable();
    this.form.controls['promProli1'].enable();
    this.form.controls['liminf'].enable();
    this.form.controls['limsup'].enable();
    this.form.controls['limsue'].enable();
    this.form.controls['promProlim'].enable();
    this.form.controls['suelim'].enable();
    this.form.controls['salmil'].enable();
  }

  /**
   * Pestaña Procesar
   * En la sección Mov. Fijo, si el concepto es fijo colocarlo limitado. 
   */
  colocarLimitado(): void {
    // Validar que cuando sea editar y ya tenga el valor si, no se pueda modificar el campo mov. fijo
    if ( this.isEdit && this.conceptoSelect && this.conceptoSelect.conexc == '1' ) return; 
    // Colocar la autorizacion en limitado 
    this.form.controls['autpro'].reset(1);
    // Quitar el check de generar al ingreso en movimiento fijo 
    this.form.controls['fijing'].reset(false);
    // Mostrar una advertencia para notificar al usuario que se cambio la autorizacion a limitado
    if ( this.form.controls['profij'].value == true ) {
      this.messageService.add({severity: 'info', summary: 'Info', detail: 'Ha seleccionado movimiento fijo, la autorización debe ser limitado.', life: 3000});
    }
  }

  /**
   * Pestaña Procesar
   * Resetear el segmento autorización si se selecciona ilimitado
   */
  quitarMovFijo(): void {
    // Validar que cuando sea editar y ya tenga el valor si, no se pueda modificar el campo mov. fijo
    if ( this.isEdit && this.conceptoSelect && this.conceptoSelect.conexc == '1' ) return;
    // Quitar los checks de movimiento fijo 
    this.form.controls['profij'].reset(false);
    this.form.controls['fijing'].reset(false);
  }

  /**
   * Pestaña Procesar
   * En la sección Mov. Fijo, para la selección generar al ingreso, es obligatorio estar en Si. 
   */
  generarIngreso(): void {
    if ( this.form.controls['profij'].value == false ) {
      this.form.controls['fijing'].reset(false);
      this.messageService.add({severity: 'warn', summary: 'Alerta', detail: 'Para seleccionar el check de generar al ingreso debe tener el check de fijo seleccionado.', life: 3000});
    }
  }

  /**
   * Pestaña Procesar
   * Vaciar fecha cuando se destilda el check
   */
  vaciarFechaAniversario(): void {
    if ( this.form.controls['proani'].value == false) {
      this.form.controls['tipfea'].reset();
    }
  }

  /**
   * Pestaña Procesar
   * Para la sección aniversario y ubicar fecha debe estar tildado el Sí.
   */
  fechaAniversario(): void {
    if ( this.form.controls['proani'].value == false ) {
      this.messageService.add({severity: 'warn', summary: 'Alerta', detail: 'Para seleccionar una fecha debe estar tildado el Sí de aniversario.', life: 3000});
      this.form.controls['tipfea'].reset();
    }
  }

  /**
   * Pestaña Vacación
   * Activar o desactivar los radios buttons de la sección Salario de abono
   */
  onActiveFieldAbono(): void {
    if ( this.form.controls['conabo'].value == true ) {
      this.activeFieldSalarioAbono();
      return;
    }
    this.desactiveFieldSalarioAbono();
  }

  /**
   * Pestaña Vacación
   * Deshabilitar campos segun validación
   * Para rellenar la seccion salario abono, debe ser obligatorio estar tildado el check Abono. 
   */
  desactiveFieldSalarioAbono(): void {
    // Deshabilitar                                   // Resetear
    this.form.controls['calabo'].disable();           this.form.controls['calabo'].reset('0');
  }

  /**
   * Pestaña Vacación
   * Habilitar campos segun validación
   * Para rellenar la seccion salario abono, debe ser obligatorio estar tildado el check Abono. 
   */
  activeFieldSalarioAbono(): void {
    // Habilitar
    this.form.controls['calabo'].enable();
  }

}
