import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TipoNomina } from '../../../../shared-empresa/interfaces/nominas.interfaces';
import { ClaseSituaciones, EsquemaTrabajo, EstatusVacacion, Situacion, SituacionUpdate } from '../../../interfaces/situacion.interfaces';
import { SituacionService } from '../../../services/situacion.service';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { GrupoRotacion } from '../../../../shared-empresa/interfaces/grupo-rotacion.interfaces';
import { ObjectEventChange } from 'src/app/shared/interfaces/country-entity.interfaces';

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

  // Variable para obtener el form group de Considerar el esquema de trabajo y a su vez validar si el campo de los controles tiene errores
  get nmTipoEsquTrabFormGroup(): FormGroup {
    return this.form.controls['nmTipoEsquTrabCalcVacaTb'] as FormGroup;
  }

  // Variable para obtener el form group de Clasificacion de la situación y a su vez validar si el campo de los controles tiene errores
  get cfClaseSituacionFormGroup(): FormGroup {
    return this.form.controls['cfClaseSituacionTb'] as FormGroup;
  }

  // Grupos rotación por empresa y nomina
  @Input() rotacionGrupos: GrupoRotacion[] = [];

  // Objeto de consecutivos para mostrar en la lista del formulario
  consecutivos: GrupoRotacion[] = [];

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
        conesq:  [   , [ Validators.required] ]
      }),
      // Clasificacion de la situación
      cfClaseSituacionTb: this.fb.group({
        clasta:  [   , [ Validators.required] ]
      }),
      /**
       * Formulario con grupo rotacion
       */
      // Código del Grupo de Trabajo
      idGrupo:    [  , [ Validators.maxLength(2) ] ],            
      // Consecutivo del Grupo
      idRotacion: [  , [ Validators.pattern('[0-9]{1,2}') ] ]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      const formInit = { nmVacacionStatusTb: { vacsta: '0' }, nmTipoEsquTrabCalcVacaTb: { conesq: '0' }, cfClaseSituacionTb: { clasta: '0' } };
      this.form.reset(formInit);
      this.form.controls['codsta'].enable();
      this.form.controls['idRotacion'].disable();
      return;
    }
    // Deshabilitamos los campos que no se pueden editar
    this.form.controls['codsta'].disable();
    // Cargar grupos y consecutivos si existen
    if ( this.situacionSelect && this.situacionSelect.idGrupo ) {
      this.loadRotacionGrupos(this.situacionSelect.idGrupo);
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.situacionSelect);
  }

  /**
   * Realiza petición al backend para buscar los consecutivos relacionadas con el grupo rotación
   * @param event: ObjectEventChange
   */
  rotacionGrupoSelectChange(event: ObjectEventChange): void {
    const idGrupo = event.value;
    if (idGrupo == null) { return; }
    // Limpiamos el campo consecutivo
    this.form.controls['idRotacion'];
    // Peticion al backend para buscar los consecutivos
    this.loadRotacionGrupos(idGrupo);
  }

  /**
   * Carga los consecutivos relacionadas con el grupo rotación
   * @param idGrupo: string código del grupo
   */
  loadRotacionGrupos(idGrupo: string): void {
    this.consecutivos = [];
    this.spinner.show();
    this.companyNominaService.getAllRotacionGruposByEmpresaNominaRotacionGrupo(this.empresaRow.id, this.nominaRow.tipnom, idGrupo)
      .subscribe({
        next: (resp: GrupoRotacion[]) => {
          // Transformar el atributo congru que viene number a string para poder mostrar en la lista cuando se vaya a editar
          this.consecutivos = resp.map(data => {
            data.congru = data.congru.toString()
            return data;
          })
          this.form.controls['idRotacion'].enable();
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Limpiar data de consecutivos
   */
  clearRotacionGrupoSelect() {
    this.form.controls['idRotacion'].reset();
    this.consecutivos = [];
    this.form.controls['idRotacion'].disable();
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
   save(): void {
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

    // Validar grupo y consecutivos posean datos
    if ( data.idGrupo && !data.idRotacion ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar tanto el grupo como el consecutivo.', life: 3000});
      return;
    }

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      const dataUpdate = this.structureJsonUpdate(data);
      this.situacionService.update(data, dataUpdate)
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
    // Asignar el idEmpresa e idNomina para crear situación
    data.idEmpresa = this.empresaRow.id;
    data.idNomina = this.nominaRow.tipnom;
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

  /**
   * Armar objeto para actualizar situación
   * @param data: Situacion, data original que viene desde el formulario
   * @returns SituacionUpdate, data para actualizar
   */
  structureJsonUpdate(data: Situacion): SituacionUpdate {
    let dataUpdate: SituacionUpdate = { 
      dessta: data.dessta, 
      idGrupo: data.idGrupo,
      idRotacion: data.idRotacion,
      // Status es de Vacacion
      nmVacacionStatusTb: { 
        vacsta: data.nmVacacionStatusTb.vacsta 
      },
      // Considerar el esquema de trabajo
      nmTipoEsquTrabCalcVacaTb: { 
        conesq: data.nmTipoEsquTrabCalcVacaTb.conesq 
      },
      // Clasificacion de la situacion
      cfClaseSituacionTb: { 
        clasta: data.cfClaseSituacionTb.clasta
      }
    };
    // Si existe data en grupo y rotación se arma un objeto nuevo
    if ( data.idGrupo || data.idRotacion ) {
      const nmGrupoRotacionTb = { 
        idEmpresa: data.idEmpresa,
        idNomina:  data.idNomina,
        idGrupo:   data.idGrupo,
        congru:    data.idRotacion
      }
      // Agregar el nuevo objeto 'nmGrupoRotacionTb' al objeto original 
      dataUpdate = { ...dataUpdate, nmGrupoRotacionTb };
    }
    return dataUpdate;
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
