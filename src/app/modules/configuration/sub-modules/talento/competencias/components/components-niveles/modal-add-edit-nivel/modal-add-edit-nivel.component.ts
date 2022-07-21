import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Niveles } from '../../../interfaces/nivel.interfaces';
import { NivelService } from '../../../services/nivel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Competencias } from '../../../interfaces/competencias.interfaces';

@Component({
  selector: 'app-modal-add-edit-nivel',
  templateUrl: './modal-add-edit-nivel.component.html'
})
export class ModalAddEditNivelComponent implements OnInit {

  // Objeto para validaciones de valores duplicados
  @Input() niveles!    : Niveles[];

  // Variable para editar si se selecciona de la tabla
  @Input() nivelSelect!: Niveles | undefined;

  // Objeto competencia para obtener el ID
  @Input() competenciaRow!: Competencias | undefined;
  
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

  // Variable para registrar el nivel a la competencia correcta mediante el ID
  idCompetenciaLocal! : number;
  maxLengthDescrip    : number = 1000;

  constructor(private nivelService: NivelService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private selectRowService: SelectRowService) {
    this.form = this.fb.group({
      id:       [  , [ Validators.required, Validators.pattern('[0-9]{1,4}$'), this.validatedId.bind(this) ]],
      nivel:    [  , [ Validators.required, Validators.maxLength(15) ]],
      descrip:  [  , [ Validators.required, Validators.maxLength(1000) ]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (!this.isEdit) {
      // Obtener el ID de la competencia seleccionada
      if ( this.competenciaRow && this.competenciaRow.id ) {
        this.idCompetenciaLocal = this.competenciaRow.id;
      }
      this.form.controls['id'].enable();
      this.form.reset();
      return;
    };
    // Obtener el Id de la competencia ya registrada para volver a editar correctamente
    if ( this.nivelSelect && this.nivelSelect.id_competencia ) {
      this.idCompetenciaLocal = this.nivelSelect.id_competencia;
    }
    this.form.controls['id'].disable();
    this.form.reset(this.nivelSelect);
  }

  /**
   * Guardar y Actualizar registros
   */
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: Niveles = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.nivel.trim();
    
    // Editar
    if (this.isEdit) {
      // Asignarle el id competencia al nivel para editar
      data.id_competencia = this.idCompetenciaLocal;
      
      this.spinner.show();

      this.nivelService.update(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.selectRowService.selectRowAlterno$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el nivel.', life: 3000});
        }
      });
      return;
    }

    // Crear
    // Asignarle el id competencia al nivel para crear
    data.id_competencia = this.idCompetenciaLocal;

    this.spinner.show();

    this.nivelService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.selectRowService.selectRowAlterno$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo creado el nivel.', life: 3000});
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
      return 'El código es de longitud máxima de 4 dígitos y de formato númerico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get nivelMsgError(): string {
    const errors = this.form.get('nivel')?.errors;
    if ( errors?.required ) {
      return 'El nivel es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El nivel es de longitud máxima de 15 dígitos y de formato alfanumérico.';
    }
    return '';
  }

  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.niveles.findIndex(val => val.id === control.value) > -1 ?
                                          {'duplicated': true} :
                                          null;
  }
  
}
