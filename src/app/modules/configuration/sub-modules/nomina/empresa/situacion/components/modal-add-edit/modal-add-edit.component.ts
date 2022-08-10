import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TipoNomina } from '../../../shared-empresa/interfaces/nominas.interfaces';
import { ClaseSituaciones, EsquemaTrabajo, EstatusVacacion, Situacion } from '../../interfaces/situacion.interfaces';
import { SituacionService } from '../../services/situacion.service';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto para validaciones de valores duplicados 
  @Input() situaciones: Situacion[] = [];

  // Variable de seleccion para editar
  @Input() situacionSelect!: Situacion | undefined;
  
  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit      : boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  // Variable para obtener el form group de estatus vacación y a su vez validar si el campo de los controles tiene errores
  get nmVacacionFormGroup(): FormGroup {
    return this.form.controls['nmVacacionStatusTb'] as FormGroup;
  }

  // Objeto de estatus vacaciones
  @Input() estatusVacaciones: EstatusVacacion[] = [];  

  // Objeto de esquemas de trabajo
  @Input() esquemasTrabajo: EsquemaTrabajo[] = [];  

  // Objeto de clases situaciones
  @Input() claseSituaciones: ClaseSituaciones[] = [];

  constructor(private companyNominaService: CompanyNominaService,
              private situacionService: SituacionService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      /**
       * Formulario sin grupo rotacion
       */
      idEmpresa: [  ],
      idNomina:  [  ],
      // Código de la situación
      codsta:    [  , [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this)  ] ],
      // Descripcion de la situación
      dessta:    [  , [ Validators.required, Validators.maxLength(30) ] ],
      // Estatus es de Vacación
      nmVacacionStatusTb: this.fb.group({
        vacsta:  [  , [ Validators.required ] ]
      }),
      // Considerar el esquema de trabajo
      nmTipoEsquTrabCalcVacaTb : this.fb.group({
        conesq:  [  ]
      }),
      // Clasificacion de la situación
      cfClaseSituacionTb: this.fb.group({
        clasta:  [  ]
      }),
      /**
       * Formulario con grupo rotacion
       */
      // Código del Grupo de Trabajo
      idGrupo:    [  , [ Validators.maxLength(2) ] ],            
      // Consecutivo del Grupo
      idRotacion: [  , [ Validators.pattern('[0-9]{1,2}') ] ],
      // Grupo Rotacion
      nmGrupoRotacionTb: this.fb.group({
        idEmpresa: [  ],
        idNomina:  [  ],
        idGrupo:   [  ],
        congru:    [  ]
      })
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      const formInit = { nmVacacionStatusTb: { vacsta: '0' } }
      this.form.reset(formInit);
      this.form.controls['codsta'].enable();
      return;
    }
    // Deshabilitamos los campos que no se pueden editar
    this.form.controls['codsta'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.situacionSelect);
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
   save(): void {
    // return;
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    let data: Situacion = this.form.getRawValue();
    // Colocar código en mayúscula
    data.codsta = data.codsta.toUpperCase();
    // Validamos que si selecciono 3 o 4 en el campo Vacación es obligatorio rellenar Grupo y consecutivo. 
    if ( (data.nmVacacionStatusTb.vacsta == '3' || data.nmVacacionStatusTb.vacsta == '4') && (!data.idGrupo || !data.idRotacion) ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Si seleccionó rotación situación o rotación vacación es obligatorio rellenar Grupo y consecutivo.', life: 3000});
      return;
    }

    // this.spinner.show();

    if(this.isEdit) {
      // Editar
      // TODO: QUITAR RETURN
      return;
      this.situacionService.update(data, data)
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
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la situación.', life: 3000});
          } 
        });
      return;
    }
    
    // Crear
    // Asignar el id empresa al centro de trabajo para crear
    data.idEmpresa = this.empresaRow ? this.empresaRow.id: '';
    data.idNomina = this.nominaRow ? this.nominaRow.tipnom: '';
    console.log(data);
    // TODO: QUITAR RETURN
    return;
    this.situacionService.create(data)
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la situación.', life: 3000});
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
  get codstaMsgError(): string {
    const errors = this.form.get('codsta')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máxima de 4 dígitos, formato alfanumérico.';
    } else if ( errors?.duplicated ) {
      return 'El código ya existe.';
    }
    return '';
  }

  // Mensajes de errores id
  get desstaMsgError(): string {
    const errors = this.form.get('dessta')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos, formato alfanumérico.';
    }
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.situaciones.findIndex(val => val.codsta.trim().toUpperCase() === control.value.trim().toUpperCase()) > -1 ?
                                        {'duplicated': true} :
                                        null;
  }


}
