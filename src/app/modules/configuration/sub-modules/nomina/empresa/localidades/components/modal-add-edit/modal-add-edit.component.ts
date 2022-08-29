import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { Localidad } from '../../interfaces/localidades.interfaces';
import { FormGroup, AbstractControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { LocalidadesService } from '../../services/localidades.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Countrys, Dropdown, FederalEntities, ObjectEventChange } from 'src/app/shared/interfaces/country-entity.interfaces';

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
  federalEntities!   : FederalEntities[];

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
        horsem: [  , [ Validators.pattern('[0-9]{1,8}') ]],
        /* Informante */
        nominf:   [  , [ Validators.maxLength(30) ]],
        cgoinf:   [  , [ Validators.maxLength(30) ]],
        ideinf:   [  , [ Validators.maxLength(20) ]],
        nacional: [  , [ Validators.maxLength(50) ]],
      /**** Dirección ****/
        direc1:     [  , [ Validators.required, Validators.maxLength(60) ]],
        direc2:     [  , [ Validators.maxLength(60) ]],
        codPais:    [  , [ Validators.maxLength(3) ]],
        codEntidad: [  , [ Validators.maxLength(3) ]],
        // <-- Falta ciudad --> //
        numtlf:     [  , [ Validators.pattern('[0-9]{1,14}') ]],
        numfax:     [  , [ Validators.pattern('[0-9]{1,14}') ]],
        eMail:      [  , [ Validators.maxLength(30), Validators.pattern(this.emailPattern) ]],
        codpos:     [  , [ Validators.pattern('[0-9]{1,10}') ]],
      /**** Ubicación ****/
        codMunicipio: [  ],
        codParroquia: [  , [ Validators.maxLength(20) ]],
        // <-- Falta entidad federal --> //
        // <-- Falta distrito --> //
        // <-- Falta sector --> //
      /**** Actividad económica ****/
        // <-- Falta codigo actividad economica --> //
        acteco: [  , [ Validators.maxLength(4) ]],
        caploc: [  , [ this.validateCapital.bind(this) ]],
        fecfun: [  ],
        proloc: [  , [ Validators.maxLength(30) ]],
        idepro: [  , [ Validators.maxLength(20) ]],
        // <-- Falta nombre de Establecimiento anterior --> //
        // <-- Falta direccion de Establecimiento anterior --> //
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      // const initForm = { clanom: '2', frenom: 7, valred: 0.1, pgmrec: 'NM3185H', tipfec: '1' };
      this.form.reset();
      this.tabIndex = 0;
      this.form.controls['codloc'].enable();
      this.form.controls['codEntidad'].disable();
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
    // Cargar pais y entidades si existen
    if ( this.localidadSelect && this.localidadSelect.codPais ) {
      this.loadEntitiesByCountry(this.localidadSelect.codPais, this.localidadSelect.codEntidad);
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
    if ( data.codPais && !data.codEntidad ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar tanto el país como la entidad federal.', life: 3000});
      this.tabIndex = 1;
      return;
    }

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
    this.onCloseModal.emit();
    this.form.reset();
  }

  /**
   * Limpia el campo país que se muestra en el formulario
   */
  clearCountrySelect() {
    this.clearEntitySelect();
    this.federalEntities = [];
    this.form.controls['codEntidad'].disable();
    this.countrySelect = '';
  }

  /**
   * Limpia el campo entidad federal que se muestra en el formulario
   */
  clearEntitySelect() {
    this.form.controls['codEntidad'].reset();
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
          this.form.controls['codEntidad'].enable();
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
