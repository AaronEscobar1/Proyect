import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../../nomina/empresa/empresas/interfaces/compania.interfaces';
import { TipoVacaciones, ParametrosIniciales } from '../../interfaces/parametros-iniciales.interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParametrosInicialesService } from '../../services/parametros-iniciales.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-parametros-iniciales',
  templateUrl: './parametros-iniciales.component.html',
  // Estilo para que el dropdown ocupe el 100%
  styles: [` 
    :host ::ng-deep .p-dropdown { 
      width: 100%; 
    }
  `],
  providers: [ MessageService, ConfirmationService ]
})
export class ParametrosInicialesComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresa!: Company | null;

  // Objeto para mostrar el campo select de tipos de vacaciones
  @Input() tipoVacaciones: TipoVacaciones[] = [];

  // Objeto para llenar el formulario
  parametrosIniciales!: ParametrosIniciales | null;

  // Banderas
  isEdit: boolean = false;

  // Formulario reactivo
  form!: FormGroup;

  constructor(private parametrosInicialesService: ParametrosInicialesService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      id_empresa       :  [  , [ Validators.required, Validators.maxLength(4)  ]],
      vacacionPorVencer:  [  , [ Validators.required ]],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // Deshabilitar por defecto el campo id_empresa
    this.form.controls['id_empresa'].disable();
    // Realizar peticion al backend para ver si tiene registro asignado a la empresa
    if ( this.empresa && this.empresa.id ) {
      this.loadParametroInicial(this.empresa.id);
    }
  }

  /**
   * Resetear el formulario y variable editar
   */
  formInit(): void {
    this.isEdit = false;
    this.form.reset();
    this.form.controls['id_empresa'].setValue(this.empresa?.id);
  }

  /**
   * Obtener datos de parametros asignado a la empresa
   * @param id: string id empresa
   */
  loadParametroInicial( id: string ) {
    this.spinner.show();
    this.parametrosInicialesService.getById(id)
      .subscribe({
        next: (res) => {
          this.parametrosIniciales = res;
          // Asignar datos al formulario
          this.form.reset(this.parametrosIniciales);
          this.isEdit = true;
          this.spinner.hide();
        },
        error: (err) => {
          this.formInit();
          this.spinner.hide();
        }
      });
  }

  /**
   * Guardar y actualizar registros de parametros iniciales
   */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Obtener formulario
    const data: ParametrosIniciales = this.form.getRawValue();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      this.parametrosInicialesService.update(data)
        .subscribe({
          next: (resp) => {
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar el parametro inicial.', life: 3000});
          } 
        });
      return;
    }

    // Crear
    this.parametrosInicialesService.create(data)
      .subscribe({
        next: (resp) => {
          this.isEdit = true;
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el parametro inicial.', life: 3000});
        }
      });
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid(campo: string): boolean | null {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
              && this.form.invalid;
  }

}
