import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValorOficial } from '../../interfaces/valor-oficial.interfaces';
import { TypesFile } from '../../../../../../../shared/interfaces/typesFiles.interfaces';
import { Helpers } from '../../../../../../../shared/helpers/helpers';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValoresOficialesService } from '../../services/valores-oficiales.service';
import { valorOficialData } from '../../interfaces/valor-oficial';

@Component({
  selector: 'app-valores-oficiales',
  templateUrl: './valores-oficiales.component.html',
  styleUrls: ['./valores-oficiales.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class ValoresOficialesComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  valoresOficiales: ValorOficial[] = [];
  typesFile       : TypesFile[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar valor oficial';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private valoresOficialesService: ValoresOficialesService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      codvlo: [],
      tipevlo: ['', [ Validators.required ]],
      datevlo: ['', [ Validators.required ]],
      valor: ['', [ Validators.required, Validators.maxLength(10) ]],
    });
  }

  ngOnInit(): void {
    this.typesFile = [
      { name: 'PDF',  code: 'PDF'  },
      { name: 'CSV',  code: 'CSV'  },
      { name: 'XML',  code: 'XML'  },
      { name: 'RFT',  code: 'RFT'  },
      { name: 'HTML', code: 'HTML' },
      { name: 'XLS',  code: 'XLS'  }
    ];
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    setTimeout(() => {
      this.valoresOficiales = valorOficialData;
      console.log(' > ', this.valoresOficiales );
      this.spinner.hide();
    }, 500);
  }

  refresh(): void {
    this.valoresOficiales = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar valor oficial' : 'Agregar valor oficial';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.form.reset();
    this.createModal = false;
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {
    console.log('this.form.value > ', this.form.getRawValue());
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Obtener formulario
    let data: ValorOficial = this.form.getRawValue();
    // Eliminar espacios en blanco en su atributo
    data.tipevlo.trim();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      console.log('Update', data);
      this.valoresOficiales[this.findIndexById(this.form.getRawValue().codvlo)] = this.form.getRawValue();
      this.valoresOficiales = [...this.valoresOficiales];
      this.spinner.hide();
      this.closeModal();
      return;
    }

    // Crear
    console.log('Create', data);
    this.valoresOficiales.push(data);
    this.valoresOficiales = [...this.valoresOficiales];
    this.spinner.hide();
    this.closeModal();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.valoresOficiales.length; i++) {
        if (this.valoresOficiales[i].codvlo === id) {
            index = i;
            break;
        }
    }
    return index;
  } 

  /**
   * Carga la data en el formulario para editar
   * @param valorOficial row de la tabla
   * @returns void
   */
   editRow(valorOficial: ValorOficial): void {
    this.isEdit = true;
    if (!valorOficial) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return;
    }
    // this.form.controls['codcat'].disable();
    this.form.reset(valorOficial);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param valorOficial row de la tabla
   * @returns void
   */
  deleteRow(valorOficial: ValorOficial): void {
    if (!valorOficial) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return; 
    }
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el valor oficial <b>${valorOficial.codvlo}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.valoresOficiales = this.valoresOficiales.filter(valOf => valOf.codvlo !== valorOficial.codvlo);
        this.spinner.hide();
      }
    });
  }

  export() {

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
  get tipevloMsgError(): string {
    const errors = this.form.get('tipevlo')?.errors;
    if ( errors?.required ) {
      return 'El tipo es obligatorio.';
    }
    return '';
  }
 
  // Mensajes de errores dinamicos
  get datevloMsgError(): string {
    const errors = this.form.get('datevlo')?.errors;
    if ( errors?.required ) {
      return 'La fecha es obligatoria.';
    }
    return '';
  }
  
  // Mensajes de errores dinamicos
  get valorMsgError(): string {
    const errors = this.form.get('valor')?.errors;
    if ( errors?.required ) {
      return 'El valor es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El valor es de longitud máxima de 10 dígitos.';
    }
    return '';
  }

}
