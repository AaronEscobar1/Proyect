import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EquivalenciaTipoCuenta } from '../../../interfaces/equivalencias.interfaces';
import { Institucion } from '../../../../instituciones/interfaces/instituciones.interfaces';
import { CompanyNominaService } from '../../../../../empresa/shared-empresa/services/company-nomina.service';
import { EquivalenciasService } from '../../../services/equivalencias.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { TipoCuentaService } from '../../../../tipo-cuenta/services/tipo-cuenta.service';
import { TipoCuenta } from '../../../../tipo-cuenta/interaces/tipo-cuenta.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Institucion seleccionada desde la tabla 
  @Input() institucionSelect: Institucion | undefined;

  // Objeto equivalencias tipos de cuentas
  @Input() equivalenciasCuentas: EquivalenciaTipoCuenta[] = [];

  // Objeto equivalencias seleccionado de la tabla
  @Input() equivalenciaCuentaSelect: EquivalenciaTipoCuenta | undefined;

  // Objeto para tipos de cuentas
  tiposCuentas: TipoCuenta[] = [];

  // Banderas
  @Input() createModal!: boolean;
  @Input() isEdit: boolean = false;

  // Titulo del modal
  @Input() titleForm!: string;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal  = new EventEmitter();
  @Output() onLoadData  = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  constructor(private companyNominaService: CompanyNominaService,
              private equivalenciasService: EquivalenciasService,
              private tipoCuentaService: TipoCuentaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      idEmpresa:  [ ],
      tipiCodtip: [ ],
      codins:     [ ],
      tctaTipcta: [ , [ Validators.required ]],
      equiva:     [ , [ Validators.required, Validators.maxLength(10) ]]
    });
  }

  ngOnInit(): void {
    this.loadTipoCuentas();
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['tctaTipcta'].enable();
      return;
    }
    // Deshabilitamos los campos que no se pueden editar
    this.form.controls['tctaTipcta'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.equivalenciaCuentaSelect);
  }

  /**
   * Cargar tipos de cuentas para mostrar en el formulario
   */
  loadTipoCuentas(): void {
    this.spinner.show();
    this.tipoCuentaService.getAll()
      .subscribe({
        next: (res) => {
          this.tiposCuentas = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
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
    let data: EquivalenciaTipoCuenta = this.form.getRawValue();

    this.spinner.show();

    // Editar
    if(this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { equiva } = data;
      this.equivalenciasService.update(data, { equiva })
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
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la equivalencia.', life: 3000});
          } 
        });
      return;
    }
    
    // Asignar el idEmpresa e idNomina para crear situación
    if (!this.institucionSelect) { return; }
    data.idEmpresa  = this.institucionSelect.idEmpresa;
    data.tipiCodtip = this.institucionSelect.tipiCodtip;
    data.codins     = this.institucionSelect.codins;
    // Crear
    this.equivalenciasService.create(data)
      .subscribe({
        next: (resp) => {
          this.closeModal();
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.companyNominaService.selectRowThirdTable$.emit(null);
          this.onLoadData.emit();
        },
        error: (err) => {
          if (err.error.detail.includes("ya existente") ) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo crear, equivalencia ya existente.', life: 3000});
            this.spinner.hide();
            return false;
          }
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la equivalencia.', life: 3000});
          return false;
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
  get equivaMsgError(): string {
    const errors = this.form.get('equiva')?.errors;
    if ( errors?.required ) {
      return 'La equivalencia es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La equivalencia es de longitud máxima de 10 dígitos, formato alfanumérico.';
    }
    return '';
  }

}
