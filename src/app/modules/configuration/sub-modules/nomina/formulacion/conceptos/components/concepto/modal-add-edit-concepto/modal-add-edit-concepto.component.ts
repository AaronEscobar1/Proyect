import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Concepto } from '../../../interfaces/concepto.interfaces';
import { TipoNomina } from '../../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Company } from '../../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CompanyNominaService } from '../../../../../empresa/shared-empresa/services/company-nomina.service';
import { ConceptosService } from '../../../services/conceptos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { MetodoFiscal, RutinaCalculo, TipoCalculo, ManejoDecimal, TipoSalario, Promedio, DiaSemana, FechaAniversario, PagoInteres } from '../../../interfaces/tablas-tipos-concepto.interfaces';
import { FORM_INIT_CONCEPTO } from './formInit';
import { fieldsNoNullsWithValueCero, transformObjectToCheck, trasnformCheckboxTrueOrFalseToString } from './validaciones-concepto';
import { RelacionLaboral } from '../../../interfaces/relacion-laboral.interfaces';
import { ConceptoTope } from '../../../interfaces/concepto-topes.interfaces';
import { ConceptoTopesService } from '../../../services/concepto-topes.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

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
  // TODO: Colocar el tipo de datos cuando el endpoint funcione correctamente
  promediosPrueba: any[] = [];

  // Objeto de dias semanas
  @Input() diasSemanas: DiaSemana[] = [];

  // Objeto de tipos fechas Aniversario
  @Input() fechasAniversario: FechaAniversario[] = [];

  // Objeto de Indicadores Pagos de Intereses
  @Input() indicadoresPagos: PagoInteres[] = [];

  // Objeto de relación laboral
  @Input() relacionesLaborales: RelacionLaboral[] = [];

  // Formulario reactivo
  form!: FormGroup;

  // Variable para mover pestaña de la vista por si existe un error
  tabIndex = 0;
  
  /****************************************
   *        MODALES ADICIONALES           *
   ****************************************/
  
  // Variable para comprobar que se ha abierto una ventana modal adicional
  isOpenModalAditional: boolean = false;

  /****************************************
   *        MODAL ADICIONAL TOPE          *
   ****************************************/

  // Modal concepto tope
  modalConceptoTope: boolean = false;

  // Objeto para concepto tope
  conceptoTope!: ConceptoTope | undefined;

  // Variable para verificar si tiene data el concepto tope
  hasDataConceptoTope: boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private conceptosService: ConceptosService, 
              private conceptoTopesService: ConceptoTopesService,
              private storageService: StorageService,
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
        facafe:    [  , [ this.validateFactor.bind(this)]],
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
        faccto:    [  , [ this.validateFactor.bind(this)]],
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
      /** Miscelanea */
        ctofij:     [ ],
        facfij:     [  , [ this.validateFactor.bind(this)]],
        ctoint:     [ ],
        suscuota:   [ ],
        manins:     [ ],
        facaho:     [  , [ this.validateFactor.bind(this)]],
        ctoaho:     [ ],
        unasup:     [ ],
        ctosup:     [ ],
      /** Otros */
        capint:     [  , [ Validators.required ]],
        ctoIntpre:  [ ],
        cretro:     [ ],
        acuche:     [ ],
        codben:     [ ],
        gretro:     [ ],
    });
  }

  ngOnInit(): void {
    // TODO: Quitar data cableada cuando el endpoint promedio funcione correctamente
    this.promediosPrueba = [
      { codpro: '3030', despro: 'SUSPENDE CTO 3030 EN TRIMESTRE' },
      { codpro: '3040',  despro: 'PROV. GARANTIA ABONO PREST.'  }
    ]
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
    // Si el campo tipo en pestaña Límite es igual a 1 o 2, se habilitan los campos para editar
    if ( this.conceptoSelect.conlim == '1' || this.conceptoSelect.conlim == '2' ) {
      this.activeFieldCantidadSueldo();
    }
    // Si el concepto se registró con el parametro movimiento fijo en la pestaña Procesar, no se podrá editar o destildar.
    if ( this.conceptoSelect.conexc == '1' ) {
      this.form.controls['profij'].disable();
    }
    // Si el campo abono de pestaña Vacación es igual a 1 se habilitan los campos par editar
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
      // Validar errores y redirigir a pestaña basico
      if ( this.form.controls['id'].errors || this.form.controls['descto'].errors || this.form.controls['prieje'].errors || this.form.controls['clausu'].errors || this.form.controls['tipcal'].errors || this.form.controls['sindec'].errors || this.form.controls['facafe'].errors || this.form.controls['desfac'].errors ) {
        this.tabIndex = 0;
      } 
      // Validar errores y redirigir a pestaña Salario
      else if ( this.form.controls['tipsue'].errors || this.form.controls['salmin'].errors || this.form.controls['sussue'].errors || this.form.controls['salmis'].errors || this.form.controls['rutsus'].errors ) {
        this.tabIndex = 1;
      } 
      // Validar errores y redirigir a pestaña Valor
      else if ( this.form.controls['valcto'].errors || this.form.controls['sueval'].errors) {
        this.tabIndex = 2;
      }  
      // Validar errores y redirigir a pestaña Factor 
      else if ( this.form.controls['faccto'].errors || this.form.controls['suefac'].errors ) {
        this.tabIndex = 3;
      }
      // Validar errores y redirigir a pestaña Cantidad
      else if ( this.form.controls['cancto'].errors || this.form.controls['suecan'].errors || this.form.controls['facimp'].errors ) {
        this.tabIndex = 4;
      }
      // Validar errores y redirigir a pestaña Limite
      else if ( this.form.controls['canlid'].errors || this.form.controls['canlih'].errors || this.form.controls['limsue'].errors || this.form.controls['liminf'].errors || this.form.controls['limsup'].errors ) {
        this.tabIndex = 5;
      }
      // Validar errores y redirigir a pestaña Miscelanea
      else if ( this.form.controls['facfij'].errors || this.form.controls['facaho'].errors ) {
        this.tabIndex = 8;
      }
      // Validar errores y redirigir a pestaña Otros
      else if ( this.form.controls['capint'].errors ) {
        this.tabIndex = 9;
      }
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: Concepto = this.form.getRawValue();

    // Si los campos tipo checkbox estan seleccionados, es decir estan en true se coloca el valor 1, de lo contrario 0
    data = trasnformCheckboxTrueOrFalseToString(data);

    // Validar que los campos que no permiten nulos, si en el formulario se dejan vacios se envien con valor 0 por defecto
    data = fieldsNoNullsWithValueCero(data);
    
    // Es obligatorio colocar un sueldo de cálculo si voy a colocar un sueldo sustituto. En pestaña SALARIO
    if ( data.sussue && !data.tipsue ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Es obligatorio colocar un sueldo de cálculo si existe seleccionado un sueldo sustituto.', life: 5000});
      this.tabIndex = 1;
      return;
    }
    // Validar que cantidad desde no sea mayor que cantidad hasta
    if ( Number(data.canlid) > Number(data.canlih) ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'La cantidad desde no puede ser mayor que cantidad hasta.', life: 5000});
      this.tabIndex = 5;
      return;
    }
    // Validar que el promedio de cantidad sea obligatorio si se llenan los campos desde y hasta 
    if ( (Number(data.canlid) != 0 || Number(data.canlih) != 0) && data.promProli1 == null ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'El promedio de cantidad es obligatorio si se llenan los campos desde y hasta.', life: 5000});
      this.tabIndex = 5;
      return;
    }
    // Validar que sueldo desde no sea mayor que sueldo hasta
    if ( Number(data.liminf) > Number(data.limsup) ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'El sueldo desde no puede ser mayor que sueldo hasta.', life: 5000});
      this.tabIndex = 5;
      return;
    }
    // Validar que el promedio de sueldo sea obligatorio si se llenan los campos desde y hasta 
    if ( (Number(data.liminf) != 0 || Number(data.limsup) != 0) && data.promProlim == null ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'El promedio de sueldo es obligatorio si se llenan los campos desde y hasta.', life: 5000});
      this.tabIndex = 5;
      return;
    }

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
          if (err.error.message.includes('Error en solicitud.') ) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail, life: 3000});
            this.spinner.hide();
            return false;
          }
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el concepto.', life: 3000});
          return false;
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
          if (err.error.message.includes('Error en solicitud.') ) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail, life: 3000});
            this.spinner.hide();
            return false;
          }
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el concepto.', life: 3000});
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
    this.form.controls['limsue'].disable();           this.form.controls['limsue'].reset('0');
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

  /**********************
   *   CONCEPTOS TOPE   *
   **********************/

  /**
   * Abrir modal Concepto - tope
   */
  openModalTope(tipele: number): void {
    this.conceptoTope = undefined;
    // Enviar dato tipele al local storage
    this.storageService.set('tipele', tipele);
    // Cargar concepto tope
    this.loadConceptoTope();
    // Variable para ocultar ventana modal de Concepto
    this.isOpenModalAditional = true;
    // Abrir modal de concepto Tope
    this.modalConceptoTope = true;
  }

  /**
   * Cargar concepto tope
   */
  loadConceptoTope(): void {
    this.hasDataConceptoTope = false;
    if ( !this.conceptoSelect ) return;
    const tipele = this.storageService.get('tipele');
    this.spinner.show();
    this.conceptoTopesService.getConceptoTopeByEmpresaNominaConceptoTipele(this.conceptoSelect, tipele)
      .subscribe({
        next: (resp) => {
          this.conceptoTope = resp;
          this.hasDataConceptoTope = true;
          this.spinner.hide();
        },
        error: (err) => {
          if( err.error.message.includes('Recurso no encontrado')) {
            this.spinner.hide();
            this.messageService.add({severity: 'info', summary: '', detail: err.error.detail, life: 3000});
            return false;
          }
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
          return false;
        }
      });
  }

  /**
   * Cerrar modal Concepto - tope
   */
  closeModalTope(): void {
    // Vaciar variable del local storage
    this.storageService.remove('tipele');
    // Variable para mostrar ventana modal de Concepto
    this.isOpenModalAditional = false;
    // Cerrar modal concepto tope;
    this.modalConceptoTope = false;
  }

}
