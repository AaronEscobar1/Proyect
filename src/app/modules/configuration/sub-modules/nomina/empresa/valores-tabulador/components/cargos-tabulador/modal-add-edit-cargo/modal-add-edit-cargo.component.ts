import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';
import { Grados } from '../../../interfaces/grados-tabuladores.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CargoTabulador } from '../../../interfaces/cargos-tabulador.interfaces';
import { CargosTabuladorService } from '../../../services/cargos-tabulador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { addIdEmpresaToObject, mapJsonCargo, validarCampos, objectEmptyEdit } from './validaciones-cargos';

@Component({
  selector: 'app-modal-add-edit-cargo',
  templateUrl: './modal-add-edit-cargo.component.html'
})
export class ModalAddEditCargoComponent implements OnInit {

  // Objeto para obtener el id para registrar la distribucion de nomina a la empresa asociada
  @Input() empresaRow!: Company;

  // Objeto de grados por tabulador
  @Input() grados: Grados[] = [];
  
  // Objeto para validaciones de valores duplicados 
  @Input() cargosTabulador: CargoTabulador[] = [];

  // Variable de seleccion para editar
  @Input() cargoTabuladorSelect!: CargoTabulador | undefined;

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
              private cargosTabuladorService: CargosTabuladorService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa:  [ ],
      id:         [ , [ Validators.required, Validators.maxLength(10), this.validatedId.bind(this) ]],
      tabu01: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu02: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu03: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu04: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu05: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu06: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu07: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu08: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu09: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu10: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu11: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      tabu12: this.fb.group({
        eoGradoTbId: this.fb.group({
          idEmpresa:  [ ],
          id:         [ ]
        })
      }),
      mest01:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest02:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest03:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest04:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest05:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest06:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest07:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest08:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest09:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest10:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest11:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      mest12:     [  , [ Validators.pattern('[0-9]{1,4}') ]],
      
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if ( !this.isEdit ) {
      this.form.reset();
      this.form.controls['id'].enable();
      return;
    }
    // Deshabilitamos los campos
    this.form.controls['id'].disable();
    // Colocar idEmpresa en el atributo idEmpresa
    if (this.cargoTabuladorSelect && this.cargoTabuladorSelect.nmCargoTabuladorTbId.idEmpresa ) {
      this.cargoTabuladorSelect.idEmpresa = this.cargoTabuladorSelect.nmCargoTabuladorTbId.idEmpresa;
    }
    // Colocar id grado en el atributo id
    if (this.cargoTabuladorSelect && this.cargoTabuladorSelect.nmCargoTabuladorTbId.id ) {
      this.cargoTabuladorSelect.id = this.cargoTabuladorSelect.nmCargoTabuladorTbId.id;
    }
    // Agregamos objetos vacios para omitir error 'Cannot read properties of null'
    if ( this.cargoTabuladorSelect ) {
      this.cargoTabuladorSelect = objectEmptyEdit(this.cargoTabuladorSelect);
    }
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.cargoTabuladorSelect);
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
    let data: CargoTabulador = this.form.getRawValue();

    // Transforma en null si la propiedad id del objeto es null
    data = mapJsonCargo(data);
    // Validar que se seleccione tabulador y mes
    for ( let index = 1; index <= 12; index++ ) {
      if ( validarCampos(data, index) ) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Si seleccionó un tabulador es obligatorio rellenar el mes o viceversa.', life: 3000});
        return;
      }
    }
    // Agregar el idEmpresa al objeto eoGradoTbId.idEmpresa
    data = addIdEmpresaToObject(data, this.empresaRow.id);

    this.spinner.show();
    
    // Editar
    if (this.isEdit) {
      const { id, idEmpresa, nmCargoTabuladorTbId, ...dataUpdate } = data;
      this.cargosTabuladorService.update(data, dataUpdate)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.companyNominaService.selectRowThirdTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          if ( err.error.detail.includes('Error en los datos de entrada.') ) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pueden repetir los tabuladores y los meses.', life: 3000});
            this.spinner.hide();
            return false;
          }
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el cargo por tabulador.', life: 3000});
          this.spinner.hide();
          return false;
        }
      });
      return;
    }
    
    // Colocar idEmpresa al objeto
    data.idEmpresa = this.empresaRow.id;
    // Crear
    this.cargosTabuladorService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.companyNominaService.selectRowThirdTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          if ( err.error.detail.includes('Error en los datos de entrada.') ) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pueden repetir los tabuladores y los meses.', life: 3000});
            this.spinner.hide();
           return false;
          }
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el cargo por tabulador.', life: 3000});
          this.spinner.hide();
          return false;
        }
      });
  }

  closeModal(): void {
    this.onCloseModal.emit();
    this.form.reset();
    // Limpiar variable grados
    this.grados = this.grados.map(grados => {
      delete grados.disabledGrado;
      return grados;
    })
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

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.cargosTabulador.findIndex(val => val.nmCargoTabuladorTbId.id === control.value) > -1 ?
                                          {'duplicated': true} :
                                          null;
  }

}
