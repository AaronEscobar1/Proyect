import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Sindicatos, Countrys, ObjectEventChange, FederalEntities } from '../../interfaces/sindicatos.interfaces';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { SindicatosService } from '../../services/sindicatos.service';
import { Dropdown } from 'primeng/dropdown';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-sindicatos',
  templateUrl: './sindicatos.component.html',
  styleUrls: ['./sindicatos.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class SindicatosComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // Objetos
  sindicatos         : Sindicatos[]      = [];
  typesFile          : TypesFile[]       = typesFileData;
  countrys           : Countrys[]        = [];
  countrySelect      : String            = '';
  federalEntities    : FederalEntities[] = [];
  federalEntitySelect: String            = '';

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar sindicato';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private sindicatosService: SindicatosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      codsin:  ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      dessin:  ['', [ Validators.required, Validators.maxLength(60), this.validatedDes.bind(this) ]],
      // Registro
      registro:  [  ],
      nroreg:    [  , [ Validators.pattern('[0-9]{1,4}') ]],
      ntomo:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      nfolio:    [  , [ Validators.pattern('[0-9]{1,4}') ]],
      // Inspectoria
      local:     ['0'],
      // Direccion
      dirsi1:     [  ],
      paiCodpai:  [  ],
      edoCodedo:  [  ],
      cdadCodciu: [  , [ Validators.maxLength(30) ]],
      tlfsi1:     [  ],
      tlfsi2:     [  ],
      faxsin:     [  ],
      tlxsin:     [  ],
      eMail:      [  , [ Validators.maxLength(30), Validators.pattern(this.emailPattern) ]]
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.loadCountrysData();
  }

  loadData(): void {
    this.spinner.show();
    this.sindicatosService.getAll()
      .subscribe({
        next: (resp) => {
          this.sindicatos = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Carga todos los países
   */
  loadCountrysData(): void {
    this.spinner.show();
    this.sindicatosService.getAllCountry()
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
   * Carga las entidades relacionadas con el país
   * @param codCountry: string código país a buscar
   * @param codEntity: string (opcional) código entidad para mostrar en el formulario
   */
  loadEntitiesByCountry(codCountry: string, codEntity?: string | null): void {
    this.federalEntities = [];
    this.spinner.show();
    this.sindicatosService.getEntitiesByCountry(codCountry)
      .subscribe({
        next: (resp) => {
          this.federalEntities = resp;
          this.form.controls['edoCodedo'].enable();
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

  refresh(): void {
    this.sindicatos = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.form.controls['edoCodedo'].disable();
    this.titleForm = this.isEdit ? 'Editar sindicato' : 'Agregar sindicato';
    this.createModal = true;
  }
  
  closeModal(): void {
    this.form.controls['codsin'].enable();
    this.countrySelect = '';
    this.federalEntitySelect = '';
    this.isEdit = false;
    this.form.reset();
    this.form.controls['local'].setValue(0);
    this.createModal = false;
  }

  closeModalPrint(): void {
    this.printModal = false;
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Obtener formulario
    let data: Sindicatos = this.form.getRawValue();
    // Comprobamos que el email se envie un correo valido o un null
    data.eMail == '' ? data.eMail = null : data.eMail
    // Validamos que país y entidad posean datos
    if ( data.paiCodpai && !data.edoCodedo ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar tanto el país como la entidad federal.', life: 3000});
      return;
    }

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.sindicatosService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.loadData();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el sindicato.', life: 3000});
          } 
        });
      this.selectRowService.selectRow$.emit(null);
      return;
    }

    // Crear
    this.sindicatosService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.loadData();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el sindicato.', life: 3000});
        }
      });
  }

  /**
   * Carga la data en el formulario para editar
   * @param sindicatos row de la tabla
   */
  editRow(sindicatos: Sindicatos): void {
    this.isEdit = true;
    this.form.controls['codsin'].disable();
    // Comprobar si el sindicato tiene fecha de inscripción para establecerlo en el formulario y poder editar
    sindicatos.registro = sindicatos.registro ? new Date(sindicatos.registro) : sindicatos.registro;
    // Cargar pais y entidades si existen
    if ( sindicatos.paiCodpai ) {
      this.loadEntitiesByCountry(sindicatos.paiCodpai, sindicatos.edoCodedo);
    }
    this.form.reset(sindicatos);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param sindicato row de la tabla
   */
  deleteRow(sindicato: Sindicatos): void {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el sindicato <b>${sindicato.dessin}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.sindicatosService.delete(sindicato.codsin)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el sindicato', life: 3000});
            }
          });
      }
    });
  }

  /**
   * Limpia el campo país que se muestra en el formulario
   */
  clearCountrySelect() {
    this.clearEntitySelect();
    this.federalEntities = [];
    this.form.controls['edoCodedo'].disable();
    this.countrySelect = '';
  }

  /**
   * Limpia el campo entidad federal que se muestra en el formulario
   */
  clearEntitySelect() {
    this.form.controls['edoCodedo'].reset();
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
   * Asigna la entidad federal seleccionada en el campo que se muestra en el formulario
   * @param dropdownElement: Dropdown
   */
  entitySelectChange(dropdownElementEntity: Dropdown): void {
    this.federalEntitySelect = dropdownElementEntity.selectedOption.nombre;
  }

  /**
   * Metodo para exportar data
   */
  export() {

  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid(campo: string): boolean | null {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
              && this.form.invalid;
  }

  // Mensajes de errores dinamicos
  get codsinMsgError(): string {
    const errors = this.form.get('codsin')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máximo de 4 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get dessinMsgError(): string {
    const errors = this.form.get('dessin')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 60 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
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

  /**
   * Validar id duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
      const duplicated = this.sindicatos.findIndex(sin => sin.codsin === control.value);
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
  }

  /**
   * Validar descripcion duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedDes(control: AbstractControl): ValidationErrors | null {
    if (this.isEdit) {
      if( !control.value && !this.form.getRawValue() && this.sindicatos) { return null; }
      const duplicatedEdit = this.sindicatos.findIndex(
        sin => sin.dessin.trim().toLowerCase() === this.form.getRawValue().dessin.trim().toLowerCase() 
                  && sin.codsin !== this.form.getRawValue().codsin
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.sindicatos.findIndex(sin => sin.dessin.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
