import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Concepto } from '../../../interfaces/concepto.interfaces';
import { FormBuilder, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TipoSalario, Promedio } from '../../../interfaces/tablas-tipos-concepto.interfaces';
import { ConceptoTope } from '../../../interfaces/concepto-topes.interfaces';
import { ConceptoTopesService } from '../../../services/concepto-topes.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-modal-concepto-tope',
  templateUrl: './modal-concepto-tope.component.html',
  styleUrls: ['./modal-concepto-tope.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class ModalConceptoTopeComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto seleccionado para enviar IdEmpresa, IdNomina e IdConcepto
  @Input() conceptoSelect!: Concepto | undefined;

  // Variable para mostrar Nombre de empresa y nombre de nomina
  comboEmpresaNominaString: string = '';

  // Objeto para concepto tope
  @Input() conceptoTope!: ConceptoTope | undefined;

  // Variable para verificar si tiene data el concepto tope
  @Input() hasDataConceptoTope: boolean = false;

  // Titulo del modal
  @Input() titleModal!: string;

  // Modal concepto tope
  @Input() modalConceptoTope: boolean = false;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModalTope = new EventEmitter()
  @Output() onLoadData       = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  /****************************
   *  Objetos de tablas tipos *
   ****************************/

  // Objeto de tipos de salarios
  @Input() tiposSalarios: TipoSalario[] = [];

  // Objeto de promedios
  @Input() promedios: Promedio[] = [];
  // TODO: Colocar el tipo de datos cuando el endpoint funcione correctamente
  @Input() promediosPrueba: any[] = [];

  constructor(private conceptoTopesService: ConceptoTopesService,
              private storageService: StorageService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa:  [ ],
      idNomina:   [ ],
      idConcepto: [ ],
      tipele:     [ ],
      tiptop:     [ ],
      valtop:     [ , [ this.validateValor.bind(this) ]],
      tipsue:     [ ],
      canmin:     [ , [ this.validateSueldo.bind(this) ]],
      sueesc:     [ ],
      promCodEsc: [ ],
      minesc:     [ ],
      busesc:     [ ],
      promCodTop: [ ],
      factop:     [ , [ this.validateFactor.bind(this) ]],
      tieser:     [ ],
      /** Campos sobrantes */
      suetop:     [ ],
      cantop:     [ ],
      facafe:     [ ],
      montop:     [ ]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.setEmpresaNominaString();
    const formInit = { tiptop: '1', valtop: 0, tipsue: '0', canmin: 0, sueesc: '0', factop: 0, suetop: 0, cantop: 0, facafe: 0 };
    this.form.reset(formInit);
    if ( !this.hasDataConceptoTope ) {
      return;
    }
    if ( !this.conceptoTope ) return;
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.conceptoTope);
    // Validar si la propiedad a evaluar es = 1, si es = 1 le asignamos true para marcar el check
    this.conceptoTope.minesc === '1' ? this.form.controls['minesc'].reset(true) : this.form.controls['minesc'].reset(false);
    this.conceptoTope.busesc === '1' ? this.form.controls['busesc'].reset(true) : this.form.controls['busesc'].reset(false);
    this.conceptoTope.tieser === '1' ? this.form.controls['tieser'].reset(true) : this.form.controls['tieser'].reset(false);
  }

  /**
   * Colocar nombre al campo para mostrar nombre de empresa y nomina
   */
  setEmpresaNominaString(): void {
    if ( this.empresaRow && this.nominaRow ) {
      this.comboEmpresaNominaString = `${this.empresaRow.nombre.toUpperCase()} / ${this.nominaRow.desnom.toUpperCase()}`;
    }
  }
  
  /**
   * Guardar y Actualizar concepto tope
   */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    const data: ConceptoTope = this.form.getRawValue();

    // Si los campos tipo checkbox estan seleccionados, es decir estan en true se coloca el valor 1, de lo contrario 0
    data.minesc = data.minesc ? '1' : '0';
    data.busesc = data.busesc ? '1' : '0';
    data.tieser = data.tieser ? '1' : '0';
    
    // Transformar los campos numericos del formulario
    data.valtop = Number(data.valtop);
    data.canmin = Number(data.canmin);
    data.factop = Number(data.factop);

    /** Validaciones */
    // En la sección monto el sistema permite rellenar un solo campo (monto a fijar o tipo de sueldo o sueldos mínimos).
    if ( ( data.valtop > 0 && data.tipsue != '0' || data.canmin > 0 ) && 
          ( data.tipsue != '0' && data.valtop > 0 || data.canmin > 0 ) && 
            ( data.canmin > 0 && data.valtop > 0 || data.tipsue != '0') ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Solo se debe permitir rellenar un solo campo (Monto a fijar, Tipo de sueldo o Sueldos mínimos)', life: 5000});
      return;
    }
    // El campo factor (no es obligatorio, pero si coloco factor tengo que tener promedio o tipo de sueldo o sueldo) 
    if ( ( data.factop > 0 && data.tipsue == '0' ) && ( data.factop > 0 && data.sueesc == '0' ) && ( data.factop > 0 && data.promCodTop ==  null ) ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'El campo factor (no es obligatorio, pero si colocó factor tiene que tener promedio, tipo de sueldo o sueldo)', life: 5000});
      return;
    }

    this.spinner.show();

    // Editar
    if ( this.hasDataConceptoTope ) {
      const { idEmpresa, idNomina, idConcepto, tipele, ...dataUpdate } = data;
      this.conceptoTopesService.update(data, dataUpdate)
        .subscribe({
          next: (resp) => {
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.onLoadData.emit();
          },
          error: (err) => {
            if (err.error.message.includes('Error en solicitud.') ) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail, life: 3000});
              this.spinner.hide();
              return false;
            }
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el concepto tope.', life: 3000});
            return false;
          } 
        });
      return;
    }

    // Asignar idEmpresa, idNomina, idConcepto y tipele
    if ( !this.conceptoSelect ) {  return; }
    data.idEmpresa  = this.conceptoSelect.idEmpresa;
    data.idNomina   = this.conceptoSelect.idNomina;
    data.idConcepto = this.conceptoSelect.id;
    data.tipele     = this.storageService.get('tipele');
    // Crear
    this.conceptoTopesService.create(data)
      .subscribe({
        next: (resp) => {
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
          this.hasDataConceptoTope = true;
        },
        error: (err) => {
          if (err.error.message.includes('Error en solicitud.') ) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail, life: 3000});
            this.spinner.hide();
            return false;
          }
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el concepto tope.', life: 3000});
          return false;
        }
      });
  }

  /**
   * Elimina registro
   * @param conceptoTope: ConceptoTope | undefined
   */
  delete(conceptoTope: ConceptoTope | undefined): void {
    if ( !conceptoTope ) return;
    this.confirmationService.confirm({
      message: `¿Desea eliminar este concepto tope?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.conceptoTopesService.delete(conceptoTope)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.onLoadData.emit();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el concepto tope, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el concepto tope.', life: 3000});
              return false;
            }
          });
      }
    });
  }

  closeModal(): void {
    this.form.reset();
    this.onCloseModalTope.emit();
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

  // Validar que cumpla con la expresión regular 23 números enteros
  validateValor(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,23})?$/g);
    return !valuePattern.test(control.value) ?
                      {'patternError': true } :
                      null;
  }

  // Validar que cumpla con la expresión regular 4 números enteros y 3 decimales máximos
  validateSueldo(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,4})(\.[0-9]{1,3})?$/g);
    return !valuePattern.test(control.value) ?
                      {'patternError': true } :
                      null;
  }

  // Validar que cumpla con la expresión regular 3 números enteros y 10 decimales máximos
  validateFactor(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,3})(\.[0-9]{1,10})?$/g);
    return !valuePattern.test(control.value) ?
                      {'patternError': true } :
                      null;
  }


}
