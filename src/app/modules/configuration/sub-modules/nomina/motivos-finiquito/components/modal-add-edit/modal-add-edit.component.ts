import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { ClasificacionMotivo, MotivosFiniquito } from '../../interfaces/motivos-finiquito.interfaces';
import { MotivosFiniquitoService } from '../../services/motivos-finiquito.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
})
export class ModalAddEditComponent implements OnInit {

  @Input() motivosFiniquito!: MotivosFiniquito[];
  @Input() motivoSelect!: any;
  @Input() createModal!: boolean;
  @Output() onCloseModal  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();
  @Input() isEdit: boolean = false;
  @Input() titleForm!: string;

  // Formulario reactivo
  form!: FormGroup;

  // Objetos 
  classificationMotive: ClasificacionMotivo[] = [];

  constructor(
      private motivosFiniquitoService: MotivosFiniquitoService, 
      private spinner: NgxSpinnerService,
      private messageService: MessageService,
      private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({
      coddes: ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      desde1: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this) ]],
      desde2: ['', [ Validators.maxLength(30) ]],
      impliq: [ false ],
      classo: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    this.classificationMotive = [
      { tipoReporte: 'IVSS: Tipo de trabajador-TIUNA',   codigoOficial: '1' },
      { tipoReporte: 'MINTRA: Clase de ocupación',       codigoOficial: '2' },
      { tipoReporte: 'IVSS: Condición trabajador-TIUNA', codigoOficial: '3' }
    ];
  }
  
  ngOnChanges() {
    if (this.isEdit == true) {
      this.form.controls['coddes'].disable();
      // Seteamos los valores del row seleccionado al formulario
      this.form.reset(this.motivoSelect);
      console.log(this.motivoSelect);
      
      // Validamos si la propiedad impliq es = 1, si es = 1 le asignamos true para marcar el check
      this.motivoSelect.impliq === "1" ? this.form.controls['impliq'].reset(true) : this.form.controls['impliq'].reset(false);
    } else {
      this.form.controls['coddes'].enable();
    }
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
    let data: MotivosFiniquito = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.desde1.trim();
    data.impliq = data.impliq ? "1" : "0";

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.motivosFiniquitoService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.onLoadData.emit();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el motivo de finiquito.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.motivosFiniquitoService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el motivo de finiquito.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
    this.motivosFiniquitoService.selectRow$.emit(null);
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
  get coddesMsgError(): string {
    const errors = this.form.get('coddes')?.errors;
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
  get desde1MsgError(): string {
    const errors = this.form.get('desde1')?.errors;
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
      const duplicated = this.motivosFiniquito.findIndex(mot => mot.coddes === control.value);
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
      if (this.motivosFiniquito != undefined) {
        if( !control.value && !this.form.getRawValue() && this.motivosFiniquito) { return null; }
        const duplicatedEdit = this.motivosFiniquito.findIndex(
          mot => mot.desde1.trim().toLowerCase() === this.form.getRawValue().desde1.trim().toLowerCase() 
                    && mot.coddes !== this.form.getRawValue().coddes
        );
        if (duplicatedEdit > -1) {
          return {'duplicated': true};
        }
        return null;
      } else {
        return null
      }
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.motivosFiniquito.findIndex(mot => mot.desde1.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }

}
