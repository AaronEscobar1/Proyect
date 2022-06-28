import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { ValoresOficialesService } from '../../services/valores-oficiales.service';
import { Countrys, ValorOficial } from '../../interfaces/valor-oficial.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
})
export class ModalAddEditComponent implements OnInit {

  // Objetos Input()
  @Input() valoresOficiales: ValorOficial[] = [];
  @Input() countrys: Countrys[] = [];
  @Input() valoresSelect!: ValorOficial | undefined;

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

  constructor(private valoresOficialesService: ValoresOficialesService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
      this.form = this.fb.group({
          id: ['', [ Validators.required ]],
          paisId: ['', [ Validators.required ]],
          fecefe: ['', [ Validators.required ]],
          valor: ['', [ Validators.required, Validators.maxLength(10) ]],
      });
  }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.controls['id'].enable();
      return;
    }
    this.form.controls['id'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.valoresSelect);
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
    let data: ValorOficial = this.form.getRawValue();
    // console.log(data);
    
    // Eliminar espacios en blanco en su atributo
    data.paisId.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.valoresOficialesService.update(data)
        .subscribe({
          next: (resp) => {
            this.closeModal();
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.onLoadData.emit();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar Valor Oficial.', life: 3000});
          } 
        });
      return;
    }

    this.valoresOficialesService.create(data)
      .subscribe({
        next: resp => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear Valor Oficial.', life: 3000});
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
  get idvloMsgError(): string {
    const errors = this.form.get('id')?.errors;
    if ( errors?.required ) {
      return 'El Id es obligatorio.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get tipevloMsgError(): string {
    const errors = this.form.get('paisId')?.errors;
    if ( errors?.required ) {
      return 'El País es obligatorio.';
    }
    return '';
  }
 
  // Mensajes de errores dinamicos
  get datevloMsgError(): string {
    const errors = this.form.get('fecefe')?.errors;
    if ( errors?.required ) {
      return 'La fecha es obligatoria.';
    }
    return '';
  }
  
  // Mensajes de errores dinamicos
  get valorMsgError(): string {
    const errors = this.form.get('valor')?.errors;
    if ( errors?.required ) {
      return 'El valor es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El valor es de longitud máxima de 10 dígitos.';
    }
    return '';
  }
}
