import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DistribucionNominaService } from '../../services/distribucion-nomina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { DistribucionNomina } from '../../interfaces/distribucion-impuesto.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id para registrar la distribucion de nomina a la empresa asociada
  @Input() empresaRow!: Company;

  // Objeto para validaciones de valores duplicados 
  @Input() distribucionesNomina: DistribucionNomina[] = [];

  // Variable de seleccion para editar
  @Input() distribucionNominaSelect!: DistribucionNomina | undefined;

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
              private distribucionNominaService: DistribucionNominaService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      codsuc: [  , [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      dessuc: [  , [ Validators.required, Validators.maxLength(30) ]],
      codubi: [  , [ Validators.maxLength(6) ]],
      codctb: [  ]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['codsuc'].enable();
      return;
    }
    this.form.controls['codsuc'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.distribucionNominaSelect);
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
    let data: DistribucionNomina = this.form.getRawValue();
    
    this.spinner.show();
    
    if (this.isEdit) {
      // Editar
      this.distribucionNominaService.update(this.empresaRow.id, data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la distribución nómina.', life: 3000});
        }
      });
      return;
    }

    // Crear
    this.distribucionNominaService.create(this.empresaRow.id, data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la distribución nómina.', life: 3000});
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
  get codsucMsgError(): string {
    const errors = this.form.get('codsuc')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 4 dígitos y formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores nombre
  get dessucMsgError(): string {
    const errors = this.form.get('dessuc')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos y formato alfanumérico.';
    }
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.distribucionesNomina.findIndex(val => val.codsuc === control.value) > -1 ?
                                              {'duplicated': true} :
                                              null;
  }

}
