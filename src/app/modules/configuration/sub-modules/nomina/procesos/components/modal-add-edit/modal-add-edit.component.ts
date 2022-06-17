import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Procesos } from '../../interfaces/procesos.interfaces';
import { ProcesosService } from '../../services/procesos.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() procesos!: Procesos[];
  @Input() procesoSelect!: Procesos | undefined;

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

  constructor(private procesosService: ProcesosService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
      this.form = this.fb.group({
          tippro: ['', [ Validators.required, Validators.pattern('[0-9]{1,2}'), this.validatedId.bind(this) ]],
          nompro: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this)]],
          nomadi: [''],
          nodefi: [ false ],
          // codsec:  ['', [ Validators.required, Validators.maxLength(1) ]],
          // dessec:  ['', [ Validators.required, Validators.maxLength(30) ]],
      });
  }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.controls['tippro'].enable();
      return;
    }
    this.form.controls['tippro'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.procesoSelect);
    this.form.getRawValue().nodefi === "1" ? this.form.controls['nodefi'].reset(true) : this.form.controls['nodefi'].reset(false);
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
    let data: Procesos = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.nompro.trim();
    data.nodefi = data.nodefi ? "1" : "0";

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.procesosService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.onLoadData.emit();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el proceso.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.procesosService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el proceso.', life: 3000});
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
  get tipproMsgError(): string {
    const errors = this.form.get('tippro')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.pattern ) {
      return 'El código es de longitud máximo de 2 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }
  
  // Mensajes de errores dinamicos
  get nomproMsgError(): string {
    const errors = this.form.get('nompro')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  // get nomadiMsgError(): string {
    // const errors = this.form.get('desadic')?.errors;
    // if ( errors?.required ) {
      // return 'La descripción adicional es obligatoria.';
    // } else if ( errors?.maxlength ) {
      // return 'La descripción adicional es de longitud máxima de 30 dígitos.';
    // } else if ( errors?.duplicated ) {
      // return 'La descripción adicional ya existe.';
    // }
    // return '';
  // }

  /**
   * Validar id duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
      const duplicated = this.procesos.findIndex(proc => proc.tippro === control.value);
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
      const duplicatedEdit = this.procesos.findIndex(
        proc => proc.nompro.trim().toLowerCase() === this.form.getRawValue().nompro.trim().toLowerCase() 
                  && proc.tippro !== this.form.getRawValue().tippro
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.procesos.findIndex(proc => proc.nompro.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }
}
