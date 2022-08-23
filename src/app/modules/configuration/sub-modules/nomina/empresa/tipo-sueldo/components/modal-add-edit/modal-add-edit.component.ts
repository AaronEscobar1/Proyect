import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoSueldo } from '../../interfaces/tipo-sueldo.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { TipoSueldoService } from '../../services/tipo-sueldo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styles: [`
    :host ::ng-deep .p-checkbox .p-checkbox-box.p-highlight {
      background: #62C3B9 !important;
      border-color: #62C3B9 !important;
    }
  `]
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados 
  @Input() tipoSueldos: TipoSueldo[] = [];

  // Variable de seleccion para editar
  @Input() tipoSueldoSelect!: TipoSueldo | undefined;

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
              private tipoSueldoService: TipoSueldoService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa: [ ],
      id:        ['', [ Validators.required, Validators.pattern('[1-6]{1,1}'), this.validatedId.bind(this) ]],
      nombre:    ['', [ Validators.required, Validators.maxLength(64) ]],
      sueldoUno: [ ]
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
    this.form.reset(this.tipoSueldoSelect);
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
    let data: TipoSueldo = this.form.getRawValue();

    this.spinner.show();

    if (this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { id, idEmpresa, ...dataUpdate} = data;
      this.tipoSueldoService.update(data, dataUpdate)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el tipo de sueldo.', life: 3000});
        }
      });
      return;
    }
    
    // Crear
    // Asignar el id empresa al centro de trabajo para crear
    data.idEmpresa = this.empresaRow.id;
    this.tipoSueldoService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el tipo de sueldo.', life: 3000});
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
    else if ( errors?.pattern )
      return 'El código es de formato numérico y solo permite valores del 1 al 6.';
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
      return 'La descripción es de longitud máxima de 64 dígitos, formato alfanumérico.';
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.tipoSueldos.findIndex(val => val.id === control.value) > -1 ?
                                      {'duplicated': true} :
                                      null;
  }

}
