import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';
import { GradosTabuladorService } from '../../../services/grados-tabulador.service';
import { Grados, GradoCreate } from '../../../interfaces/grados-tabuladores.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id para registrar la distribucion de nomina a la empresa asociada
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados 
  @Input() gradosTabulador: Grados[] = [];

  // Variable de seleccion para editar
  @Input() gradoTabuladorSelect!: Grados | undefined;

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

  constructor(private gradosTabuladorService: GradosTabuladorService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa:  [ ],
      id:         [  , [ Validators.required, Validators.maxLength(6), this.validatedId.bind(this) ]],
      descrip:    [  , [ Validators.required, Validators.maxLength(40) ]],
      codOficial: [  , [ Validators.maxLength(6), ]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['id'].enable();
      return;
    }
    // Deshabilitamos los campos
    this.form.controls['id'].disable();
    // Colocar el id del grado en el atributo id
    if (this.gradoTabuladorSelect && this.gradoTabuladorSelect.eoGradoTbId ) {
      this.gradoTabuladorSelect.id        = this.gradoTabuladorSelect.eoGradoTbId.id;
      this.gradoTabuladorSelect.idEmpresa = this.gradoTabuladorSelect.eoGradoTbId.idEmpresa;
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.gradoTabuladorSelect);
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
    let data: GradoCreate = this.form.getRawValue();
    
    this.spinner.show();
    
    // Editar
    if (this.isEdit) {
      const { id, idEmpresa, ...dataUpdate } = data;
      this.gradosTabuladorService.update(data, dataUpdate)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.gradosTabuladorService.selectRowGrado$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el grado tabulador.', life: 3000});
        }
      });
      return;
    }
    
    data.idEmpresa = this.empresaRow.id;
    // Crear
    this.gradosTabuladorService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.gradosTabuladorService.selectRowGrado$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el grado tabulador.', life: 3000});
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
  
   // Mensajes de errores id
   get idMsgError(): string {
    const errors = this.form.get('id')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 6 dígitos, formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }
  
  // Mensajes de errores descrip
  get dessucMsgError(): string {
    const errors = this.form.get('descrip')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 40 dígitos, formato alfanumérico.';
    }
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.gradosTabulador.findIndex(val => val.eoGradoTbId.id === control.value) > -1 ?
                                          {'duplicated': true} :
                                          null;
  }

}
