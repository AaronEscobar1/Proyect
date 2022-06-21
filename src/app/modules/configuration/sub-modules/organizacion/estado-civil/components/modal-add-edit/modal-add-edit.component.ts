import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EstadoCivil } from '../../interfaces/estado-civil.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EstadoCivilService } from '../../services/estado-civil.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() estadosCiviles!   : EstadoCivil[];
  @Input() estadoCivilSelect!: EstadoCivil | undefined;

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

  constructor(private estadoCivilService: EstadoCivilService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      id:        ['', [ Validators.required, Validators.maxLength(1), this.validatedId.bind(this) ]],
      nombre:    ['', [ Validators.required, Validators.maxLength(30), this.validatedDesc.bind(this) ]],
      codigoLey: ['', [ Validators.maxLength(1) ]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (!this.isEdit) {
      this.form.controls['id'].enable();
      return;
    }
    this.form.controls['id'].disable();
    this.form.reset(this.estadoCivilSelect); 
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: EstadoCivil = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.nombre.trim();
    
    this.spinner.show();
    
    if (this.isEdit) {
      // Editar
      this.estadoCivilService.update(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el estado civil.', life: 3000});
        }
      });
      return;
    }

    // Crear
    this.estadoCivilService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo creado el estado civil.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
    this.selectRowService.selectRow$.emit(null);
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid( campo: string ) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

  // Mensajes de errores dinamicos
  get idMsgError(): string {
    const errors = this.form.get('id')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 1 dígito.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get nombreMsgError(): string {
    const errors = this.form.get('nombre')?.errors;
    if ( errors?.required ) {
      return 'El nombre es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El nombre es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'El nombre ya existe.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get codigoLeyMsgError(): string {
    const errors = this.form.get('codigoLey')?.errors;
    if ( errors?.maxlength ) {
      return 'El código oficial es de longitud máxima de 1 dígito.';
    }
    return '';
  }

  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.estadosCiviles.findIndex(val => val.id === control.value) > -1 ?
                                              {'duplicated': true} :
                                              null;
  }

  validatedDesc(control: AbstractControl): ValidationErrors | null {
    // Validaciones para crear
    if ( !this.isEdit ) {
      if ( !control.value ) { return null; }
      return this.estadosCiviles.findIndex(val => val.nombre.trim().toLowerCase() === control.value.trim().toLowerCase()) > -1 ? 
                                                {'duplicated': true} :
                                                null;
    }
    // Validaciones para editar 
    if ( this.form.getRawValue().descrip == null ) { return null; }
    return this.estadosCiviles.findIndex(val => val.nombre.trim().toLowerCase() === this.form.getRawValue().nombre.trim().toLowerCase() && 
                                              val.id !== this.form.getRawValue().id) > -1 ? 
                                              {'duplicated': true} :
                                              null;
  }

}
