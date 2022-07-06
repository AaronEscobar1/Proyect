import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company, conceptoEconomicoData, SectorEmpresas } from '../../interfaces/compania.interfaces';
import { Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { CompaniaService } from '../../services/compania.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { Countrys, FederalEntities, ObjectEventChange } from 'src/app/shared/interfaces/country-entity.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() companias!     : Company[];
  @Input() companiaSelect!: Company | undefined;

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

  // Regex validators
  emailPattern    : string = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{3,}\\.[a-zA-Z]{2,}$';

  // Objetos
  sectorEmpre    : SectorEmpresas[] = [];
  conceptoEco    : dropdownType[]    = conceptoEconomicoData;
  countrys       : Countrys[]        = [];
  federalEntities: FederalEntities[] = [];

  constructor(private companiaService: CompaniaService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      id:             ['' , [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      nombre:         ['' , [ Validators.required, Validators.maxLength(70) ]],
      nombreAbrev:    ['' , [ Validators.required, Validators.maxLength(30) ]],
      clave:          ['' , [ Validators.maxLength(20) ]],
      sectorEmp:      [   , [ Validators.required ]],
      publica:        [   , [ Validators.required ]],
      capitalPag:     [   , [ this.validateCapital.bind(this) ]], 
      capitalSub:     [   , [ this.validateCapital.bind(this) ]],
      rif1:           [   , [ Validators.required, Validators.maxLength(15) ]],
      rif2:           [   , [ Validators.maxLength(15) ]],
      idPais:         [  ],
      idEntfe:        [  ],
      ciudad:         [   , [ Validators.maxLength(30) ]],
      codPostal:      [   , [ Validators.maxLength(10) ]],
      telefono1:      [   , [ Validators.required, Validators.pattern('[0-9]{1,15}') ]],
      telefono2:      [   , [ Validators.pattern('[0-9]{1,15}') ]],
      fax:            [   , [ Validators.maxLength(15) ]],
      eMail:          [   , [ Validators.maxLength(60), Validators.pattern(this.emailPattern) ]],
      paginaWeb:      [   , [ this.validatePaginaWeb.bind(this) ]],
      feFunda:        [  ],
      direccion:      [   , [ Validators.required, Validators.maxLength(120) ]],
      filemail:       [   , [ Validators.maxLength(60), Validators.pattern(this.emailPattern) ]],
      subprocesoRnet: [   , [ Validators.pattern('[0-9]{1,10}') ]],
    });
  }

  ngOnInit(): void {
    this.loadCountrysData();
    this.loadSectoresEmpresas();
  }

  ngOnChanges() {
    if (!this.isEdit) {
      this.form.reset();
      this.form.controls['id'].enable();
      this.form.controls['idEntfe'].disable();
      return;
    }
    this.form.controls['id'].disable();
    // Comprobar si la empresa tiene fecha para establecerlo en el formulario y poder editar
    if (this.companiaSelect && this.companiaSelect.feFunda) {
      this.companiaSelect.feFunda = this.companiaSelect.feFunda ? new Date(this.companiaSelect.feFunda) : null;
    }
    // Cargar pais y entidades si existen
    if ( this.companiaSelect && this.companiaSelect.idPais ) {
      this.loadEntitiesByCountry(this.companiaSelect.idPais);
    }
    this.form.reset(this.companiaSelect); 
  }

  /**
   * Carga todos los países
   */
  loadCountrysData(): void {
    this.spinner.show()
    this.companiaService.getAllCountry()
      .subscribe({
        next: (resp) => {
          this.countrys = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Carga lista de sectores empresariales
   */
  loadSectoresEmpresas(): void {
    this.spinner.show()
    this.companiaService.getSectoresEmpresas()
      .subscribe({
        next: (resp) => {
          this.sectorEmpre = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Carga las entidades relacionadas con el país
   * @param codCountry: string código país a buscar
   */
  loadEntitiesByCountry(codCountry: string): void {
    this.federalEntities = [];
    this.spinner.show();
    this.companiaService.getEntitiesByCountry(codCountry)
      .subscribe({
        next: (resp) => {
          this.federalEntities = resp;
          this.form.controls['idEntfe'].enable();
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: Company = this.form.getRawValue();
    // Enviar eMail o telefono2 null
    data.eMail == '' ? data.eMail = null : data.eMail;
    data.telefono2 == '' ? data.telefono2 = null : data.telefono2;
    // Validamos que país y entidad posean datos
    if ( data.idPais && !data.idEntfe ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar tanto el país como la entidad federal.', life: 3000});
      return;
    }
    
    this.spinner.show();
    
    if (this.isEdit) {
      // Editar
      this.companiaService.update(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la compañia.', life: 3000});
        }
      });
      return;
    }

    // Crear
    this.companiaService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la empresa.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
    this.selectRowService.selectRow$.emit(null);
  }

  /**
   * Realiza petición al backend para buscar las entidades relacionadas con el país
   * @param event: ObjectEventChange
   */
  countrySelectChange(event: ObjectEventChange): void {
    const codCountry = event.value;
    if (codCountry == null) { return; }
    // Limpiamos el campo entidad federal
    this.clearEntitySelect();
    // Peticion al backend para buscar las entidades
    this.loadEntitiesByCountry(codCountry);
  }

  /**
   * Limpia el campo país que se muestra en el formulario
   */
  clearCountrySelect() {
    this.clearEntitySelect();
    this.federalEntities = [];
    this.form.controls['idEntfe'].disable();
  }

  /**
   * Limpia el campo entidad federal que se muestra en el formulario
   */
  clearEntitySelect() {
    this.form.controls['idEntfe'].reset();
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid( campo: string ) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
            && this.form.invalid;
  }

  // Mensajes de errores id
  get idMsgError(): string {
    const errors = this.form.get('id')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 4 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores nombre
  get nombreMsgError(): string {
    const errors = this.form.get('nombre')?.errors;
    if ( errors?.required ) {
      return 'El nombre es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El nombre es de longitud máxima de 70 dígitos.';
    }
    return '';
  }

  // Mensajes de errores nombreAbrev
  get nombreAbrevMsgError(): string {
    const errors = this.form.get('nombreAbrev')?.errors;
    if ( errors?.required ) {
      return 'El nombre abreviado es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El nombre abreviado es de longitud máxima de 30 dígitos.';
    }
    return '';
  }

  // Mensajes de errores rif1
  get rif1MsgError(): string {
    const errors = this.form.get('rif1')?.errors;
    if ( errors?.required ) {
      return 'El primer rif es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El primer rif es de longitud máxima de 15 dígitos y es de formato alfanumérico.';
    }
    return '';
  }

  // Mensajes de errores telefono1
  get telefono1MsgError(): string {
    const errors = this.form.get('telefono1')?.errors;
    if ( errors?.required ) {
      return 'El primer teléfono es obligatorio.';
    } else if ( errors?.pattern ) {
      return 'El primer teléfono es de longitud máxima de 15 dígitos y es de formato numérico.';
    }
    return '';
  }

  // Mensajes de errores eMail
  get eMailMsgError(): string {
    const errors = this.form.get('eMail')?.errors;
    if ( errors?.maxlength ) {
      return 'El correo electrónico es de longitud máxima de 60 dígitos.';
    } else if ( errors?.pattern ) {
      return 'El correo electrónico no tiene un formato valido.';
    }
    return '';
  }

  // Mensajes de errores direccion
  get direccionMsgError(): string {
    const errors = this.form.get('direccion')?.errors;
    if ( errors?.required ) {
      return 'La dirección es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La dirección es de longitud máxima de 120 dígitos.';
    }
    return '';
  }

  // Mensajes de errores filemail
  get filemailMsgError(): string {
    const errors = this.form.get('filemail')?.errors;
    if ( errors?.maxlength ) {
      return 'El servidor de correo es de longitud máxima de 60 dígitos.';
    } else if ( errors?.pattern ) {
      return 'El servidor de correo no tiene un formato valido.';
    }
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.companias.findIndex(val => val.id === control.value) > -1 ?
                                    {'duplicated': true} :
                                    null;
  }

  // Validar que cumpla con la expresión regular 25 numeros enteros y 9 decimales maximo
  validateCapital(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let capitalPattern = new RegExp(/^([0-9]{1,25})(\.[0-9]{1,9})?$/g);
    return !capitalPattern.test(control.value) ? 
                              {'patternError': true } :
                              null;
  }

  // Validar que cumpla con la expresión regular pagina web correcta
  validatePaginaWeb(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    let paginaWebPattern = new RegExp(/^(https?:\/\/)?[a-zA-Z0-9\-]+\.[a-zA-Z0-9\/\-\?\=]{2,}/g);
    return !paginaWebPattern.test(control.value) ?
                                {'patternError': true} :
                                null;
  }

}
