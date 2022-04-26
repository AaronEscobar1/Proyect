import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
})
export class ModalAddEditComponent implements OnInit {

  @Input() niveles!: NivelesEducativos[];
  @Input() nivelSelect!: any;
  @Input() addNivelModal!: boolean;
  @Output() onCloseModalAdd  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();
  @Input() isEdit: boolean = false;
  @Input() titleForm!: string;

  formNiveles!: FormGroup;

  constructor(
      private nivelesServices: NivelesEducativosService, 
      private spinner: NgxSpinnerService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private fb: FormBuilder,
      private helpers: Helpers
  ) { 
    this.formNiveles = this.fb.group({
      codniv: ['', [ Validators.required, Validators.pattern('[1-9]'), Validators.maxLength(1), this.validatedId.bind(this) ]],
      desniv: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this)]],
      codley: ['', [ Validators.maxLength(3) ]]
    });
  }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChange) {
    if (this.isEdit == true) {
      console.log(changes);
      this.formNiveles.controls['codniv'].disable();
      this.formNiveles.reset(this.nivelSelect); 
    }
  }

  saveNivel(): void {
    if (this.formNiveles.invalid) {
      this.formNiveles.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data = this.formNiveles.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.desniv.trim();
    
    this.spinner.show();
    
    if (this.isEdit) {
      // Editar
      this.nivelesServices.updateNivel(data)
      .subscribe(resp => {
        this.closeModalAdd();
        this.spinner.hide();
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
        this.onLoadData.emit();
      }, (error) => {
        this.spinner.hide();
        this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el nivel educativo.', life: 3000});
      });
    } else {
      // Crear
      this.nivelesServices.createNivel(data)
        .subscribe(resp => {
          this.closeModalAdd();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        }, (error) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo creado el nivel educativo.', life: 3000});
        });
    }
    this.formNiveles.reset();
    this.nivelesServices.selectRow$.emit(null);
  }

  closeModalAdd(): void {
    this.onCloseModalAdd.emit();
    this.formNiveles.reset();
    this.nivelesServices.selectRow$.emit(null);
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid( campo: string ) {
    return (this.formNiveles.controls[campo].errors) 
            && (this.formNiveles.controls[campo].touched || this.formNiveles.controls[campo].dirty)
             && this.formNiveles.invalid;
  }

  // Mensajes de errores dinamicos
  get codnivMsgError(): string {
    const errors = this.formNiveles.get('codniv')?.errors;
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
    const errors = this.formNiveles.get('desniv')?.errors;
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
    if (this.isEdit) {
      if( !control.value && !this.formNiveles.getRawValue() && this.niveles) { return null; }
      const duplicatedEdit = this.niveles.findIndex(
        nivel => nivel.desniv.trim().toLowerCase() === this.formNiveles.getRawValue().desniv.trim().toLowerCase() 
                  && nivel.codniv !== this.formNiveles.getRawValue().codniv
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.niveles.findIndex(nivel => nivel.desniv.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
