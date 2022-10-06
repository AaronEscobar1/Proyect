import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { CentrosMedicos } from '../../interfaces/centro-medico.interfaces';
import { CentrosMedicosService } from '../../services/centros-medicos.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
})
export class ModalAddEditComponent implements OnInit {

  // Objetos de centros médicos para validaciones
  @Input() centrosMedicos!: CentrosMedicos[];

  // Objeto seleccionado para editar
  @Input() centrosMedicosSelect!: CentrosMedicos | undefined;

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit: boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  constructor(private centrosMedicosService: CentrosMedicosService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      codmed: ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      desmed: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this) ]]
    });
  }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.controls['codmed'].enable();
      return;
    }
    this.form.controls['codmed'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.centrosMedicosSelect);
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
    let data: CentrosMedicos = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.desmed.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.centrosMedicosService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.selectRowService.selectRow$.emit(null);
            this.onLoadData.emit();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el centro médico.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.centrosMedicosService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.selectRowService.selectRow$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el centro médico.', life: 3000});
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
  
  // Mensajes de errores dinamicos
  get codmedMsgError(): string {
    const errors = this.form.get('codmed')?.errors;
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
  get desmedMsgError(): string {
    const errors = this.form.get('desmed')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
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
      const duplicated = this.centrosMedicos.findIndex(med => med.codmed === control.value);
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
  validatedDesniv(control: AbstractControl): ValidationErrors | null {
    if (this.isEdit) {
      if( !control.value ) { return null; }
      const duplicatedEdit = this.centrosMedicos.findIndex(
        med => med.desmed.trim().toLowerCase() === this.form.getRawValue().desmed.trim().toLowerCase() 
                  && med.codmed !== this.form.getRawValue().codmed
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.centrosMedicos.findIndex(med => med.desmed.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }
}
