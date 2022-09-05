import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { Institucion } from '../../interfaces/instituciones.interfaces';
import { TipoInstitucion } from '../../../tipo-instituciones-deposito/interfaces/tipo-instituciones-deposito.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Countrys, Dropdown, FederalEntities, ObjectEventChange } from 'src/app/shared/interfaces/country-entity.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { InstitucionesService } from '../../services/instituciones.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { TipoCuenta } from '../../../tipo-cuenta/interaces/tipo-cuenta.interfaces';
import { ProgramasInstitucionService } from '../../services/programas-institucion.service';
import { InstitucionPrograma, TipoPrograma } from '../../interfaces/instituciones-programas.interfaces';
import { DataTableProgramasComponent } from './data-table-programas/data-table-programas.component';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss']
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados
  @Input() instituciones: Institucion[] = [];

  // Variable de seleccion para editar
  @Input() institucionSelect!: Institucion | undefined;

  // Objeto para cargar los tipos de instituciones
  @Input() tiposInstituciones!: TipoInstitucion[];

  // Objeto para cargar paises
  @Input() countrys: Countrys[] = [];

  // Objeto para tipos de cuentas
  @Input() tiposCuentas: TipoCuenta[] = [];

  // Objeto para Entidades federales
  federalEntities!: FederalEntities[];

  // Campos no editables, solo para mostrar
  countrySelect      : string = '';
  federalEntitySelect: string = '';

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

  // Variable para obtener el form group de spiPaisEntidadFedTb y a su vez validar si el campo de los controles tiene errores
  get spiPaisEntidadFedTbFormGroup() {
    return this.form.controls['spiPaisEntidadFedTb'] as FormGroup;
  }

  // Variable para obtener el form group de spiPaisEntidadFedTb y a su vez validar si el campo de los controles tiene errores
  get tctaTipctaFormGroup() {
    return this.form.controls['tctaTipcta'] as FormGroup;
  }

  // Variables para mostrar los Tab del formulario, deposito a terceros o programas de deposito
  tabIndex = 0;
  
  // Objeto para programas por depositos
  programasDepositos: InstitucionPrograma[] = [];

  // Objeto para tipos de programas
  tiposProgramas: TipoPrograma[] = [];

  // Emisión de evento de padre a hijo (resetear valores de programas)
  @ViewChild(DataTableProgramasComponent) dataTableProgramasComponent!: DataTableProgramasComponent;

  constructor(private companyNominaService: CompanyNominaService, 
              private institucionesService: InstitucionesService, 
              private programasInstitucionService: ProgramasInstitucionService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa:  [  ],
      tipiCodtip: [  , [ Validators.required ]],
      codins:     [  , [ Validators.required, Validators.maxLength(10), this.validatedId.bind(this) ]],
      desins:     [  , [ Validators.required, Validators.maxLength(30) ]],
      nrorif:     [  , [ Validators.maxLength(15) ]],
      nomcon:     [  , [ Validators.maxLength(30) ]],
      codrie:     [  , [ Validators.maxLength(10) ]],
      direc1:     [  , [ Validators.maxLength(40) ]],
      direc2:     [  , [ Validators.maxLength(40) ]],
      direc3:     [  , [ Validators.maxLength(40) ]],
      spiPaisEntidadFedTb: this.fb.group({
        codPais:    [  , [ Validators.required ]],
        codEntidad: [  , [ Validators.required ]]
      }),
      cdadCodciu: [  , [ Validators.required, Validators.maxLength(30) ]],
      nrotl1:     [  , [ Validators.pattern('[0-9]{1,15}') ]],
      nrotl2:     [  , [ Validators.pattern('[0-9]{1,15}') ]],
      nrofax:     [  , [ Validators.pattern('[0-9]{1,15}') ]],
      nrocta:     [  , [ Validators.pattern('[0-9]{1,20}') ]],
      tctaTipcta: this.fb.group({
        tipcta: [  , [ Validators.maxLength(1) ]],
      }),
      noctto:     [  , [ Validators.maxLength(20) ]],
      ctacon:     [  , [ Validators.maxLength(36) ]],
      cfTipoInstitutoFinanTb: []
    });
  }

  ngOnInit(): void {
    this.loadTiposProgramas();
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.countrySelect = '';
      this.federalEntitySelect = '';
      this.form.reset();
      this.form.controls['codins'].enable();
      this.form.controls['tipiCodtip'].enable();
      this.spiPaisEntidadFedTbFormGroup.controls['codEntidad'].disable();
      return;
    }
    this.form.controls['codins'].disable();
    this.form.controls['tipiCodtip'].disable();
    // Agregamos un objeto vacio para omitir error 'Cannot read properties of null tipcta'
    if ( this.institucionSelect && !this.institucionSelect.tctaTipcta ) {
      this.institucionSelect.tctaTipcta = { };
    }
    // Cargar pais y entidades si existen
    if ( this.institucionSelect && this.institucionSelect.spiPaisEntidadFedTb.codPais ) {
      this.loadEntitiesByCountry(this.institucionSelect.spiPaisEntidadFedTb.codPais, this.institucionSelect.spiPaisEntidadFedTb.codEntidad);
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.institucionSelect);
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
    let data: Institucion = this.form.getRawValue();
    // Eliminamos objeto tctaTipcta si no se manda el id de tctaTipcta.
    if ( data.tctaTipcta && data.tctaTipcta.tipcta === null ) {
      delete data.tctaTipcta;
    }

    this.spinner.show();

    // Editar
    if (this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idEmpresa, tipiCodtip, codins,...dataUpdate } = data;
      this.institucionesService.update(data, dataUpdate)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la institución.', life: 3000});
        }
      });
      return;
    }
    
    // Crear
    // Asignar el id empresa a la localidad para crear
    data.idEmpresa = this.empresaRow.id;
    this.institucionesService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la institución.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.tabIndex = 0;
    this.onCloseModal.emit();
    this.form.reset();
    // Limpiar objeto y FormArray de programasDepositos por institucion
    this.programasDepositos = [];
    this.dataTableProgramasComponent.clearFormArray();
  }

  /**
   * Limpia el campo país que se muestra en el formulario
   */
  clearCountrySelect() {
    this.clearEntitySelect();
    this.federalEntities = [];
    this.spiPaisEntidadFedTbFormGroup.controls['codEntidad'].disable();
    this.countrySelect = '';
  }

  /**
   * Limpia el campo entidad federal que se muestra en el formulario
   */
  clearEntitySelect() {
    this.spiPaisEntidadFedTbFormGroup.controls['codEntidad'].reset();
    this.federalEntitySelect = '';
  }

  /**
   * Asigna el país seleccionado en el campo que se muestra en el formulario y
   * realiza petición al backend para buscar las entidades relacionadas con el país
   * @param event: ObjectEventChange
   * @param dropdownElement: Dropdown
   */
  countrySelectChange(event: ObjectEventChange, dropdownElement: Dropdown): void {
    const codCountry = event.value;
    if (codCountry == null) { return; }
    // Asignamos el país al campo en el formulario
    this.countrySelect = dropdownElement.selectedOption.nombre;
    // Limpiamos el campo entidad federal
    this.clearEntitySelect();
    // Peticion al backend para buscar las entidades
    this.loadEntitiesByCountry(codCountry);
  }

  /**
   * Carga las entidades relacionadas con el país
   * @param codCountry: string código país a buscar
   * @param codEntity: string (opcional) código entidad para mostrar en el formulario
   */
  loadEntitiesByCountry(codCountry: string, codEntity?: string | null): void {
    this.federalEntities = [];
    this.spinner.show();
    this.companyNominaService.getEntitiesByCountry(codCountry)
      .subscribe({
        next: (resp) => {
          this.federalEntities = resp;
          this.spiPaisEntidadFedTbFormGroup.controls['codEntidad'].enable();
          // Colocar el nombre del pais y la entidad en el campo del formulario
          if (this.isEdit) {
            this.countrys.find(country => country.codigo === codCountry ? this.countrySelect = country.nombre : '');
            this.federalEntities.find(entity => entity.codEntidad === codEntity ? this.federalEntitySelect = entity.nombre : '');
          }
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Asigna la entidad federal seleccionada en el campo que se muestra en el formulario
   * @param dropdownElement: Dropdown
   */
  entitySelectChange(dropdownElementEntity: Dropdown): void {
    this.federalEntitySelect = dropdownElementEntity.selectedOption.nombre;
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
  get codinsMsgError(): string {
    const errors = this.form.get('codins')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 10 dígitos, formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get desinsMsgError(): string {
    const errors = this.form.get('desins')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos, formato alfanumérico.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get cdadCodciuMsgError(): string {
    const errors = this.form.get('cdadCodciu')?.errors;
    if ( errors?.required ) {
      return 'La ciudad es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La ciudad es de longitud máxima de 30 dígitos, formato alfanumérico.';
    }
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.instituciones.findIndex(val => val.codins === control.value) > -1 ?
                                        {'duplicated': true} :
                                        null;
  }

  backFormulario(): void {
    this.tabIndex = 0;
    // Limpiar objeto y FormArray de programasDepositos por institucion
    this.dataTableProgramasComponent.clearFormArray();
  }

  /****************************************************
   *                  PROGRAMAS                       *
   ****************************************************/
  /**
   * Cargar tipos de programas
   */
  loadTiposProgramas(): void {
    this.spinner.show();
    this.programasInstitucionService.getTiposProgramas()
      .subscribe({
        next: (resp) => {
          this.tiposProgramas = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Cargar programas por Institución de deposito
   */
  loadProgramas(): void {
    if ( !this.institucionSelect ) { return; }
    this.tabIndex = 2;
    this.spinner.show();
    this.programasInstitucionService.getProgramaInstitucionesByEmpresa(this.institucionSelect)
      .subscribe({
        next: (resp) => {
          this.programasDepositos = resp;
          // Mapeo la data y agrego un atributo `idTableTemporal` para colocarlo como [dataKey] en la tabla table edit
          this.programasDepositos = this.programasDepositos.map((data, index) => { 
            return {...data, idTableTemporal: index }
          });
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }
}
