import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
})
export class ModalAddEditComponent implements OnInit {

  // Objetos
  @Input() niveles!    : NivelesEducativos[];
  @Input() nivelSelect!: NivelesEducativos | undefined;

  // Banderas
  @Input() addNivelModal!: boolean;
  @Input() isEdit: boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (Cerrar modal, cargarData)
  @Output() onCloseModalAdd  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();

  // Formulario
  form!: FormGroup;

  constructor(private nivelesServices: NivelesEducativosService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) { 
    this.form = this.fb.group({
      codniv: ['', [ Validators.required, Validators.pattern('[1-9]'), Validators.maxLength(1), this.validatedId.bind(this) ]],
      desniv: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this)]],
      codley: ['', [ Validators.maxLength(3) ]]
    });
  }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
    if (this.isEdit) {
      this.form.controls['codniv'].disable();
      this.form.reset(this.nivelSelect); 
    } else {
      this.form.controls['codniv'].enable();
    }
  }

  saveNivel(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.desniv.trim();
    
    this.spinner.show();
    
    if (this.isEdit) {
      // Editar
      this.nivelesServices.updateNivel(data)
      .subscribe({
        next: (resp) => {
          this.closeModalAdd();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el nivel educativo.', life: 3000});
        }
      });
      return;
    }

    // Crear
    this.nivelesServices.createNivel(data)
      .subscribe({
        next: (resp) => {
          this.closeModalAdd();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo creado el nivel educativo.', life: 3000});
        }
      });
  }

  closeModalAdd(): void {
    this.onCloseModalAdd.emit();
    this.form.reset();
    this.nivelesServices.selectRow$.emit(null);
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
  get codnivMsgError(): string {
    const errors = this.form.get('codniv')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.pattern ) {
      return 'El código es de longitud de 1 dígito.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get desnivMsgError(): string {
    const errors = this.form.get('desniv')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
    }
    return '';
  }

  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
      const duplicated = this.niveles.findIndex(nivel => nivel.codniv === control.value);
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
  }

  validatedDesniv(control: AbstractControl): ValidationErrors | null {
    if ( this.isEdit ) {
      if ( this.form.getRawValue().desniv == null ) { return null };
        const duplicatedEdit = this.niveles.findIndex(
          nivel => nivel.desniv.trim().toLowerCase() === this.form.getRawValue().desniv.trim().toLowerCase() 
                    && nivel.codniv !== this.form.getRawValue().codniv
        );
        if (duplicatedEdit > -1) {
          return {'duplicated': true};
        }
        return null;
    } else {
      if ( !control.value ) { return null; }
      const duplicated = this.niveles.findIndex(nivel => nivel.desniv.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
