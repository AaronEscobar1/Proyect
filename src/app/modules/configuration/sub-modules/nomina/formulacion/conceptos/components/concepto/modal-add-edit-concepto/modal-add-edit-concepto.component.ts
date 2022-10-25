import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Concepto } from '../../../interfaces/concepto.interfaces';
import { TipoNomina } from '../../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Company } from '../../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CompanyNominaService } from '../../../../../empresa/shared-empresa/services/company-nomina.service';
import { ConceptosService } from '../../../services/conceptos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { MetodoFiscal, redondeoDataConcepto, RutinaCalculo, TipoCalculo } from '../../../interfaces/tablas-tipos-concepto.interfaces';
import { FORM_INIT_CONCEPTO } from './formInit';
import { dropdownType } from '../../../../../../../../../shared/interfaces/typesFiles.interfaces';

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

  // Objeto para listar el campo redondeo
  redondeoList: dropdownType[] = redondeoDataConcepto;

  // Objeto de tipo de cálculos
  @Input() tiposCalculos: TipoCalculo[] = [];

  // Objeto de métodos Fiscales
  @Input() metodosFiscales: MetodoFiscal[] = [];

  // Objeto de rutinas de Cálculos
  @Input() rutinasCalculos: RutinaCalculo[] = [];

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
        prieje:    [  , [ Validators.required, Validators.maxLength(4) ]],
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
        faccto:    [  , [ Validators.required, this.validateFactor.bind(this)]],
        desfac:    [  , [ Validators.maxLength(256)]],
        inactivo:  [  ]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      // const formInit = { prieje: 0, functo: '0', mansal: '0', noimpr: '0', noneto: '0', incdet: '0', abopre: '0', topmon: '0', faccto: '0', montocero: '0', inactivo: '0' };
      this.form.reset(FORM_INIT_CONCEPTO);
      this.form.controls['id'].enable();
      return;
    }
    this.form.controls['id'].disable();
    // Seteamos los valores del row seleccionado al formulario
    console.log(this.conceptoSelect);
    this.form.reset(this.conceptoSelect);
    /** BASICA */
      // Validamos si la propiedad es = 1, si es = 1 le asignamos true para marcar el check
      (this.conceptoSelect && this.conceptoSelect.noimpr) === "1" ? this.form.controls['noimpr'].reset(true) : this.form.controls['noimpr'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.noneto) === "1" ? this.form.controls['noneto'].reset(true) : this.form.controls['noneto'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.incdet) === "1" ? this.form.controls['incdet'].reset(true) : this.form.controls['incdet'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.abopre) === "1" ? this.form.controls['abopre'].reset(true) : this.form.controls['abopre'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.montocero) === "1" ? this.form.controls['montocero'].reset(true) : this.form.controls['montocero'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.topmon)    === "1" ? this.form.controls['topmon'].reset(true) : this.form.controls['topmon'].reset(false);
      (this.conceptoSelect && this.conceptoSelect.inactivo)  === "1" ? this.form.controls['inactivo'].reset(true) : this.form.controls['inactivo'].reset(false);
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
    let data: Concepto = this.form.getRawValue();

    // Si el check de estos campos esta seleccionado se coloca el valor 1, de lo contrario 0
    data.noimpr    = data.noimpr    ? '1' : '0';
    data.noneto    = data.noneto    ? '1' : '0';
    data.incdet    = data.incdet    ? '1' : '0';
    data.abopre    = data.abopre    ? '1' : '0';
    data.montocero = data.montocero ? '1' : '0';
    data.topmon    = data.topmon    ? '1' : '0';
    data.inactivo  = data.inactivo  ? '1' : '0';

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
  
  // Mensajes de errores prieje
  get priejeMsgError(): string {
    const errors = this.form.get('prieje')?.errors;
    if ( errors?.required ) {
      return 'La prioridad es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'La prioridad es de longitud máxima de 4 dígitos, formato alfanumérico.';
    } 
    return '';
  }
  
  // Mensajes de errores faccto
  get facctoMsgError(): string {
    const errors = this.form.get('faccto')?.errors;
    if ( errors?.required ) {
      return 'El factor es obligatorio.';
    } else if ( errors?.patternError ) {
      return 'El factor es de longitud de 3 dígitos enteros y 9 decimales, formato numérico.';
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

}
