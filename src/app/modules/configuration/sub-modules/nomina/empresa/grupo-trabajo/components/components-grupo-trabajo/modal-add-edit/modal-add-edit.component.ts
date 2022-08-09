import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GrupoTrabajo, tipoJornadaData } from '../../../interfaces/grupo-trabajo.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { GrupoTrabajoService } from '../../../services/grupo-trabajo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../interfaces/nominas.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto de grupos de trabajo por empresa y nomina
  @Input() gruposTrabajo: GrupoTrabajo[] = [];

  // Objeto seleccionado para editar
  @Input() grupoTrabajoSelect!: GrupoTrabajo | undefined;

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit      : boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();
  
  // Objeto
  tipoJornada: dropdownType[] = tipoJornadaData;

  // Formulario reactivo
  form!: FormGroup;

  // Variable para obtener el form group de tipoJornada y a su vez validar si el campo de los controles tiene errores
  get tipoJornadaFormGroup() {
    return this.form.controls['tipoJornada'] as FormGroup;
  }

  constructor(private grupoTrabajoService: GrupoTrabajoService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      codgru:  [  , [ Validators.required, Validators.maxLength(2), this.validatedId.bind(this) ] ],
      desgru:  [  , [ Validators.required, Validators.maxLength(30) ]],
      tipoJornada: this.fb.group({
          id:  ["D", [ Validators.required ]]
      }),
      labdom:  [false]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      const initForm = { codgru: '', desgru: '', tipoJornada: { id: 'D' }, labdom: false };
      this.form.reset(initForm);
      this.form.controls['codgru'].enable();
      return;
    }
    this.form.controls['codgru'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.grupoTrabajoSelect);
    // Validamos si la propiedad labdom es = 1, si es = 1 le asignamos true para marcar el check
    (this.grupoTrabajoSelect && this.grupoTrabajoSelect.labdom) === "1" ? this.form.controls['labdom'].reset(true) : this.form.controls['labdom'].reset(false);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: GrupoTrabajo = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.desgru.trim();
    data.labdom = data.labdom ? "1" : "0";
    
    this.spinner.show();

    if (this.isEdit) {
      // Editar
      this.grupoTrabajoService.update(this.empresaRow.id, this.nominaRow.tipnom, data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.grupoTrabajoService.selectRowGrupo$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el grupo de trabajo.', life: 3000});
        }
      });
      return;
    }
    
    // Crear
    this.grupoTrabajoService.create(this.empresaRow.id, this.nominaRow.tipnom, data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.grupoTrabajoService.selectRowGrupo$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el grupo de trabajo.', life: 3000});
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
  get codgruMsgError(): string {
    const errors = this.form.get('codgru')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 2 dígitos y formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores id
  get desgruMsgError(): string {
    const errors = this.form.get('desgru')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos y formato alfanumérico.';
    }
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.gruposTrabajo.findIndex(val => val.codgru === control.value) > -1 ?
                                        {'duplicated': true} :
                                        null;
  }

}
