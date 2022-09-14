import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoInformacion, TipoInformacionCreate } from '../../../interfaces/tipo-informacion.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TipoInformacionService } from '../../../services/tipo-informacion.service';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ClaseInformacion } from '../../../interfaces/clase-informacion.interfaces';

@Component({
  selector: 'app-modal-add-edit-tipo',
  templateUrl: './modal-add-edit-tipo.component.html'
})
export class ModalAddEditTipoComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto para obtener el id de la clase de informacion 
  @Input() claseInformacionSelect!: ClaseInformacion | undefined;

  // Objeto para validaciones de valores duplicados
  @Input() tiposInformaciones: TipoInformacion[] = [];
  
  // Objeto tipo de información seleccionado de la tabla
  @Input() tipoInformacionSelect: TipoInformacion | undefined;

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
              private tipoInformacionService: TipoInformacionService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idClase:     [  ],
      id:          [  , [ Validators.required, Validators.maxLength(10), this.validatedId.bind(this) ] ],
      nombre:      [  , [ Validators.required, Validators.maxLength(120) ]],
      fecEfectiva: [  , [ Validators.required ]],
      fechaIni:    [  ],
      fechaFin:    [  ],
      nmInformacionClaseTb: this.fb.group({
        nmInformacionClaseTbId: this.fb.group({
          idEmpresa:  [  ],
          id:         [  ]
        })
      })
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
    // Comprobar si el tipo de informacion tiene fecha para darle formato y establecerlo en el formulario
    if ( this.tipoInformacionSelect ) {
      this.tipoInformacionSelect.fecEfectiva = this.tipoInformacionSelect.fecEfectiva ? new Date(this.tipoInformacionSelect.fecEfectiva) : null;
      this.tipoInformacionSelect.fechaIni    = this.tipoInformacionSelect.fechaIni    ? new Date(this.tipoInformacionSelect.fechaIni)    : null;
      this.tipoInformacionSelect.fechaFin    = this.tipoInformacionSelect.fechaFin    ? new Date(this.tipoInformacionSelect.fechaFin)    : null;
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.tipoInformacionSelect);
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
    let data: TipoInformacion = this.form.getRawValue();

    // Validar que exista la clase de informacion para crear correctamente
    if ( !this.claseInformacionSelect ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No ha seleccionado una clase de información', life: 3000});
      return;
    }
    // Validar que si se selecciona una fecha se seleccione las dos fechas
    if ( data.fechaIni && !data.fechaFin || data.fechaFin && !data.fechaIni ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar tanto fecha inicio como fecha fin.', life: 3000});
      return;
    }
    // Validar que la fecha inicio sea menor que fecha fin
    if ( data.fechaIni && data.fechaFin ) {
      if ( data.fechaIni > data.fechaFin ) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'La fecha inicio no puede ser mayor que fecha fin.', life: 3000});
        return;
      }
    }

    this.spinner.show();

    // Editar
    if (this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idEmpresa, idClase,  id,...dataUpdate } = data;
      this.tipoInformacionService.update(this.empresaRow.id, data, dataUpdate)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el tipo de información.', life: 3000});
        }
      });
      return;
    }

    // Llenar información solicitada por backend con el objeto personalizado
    data.idClase = this.claseInformacionSelect.nmInformacionClaseTbId.id;
    data.nmInformacionClaseTb.nmInformacionClaseTbId.id = this.claseInformacionSelect.nmInformacionClaseTbId.id;
    data.nmInformacionClaseTb.nmInformacionClaseTbId.idEmpresa = this.empresaRow.id;
    // Crear
    this.tipoInformacionService.create(this.empresaRow.id, data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el tipo de información.', life: 3000});
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
      return 'El código es de longitud máxima de 10 dígitos, formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores nombre
  get nombreMsgError(): string {
    const errors = this.form.get('nombre')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 120 dígitos, formato alfanumérico.';
    }
    return '';
  }


  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.tiposInformaciones.findIndex(val => val.id === control.value) > -1 ?
                                            {'duplicated': true} :
                                            null;
  }

}
