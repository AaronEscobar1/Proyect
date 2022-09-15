import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { MonedaNomina, MonedaNominaCreate } from '../../interfaces/moneda-nomina.interfaces';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { MonedaNominaService } from '../../services/moneda-nomina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { TipoMoneda } from '../../../tipos-monedas/interfaces/tipo-moneda.interfaces';
import { ObjectEventChange } from 'src/app/shared/interfaces/country-entity.interfaces';
import { Dropdown } from '../../../../basica/sindicatos/interfaces/sindicatos.interfaces';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html'
})
export class ModalAddEditComponent implements OnInit {

  // Empresa seleccionada desde la tabla
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto de monedas nóminas por empresa y nomina
  @Input() monedasNominas: MonedaNomina[] = [];

  // Objeto seleccionado para editar
  @Input() monedaNominaSelect!: MonedaNomina | undefined;

  // Objeto tipos de monedas
  @Input() tiposMonedas: TipoMoneda[] = [];

  // Variable para mostrar la descripción de la moneda
  monedaSelect: string = '';

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

  constructor(private companyNominaService: CompanyNominaService,
              private monedaNominaService: MonedaNominaService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      empresaid:  [ ],
      nominaid:   [ ],
      fvigencia:  [  , [ Validators.required ]],
      monedaid:   [  , [ Validators.required, this.validatedId.bind(this) ]],
      comentario: [  , [ Validators.maxLength(256) ]]
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if( !this.isEdit ) {
      this.form.reset();
      this.form.controls['fvigencia'].enable();
      this.form.controls['monedaid'].enable();
      return;
    }
    this.form.controls['fvigencia'].disable();
    this.form.controls['monedaid'].disable();
    // Seteamos los valores del row seleccionado al formulario
    this.form.reset(this.monedaNominaSelect);
  }

  /**
   * Asigna el nombre del tipo de moneda seleccionada en el campo que se muestra en el formulario
   * @param dropdownElement: TipoMoneda
   */
  monedaSelectChange(dropdownElement: TipoMoneda): void {
    // Asignamos el nombre del tipo de moneda al campo en el formulario
    this.monedaSelect = dropdownElement.nombre;
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
    let data: MonedaNomina = this.form.getRawValue();
    
    this.spinner.show();

    // Editar
    if (this.isEdit) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { comentario } = data;
      this.monedaNominaService.update(data, { comentario } )
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
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la moneda nómina.', life: 3000});
        }
      });
      return;
    }

    data.empresaid = this.empresaRow.id;
    data.nominaid = this.nominaRow.tipnom;
    // Crear
    this.monedaNominaService.create(data)
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
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo crear, moneda nómina ya existente.', life: 3000});
            this.spinner.hide();
            return false;
          }
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la moneda nómina.', life: 3000});
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

  // Mensajes de errores id
  get monedaidMsgError(): string {
    const errors = this.form.get('monedaid')?.errors;
    if ( errors?.required ) {
      return 'La moneda es obligatoria.';
    } else if ( errors?.duplicated ) {
      return 'La moneda ya existe.';
    }
    return '';
  }

  // Validar si esta duplicado el id 
  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
    return this.monedasNominas.findIndex(val => val.monedaid.toString() === control.value) > -1 ?
                                        {'duplicated': true} :
                                        null;
  }

}
