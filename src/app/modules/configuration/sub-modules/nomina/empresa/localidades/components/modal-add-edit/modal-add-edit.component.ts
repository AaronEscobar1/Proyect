import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { Localidad } from '../../interfaces/localidades.interfaces';
import { FormGroup, AbstractControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { LocalidadesService } from '../../services/localidades.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Countrys, DireccionDisabled, Dropdown, FederalEntities, Municipality, ObjectEventChange, Parishes } from 'src/app/shared/interfaces/country-entity.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss']
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados 
  @Input() localidades: Localidad[] = [];

  // Variable de seleccion para editar
  @Input() localidadSelect!: Localidad | undefined;

  // Objeto para cargar paises
  @Input() countrys!: Countrys[] ;

  // Objeto para Entidades federales
  federalEntities!: FederalEntities[];

  // Objeto para Municipios
  municipalities!: Municipality[];

  // Objeto para Parroquias
  parishes!: Parishes[];

  // Campos no editables, solo para mostrar
  direccionDisabled!: DireccionDisabled;

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
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // Variable para mover pestaña de la vista por si existe un error
  tabIndex = 0;

  constructor(private companyNominaService: CompanyNominaService, 
              private localidadesService: LocalidadesService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      /**** Basica ****/
        codloc: [  , [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
        deslo1: [  , [ Validators.required, Validators.maxLength(60) ]],
        siglas: [  , [ Validators.maxLength(20) ]],
        numrif: [  , [ Validators.maxLength(15) ]],
        numnit: [  , [ Validators.maxLength(14) ]],
        nroord: [  , [ Validators.maxLength(6) ]],
        turnos: [  , [ Validators.pattern('[0-9]{1,3}') ]],
        nilcia: [  , [ Validators.maxLength(10) ]],
        nrosso: [  , [ Validators.maxLength(12) ]],
        riesso: [  , [ Validators.pattern('[0-9]{1,2}') ]],
        fecsso: [  ],
        regsso: [  , [ Validators.maxLength(20) ]],
        regmin: [  , [ Validators.maxLength(9) ]],
        horsem: [  , [ Validators.pattern('[0-9]{1,4}') ]],
        /* Informante */
        nominf:   [  , [ Validators.maxLength(30) ]],
        cgoinf:   [  , [ Validators.maxLength(30) ]],
        ideinf:   [  , [ Validators.maxLength(20) ]],
        nacional: [  , [ Validators.maxLength(50) ]],
      /**** Dirección ****/
        direc1:       [  , [ Validators.required, Validators.maxLength(60) ]],
        direc2:       [  , [ Validators.maxLength(60) ]],
        codPais:      [  , [ Validators.maxLength(3) ]],
        codEntidad:   [  , [ Validators.maxLength(3) ]],
        codMunicipio: [  , [ Validators.maxLength(4) ]],
        codParroquia: [  , [ Validators.maxLength(4) ]],
        numtlf:       [  , [ Validators.pattern('[0-9]{1,14}') ]],
        numfax:       [  , [ Validators.pattern('[0-9]{1,14}') ]],
        eMail:        [  , [ Validators.maxLength(30), Validators.pattern(this.emailPattern) ]],
        codpos:       [  , [ Validators.pattern('[0-9]{1,10}') ]],
      /**** Actividad económica ****/
        acteco: [  , [ Validators.maxLength(4) ]],
        caploc: [  , [ this.validateCapital.bind(this) ]],
        fecfun: [  ],
        proloc: [  , [ Validators.maxLength(30) ]],
        idepro: [  , [ Validators.maxLength(20) ]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.direccionDisabled = {};
      this.form.reset();
      this.tabIndex = 0;
      this.form.controls['codloc'].enable();
      this.form.controls['codEntidad'].disable();
      this.form.controls['codMunicipio'].disable();
      this.form.controls['codParroquia'].disable();
      return;
    }
    // Comprobar si la localidad tiene fecha registro S.S.O. para establecerlo en el formulario y poder editar
    if ( this.localidadSelect && this.localidadSelect.fecsso ) {
      this.localidadSelect.fecsso = new Date(this.localidadSelect.fecsso);
    }
    // Comprobar si la localidad tiene fundación para establecerlo en el formulario y poder editar
    if ( this.localidadSelect && this.localidadSelect.fecfun ) {
      this.localidadSelect.fecfun = new Date(this.localidadSelect.fecfun);
    }
    // Cargar pais, entidades, municipios y parroquias si existen
    if ( this.localidadSelect && this.localidadSelect.codPais ) {
      this.loadEntitiesByCountry(this.localidadSelect.codPais, this.localidadSelect.codEntidad);
      // Cargar municipios
      if ( this.localidadSelect.codEntidad ) {
        this.loadMunicipalitiesByCountryEntity(this.localidadSelect.codPais, this.localidadSelect.codEntidad, this.localidadSelect.codMunicipio);
      }
      // Carga parroquias
      if ( this.localidadSelect.codMunicipio ) {
        this.loadParishesByCountryEntityMunicipality(this.localidadSelect.codPais, this.localidadSelect.codEntidad, this.localidadSelect.codMunicipio, this.localidadSelect.codParroquia);
      }
    }
    this.form.controls['codloc'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.localidadSelect);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
   save(): void {
    if ( this.form.invalid ) {
      this.tabIndex = 0;
      if ( this.form.controls['direc1'].errors && (!this.form.controls['codloc'].errors && !this.form.controls['deslo1'].errors) ) {
        this.tabIndex = 1;
      }
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: Localidad = this.form.getRawValue();
    // Comprobamos que el email se envie un correo valido o un null
    data.eMail == '' ? data.eMail = null : data.eMail;

    this.spinner.show();

    // Editar
    if (this.isEdit) {
      this.localidadesService.update(this.empresaRow.id, data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la localidad.', life: 3000});
        }
      });
      return;
    }
    
    // Crear
    // Asignar el id empresa a la localidad para crear
    const idEmpresa = this.empresaRow.id;
    this.localidadesService.create(idEmpresa, data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la localidad.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.federalEntities = [];
    this.municipalities = [];
    this.parishes = [];
    this.onCloseModal.emit();
    this.form.reset();
  }

  /**
   * Limpia todos los campos relacionados con pais, entidad, municipio y parroquia
   */
  clearCountrySelect() {
    this.clearEntitySelect();
    this.federalEntities = [];
    this.form.controls['codEntidad'].disable();
    this.clearMunicipalitySelect();
    this.municipalities = [];
    this.form.controls['codMunicipio'].disable();
    this.clearParishesSelect();
    this.parishes = [];
    this.form.controls['codParroquia'].disable();
    this.direccionDisabled.pais = '';
  }

  /**
   * Limpia el campo entidad federal que se muestra en el formulario
   */
  clearEntitySelect() {
    this.clearMunicipalitySelect();
    this.municipalities = [];
    this.form.controls['codMunicipio'].disable();
    this.clearParishesSelect();
    this.parishes = [];
    this.form.controls['codParroquia'].disable();
    this.form.controls['codEntidad'].reset();
    this.direccionDisabled.entidad = '';
  }

  /**
   * Limpia el campo municipio que se muestra en el formulario
   */
  clearMunicipalitySelect() {
    this.clearParishesSelect();
    this.parishes = [];
    this.form.controls['codParroquia'].disable();
    this.form.controls['codMunicipio'].reset();
    this.direccionDisabled.municipio = '';
  }

  /**
   * Limpia el campo parroquia que se muestra en el formulario
   */
  clearParishesSelect() {
    this.form.controls['codParroquia'].reset();
    this.direccionDisabled.parroquia = '';
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
    this.direccionDisabled.pais = dropdownElement.selectedOption.nombre;
    // Limpiamos el campo entidad federal
    this.clearEntitySelect();
    // Peticion al backend para buscar las entidades
    this.loadEntitiesByCountry(codCountry);
  }

  /**
   * Cargar entidades relacionadas con el país
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
          this.form.controls['codEntidad'].enable();
          // Colocar el nombre del pais y la entidad en el campo del formulario
          if (this.isEdit) {
            this.countrys.find(country => country.codigo === codCountry ? this.direccionDisabled.pais = country.nombre : '');
            this.federalEntities.find(entity => entity.codEntidad === codEntity ? this.direccionDisabled.entidad = entity.nombre : '');
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
   * Asigna la entidad federal seleccionada en el campo que se muestra en el formulario y
   * realiza petición al backend para buscar los municipios relacionados con país y entidad
   * @param event: ObjectEventChange
   * @param dropdownElementEntity: Dropdown
   */
  entitySelectChange(event: ObjectEventChange, dropdownElementEntity: Dropdown): void {
    const codEntity = event.value;
    if (codEntity == null) { return; }
    // Buscar la entidad seleccionada de la lista para obtener el codigo de país
    const entidad = this.federalEntities.find(entity => entity.codEntidad == codEntity);
    // Asignamos el nombre de la entidad al campo del formulario
    this.direccionDisabled.entidad = dropdownElementEntity.selectedOption.nombre;
    // Limpiamos el campo municipio
    this.clearMunicipalitySelect();
    // Verificar que exista la entidad
    if ( !entidad ) { return; }
    // Peticion al backend para buscar los municipios
    this.loadMunicipalitiesByCountryEntity(entidad.codPais, codEntity);
  }

  /**
   * Cargar municipios relacionados por pais y entidad
   * @param codCountry: string código país a buscar
   * @param codEntity: string código entidad a buscar
   * @param codMunicipality: string (opcional) código municipio para mostrar en el formulario
   */
  loadMunicipalitiesByCountryEntity(codCountry: string, codEntity: string, codMunicipality?: string | null) {
    this.municipalities = [];
    this.spinner.show();
    this.companyNominaService.getMunicipalitiesByCountryEntity(codCountry, codEntity)
      .subscribe({
        next: (resp) => {
          this.municipalities = resp;
          this.form.controls['codMunicipio'].enable();
          // Colocar el nombre del municipio en el campo del formulario
          if (this.isEdit && codMunicipality) {
            this.municipalities.find(municipality => municipality.codMunicipio === codMunicipality ? this.direccionDisabled.municipio = municipality.nombre : '');
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
   * Asigna el municipio seleccionado en el campo que se muestra en el formulario y
   * realiza petición al backend para buscar las parroquias relacionados con país, entidad y municipio
   * @param event: ObjectEventChange
   * @param dropdownElementMunicipality: Dropdown
   */
  municipalitySelectChange(event: ObjectEventChange, dropdownElementMunicipality: Dropdown): void {
    const codMunicipio = event.value;
    if (codMunicipio == null) { return; }
    // Buscar el municipio seleccionado de la lista para obtener el codigo de país y entidad
    const municipio = this.municipalities.find(entity => entity.codMunicipio == codMunicipio);
    // Asignamos el nombre del municipio al campo del formulario
    this.direccionDisabled.municipio = dropdownElementMunicipality.selectedOption.nombre;
    // Limpiamos el campo parroquia
    this.clearParishesSelect();
    // Verificar que exista la entidad
    if ( !municipio ) { return; }
    // Peticion al backend para buscar las parroquias
    this.loadParishesByCountryEntityMunicipality(municipio.codPais, municipio.codEntidad, codMunicipio);
  }

  /**
   * Cargar parroquias relacionados por pais, entidad y municipio
   * @param codCountry: string código país a buscar
   * @param codEntity: string código entidad a buscar
   * @param codmunicipality: string código municipio a buscar
   * @param codParroquia: string (opcional) código parroquia para mostrar en el formulario
   */
  loadParishesByCountryEntityMunicipality(codCountry: string, codEntity: string, codmunicipality: string, codParroquia?: string | null) {
    this.parishes = [];
    this.spinner.show();
    this.companyNominaService.getParishesByCountryEntityMunicipality(codCountry, codEntity, codmunicipality)
      .subscribe({
        next: (resp) => {
          this.parishes = resp;
          this.form.controls['codParroquia'].enable();
          // Colocar el nombre de la parroquia en el campo del formulario
          if (this.isEdit && codParroquia) {
            this.parishes.find(parish => parish.codParroquia === codParroquia ? this.direccionDisabled.parroquia = parish.nombre : '');
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
   * Asigna la parroquia seleccionada en el campo que se muestra en el formulario
   * @param dropdownElementMunicipality: Dropdown
   */
  parishSelectChange(dropdownElementParish: Dropdown) {
    this.direccionDisabled.parroquia = dropdownElementParish.selectedOption.nombre;
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
  get codlocMsgError(): string {
    const errors = this.form.get('codloc')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 4 dígitos, formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get deslo1MsgError(): string {
    const errors = this.form.get('deslo1')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 60 dígitos, formato alfanumérico.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get direc1MsgError(): string {
    const errors = this.form.get('direc1')?.errors;
    if ( errors?.required ) {
      return 'El dirección 1 es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'El dirección 1 es de longitud máxima de 60 dígitos, formato alfanumérico.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get eMailMsgError(): string {
    const errors = this.form.get('eMail')?.errors;
    if ( errors?.maxlength ) {
      return 'El email es de longitud máxima de 30 dígitos.';
    } else if ( errors?.pattern ) {
      return 'El email no tiene un formato valido.';
    }
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.localidades.findIndex(val => val.codloc === control.value) > -1 ?
                                      {'duplicated': true} :
                                      null;
  }
  
  // Validar que cumpla con la expresión regular 5 números enteros y 2 decimales máximos
  validateCapital(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let valuePattern = new RegExp(/^([0-9]{1,5})(\.[0-9]{1,2})?$/g);
    return !valuePattern.test(control.value) ?
                          {'patternError': true } :
                          null;
  }

}
