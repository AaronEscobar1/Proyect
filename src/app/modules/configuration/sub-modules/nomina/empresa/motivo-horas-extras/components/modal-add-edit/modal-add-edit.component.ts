import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { MotivoHoraExtra } from '../../interfaces/motivo-horas-extras.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { MotivoHorasExtrasService } from '../../services/motivo-horas-extras.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados 
  @Input() motivoHorasExtras: MotivoHoraExtra[] = [];

  // Variable de seleccion para editar
  @Input() motivoHoraExtraSelect!: MotivoHoraExtra | undefined;

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

  constructor(private companyNominaService: CompanyNominaService, 
              private motivoHorasExtrasService: MotivoHorasExtrasService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa: [ ],
      id:        ['', [ Validators.required, Validators.maxLength(10), this.validatedId.bind(this) ]],
      nombre:    ['', [ Validators.required, Validators.maxLength(1204) ]]
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
    this.form.controls['id'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.motivoHoraExtraSelect);
  }
  
  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
   save(): void {
    if ( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: MotivoHoraExtra = this.form.getRawValue();

    this.spinner.show();

    if (this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { id, idEmpresa, ...dataUpdate} = data;
      this.motivoHorasExtrasService.update(data, dataUpdate)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.companyNominaService.selectRowThirdTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el motivo hora extra.', life: 3000});
        }
      });
      return;
    }
    
    // Crear
    // Asignar el id empresa al centro de trabajo para crear
    data.idEmpresa = this.empresaRow.id;
    this.motivoHorasExtrasService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.companyNominaService.selectRowThirdTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el motivo hora extra.', life: 3000});
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
  get idMsgError(): string {
    const errors = this.form.get('id')?.errors;
    if ( errors?.required )
      return 'El código es obligatorio.';
    else if ( errors?.maxlength )
      return 'El código es de longitud máxima de 10 dígitos, formato alfanumérico.';
    else if ( errors?.duplicated )
      return 'El código esta registrado.';
    return '';
  }

  // Mensajes de errores dinamicos
  get nombreMsgError(): string {
    const errors = this.form.get('nombre')?.errors;
    if ( errors?.required ) 
      return 'La descripción es obligatoria.';
    else if ( errors?.maxlength ) 
      return 'La descripción es de longitud máxima de 1204 dígitos, formato alfanumérico.';
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.motivoHorasExtras.findIndex(val => val.id === control.value) > -1 ?
                                      {'duplicated': true} :
                                      null;
  }

}
