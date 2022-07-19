import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PreguntaEntrevista, TipoPregunta } from '../../../interfaces/pregunta.interfaces';
import { Entrevista } from '../../../interfaces/entrevista.interfaces';
import { PreguntaService } from '../../../services/pregunta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-modal-add-edit-pregunta',
  templateUrl: './modal-add-edit-pregunta.component.html'
})
export class ModalAddEditPreguntaComponent implements OnInit {

  // Objeto para validaciones de valores duplicados
  @Input() preguntas!: PreguntaEntrevista[];

  // Variable para editar si se selecciona de la tabla
  @Input() preguntaSelect!: PreguntaEntrevista | undefined;
  
  // Objeto para llenar los tipos de preguntas
  @Input() tiposPreguntas: TipoPregunta[] = [];
  
  // Objeto competencia para obtener el ID
  @Input() entrevistaRow!: Entrevista | undefined;
  
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
  idEntrevistaLocal!: number;

  constructor(private preguntaService: PreguntaService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      id     : [  , [ Validators.required, Validators.pattern('[0-9]{1,10}$'), this.validatedId.bind(this) ]],
      titulo : [  , [ Validators.required, Validators.maxLength(350) ]],
      cerrada: [  , [ Validators.required, Validators.maxLength(1) ]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (!this.isEdit) {
      // Obtener el ID de la entrevista seleccionada
      if ( this.entrevistaRow && this.entrevistaRow.id ) {
        this.idEntrevistaLocal = this.entrevistaRow.id;
      }
      this.form.controls['id'].enable();
      this.form.reset();
      return;
    };
    // Obtener el Id de la entrevista ya registrada para volver a editar correctamente
    if ( this.preguntaSelect && this.preguntaSelect.idEntrevista ) {
      this.idEntrevistaLocal = this.preguntaSelect.idEntrevista;
    }
    this.form.controls['id'].disable();
    this.form.reset(this.preguntaSelect);
  }

  /**
   * Guardar y Actualizar registros
   */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: PreguntaEntrevista = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.titulo.trim();

    // Editar
    if (this.isEdit) {
      // Asignar id entrevista a la pregunta para editar
      data.idEntrevista = this.idEntrevistaLocal;
      
      this.spinner.show();

      this.preguntaService.update(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la pregunta.', life: 3000});
        }
      });
      return;
    }

    // Crear
    // Asignar id entrevista a la pregunta para crear
    data.idEntrevista = this.idEntrevistaLocal;

    this.spinner.show();

    this.preguntaService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la pregunta.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
    this.selectRowService.selectRowAlterno$.emit(null);
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
    } else if ( errors?.pattern ) {
      return 'El código es de longitud máxima de 10 dígitos y de formato númerico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get tituloMsgError(): string {
    const errors = this.form.get('titulo')?.errors;
    if ( errors?.required ) {
      return 'El nombre es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El nombre es de longitud máxima de 350 dígitos y de formato alfanumérico.';
    } 
    return '';
  }

  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.preguntas.findIndex(val => val.id === control.value) > -1 ?
                                              {'duplicated': true} :
                                              null;
  }

}
