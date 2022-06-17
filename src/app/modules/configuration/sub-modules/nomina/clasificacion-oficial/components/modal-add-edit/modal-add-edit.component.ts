import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { OfficialClassification } from '../../interfaces/clasificacion-oficial.interfaces';
import { ClasificacionOficialService } from '../../services/clasificacion-oficial.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() officialClassification!: OfficialClassification[];
  @Input() officialClassificationSelect!: OfficialClassification | undefined;

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

  constructor(private clasificacionOficialService: ClasificacionOficialService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
        this.form = this.fb.group({
          codofi: ['', [ Validators.required, Validators.maxLength(2), this.validatedId.bind(this) ]],
          desofi: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this) ]],
          tiprep: ['', [ Validators.required, Validators.maxLength(2) ]]
        });
  }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.controls['codofi'].enable();
      return;
    }
    this.form.controls['codofi'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.officialClassificationSelect);
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
    let data: OfficialClassification = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.desofi.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.clasificacionOficialService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.onLoadData.emit();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la forma de pago.', life: 3000});
          }
        });
      return;
    } 

    this.clasificacionOficialService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la forma de pago.', life: 3000});
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
   campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
              && this.form.invalid;
  }
  
  // Mensajes de errores dinamicos
  get codofiMsgError(): string {
    const errors = this.form.get('codofi')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máximo de 2 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }
  
  // Mensajes de errores dinamicos
  get desofiMsgError(): string {
    const errors = this.form.get('desofi')?.errors;
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
      const duplicated = this.officialClassification.findIndex(val => val.codofi === control.value);
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
    // Validaciones para crear
    if (!this.isEdit) {
      if( !control.value ) { return null; }
      const duplicated = this.officialClassification.findIndex(val => val.desofi.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
      
    } 
    // Validaciones para editar 
    if ( this.form.getRawValue().desofi == null ) { return null; }
    const duplicatedEdit = this.officialClassification.findIndex(
      val => val.desofi.trim().toLowerCase() === this.form.getRawValue().desofi.trim().toLowerCase() 
                && val.codofi !== this.form.getRawValue().codofi
    );
    if (duplicatedEdit > -1) {
      console.log("Correcto");
      
      return {'duplicated': true};
    }
    return null;
  }
}
