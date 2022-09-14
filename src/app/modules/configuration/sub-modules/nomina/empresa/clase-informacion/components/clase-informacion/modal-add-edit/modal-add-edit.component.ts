import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { ClaseInformacion, Equivalencia, ClaseInformacionCreate } from '../../../interfaces/clase-informacion.interfaces';
import { ClaseInformacionService } from '../../../services/clase-informacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados
  @Input() clasesInformacion: ClaseInformacion[] = [];

  // Variable de seleccion para editar
  @Input() claseInformacionSelect!: ClaseInformacion | undefined;

  // Objeto para cargar equivalencias
  @Input() equivalencias!: Equivalencia[];

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
  
  constructor(private claseInformacionService: ClaseInformacionService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa: [  ],
      id:        [  , [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ] ],
      nombre:    [  , [ Validators.required, Validators.maxLength(32) ]],
      equivalencia: this.fb.group({
        id:      [  , [ Validators.maxLength(4) ]]
      })
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['id'].enable();
      return;
    }
    this.form.controls['id'].disable();
    // Agregamos un objeto vacio para omitir error 'Cannot read properties of null'
    if ( this.claseInformacionSelect && !this.claseInformacionSelect.equivalencia ) {
      this.claseInformacionSelect.equivalencia = { };
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.claseInformacionSelect);
    // Agregamos el idEmpresa y id al control del formulario
    if ( this.claseInformacionSelect ) {
      this.form.controls['id'].reset(this.claseInformacionSelect.nmInformacionClaseTbId.id);
      this.form.controls['idEmpresa'].reset(this.claseInformacionSelect.nmInformacionClaseTbId.idEmpresa);
    }
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
    let data: ClaseInformacionCreate = this.form.getRawValue();
    // Eliminamos objeto equivalencia si no se manda el id de equivalencia.
    if ( data.equivalencia && data.equivalencia.id === null ) {
      delete data.equivalencia;
    }

    this.spinner.show();

    // Editar
    if (this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { nombre, equivalencia } = data;
      // Data solamente para editar
      const dataUpdate = { nombre, equivalencia: equivalencia?.id };
      this.claseInformacionService.update(data, dataUpdate)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.claseInformacionService.selectRowClaseInformacion$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la clase de información.', life: 3000});
        }
      });
      return;
    }
    
    // Crear
    // Asignarle el id empresa al formulario
    data.idEmpresa = this.empresaRow.id;
    this.claseInformacionService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.claseInformacionService.selectRowClaseInformacion$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la clase de información.', life: 3000});
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
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 4 dígitos, formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores nombre
  get nombreMsgError(): string {
    const errors = this.form.get('nombre')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 32 dígitos, formato alfanumérico.';
    }
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.clasesInformacion.findIndex(val => val.nmInformacionClaseTbId.id === control.value) > -1 ?
                                            {'duplicated': true} :
                                            null;
  }

}
