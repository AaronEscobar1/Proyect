import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sindicatos } from '../../interfaces/sindicatos.interfaces';
import { TypesFile } from '../../../../../../../shared/interfaces/typesFiles.interfaces';
import { Helpers } from '../../../../../../../shared/helpers/helpers';
import { NgxSpinnerService } from 'ngx-spinner';
import { SindicatosService } from '../../services/sindicatos.service';
import { sindicatosData } from '../../interfaces/valor-oficial';

@Component({
  selector: 'app-sindicatos',
  templateUrl: './sindicatos.component.html',
  styleUrls: ['./sindicatos.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class SindicatosComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  sindicatos: Sindicatos[] = [];
  typesFile : TypesFile[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar sindicato';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private sindicatosService: SindicatosService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      codsin:  ['', [ Validators.required ]],
      dessin:  ['', [ Validators.required ]],
      // Registro
      datesin:   ['', [ Validators.required ]],
      numbersin: ['', [ Validators.required ]],
      tomosin:   ['', [ Validators.required ]],
      folio:     ['', [ Validators.required ]],
      // Inspectoria
      inspectoria: [''],
      // Direccion
      desdir:     [''],
      pais:       [''],
      entidadfed: [''],
      ciudad:     [''],
      telefono1:  [''],
      telefono2:  [''],
      fax:        [''],
      telex:      [''],
      email:      ['']
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
      this.sindicatos = sindicatosData;
      console.log(' > ', this.sindicatos );
      this.spinner.hide();
    }, 500);
  }

  refresh(): void {
    this.sindicatos = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar sindicato' : 'Agregar sindicato';
    this.createModal = true;
  }
  
  closeModal() {
    if(!this.isEdit) {
      this.form.controls['codsin'].enable();
    }
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
    let data: Sindicatos = this.form.getRawValue();

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      console.log('Update', data);
      this.sindicatos[this.findIndexById(this.form.getRawValue().codsin)] = this.form.getRawValue();
      this.sindicatos = [...this.sindicatos];
      this.spinner.hide();
      this.closeModal();
      return;
    }

    // Crear
    console.log('Create', data);
    this.sindicatos.push(data);
    this.sindicatos = [...this.sindicatos];
    this.spinner.hide();
    this.closeModal();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.sindicatos.length; i++) {
        if (this.sindicatos[i].codsin === id) {
            index = i;
            break;
        }
    }
    return index;
  } 

  /**
   * Carga la data en el formulario para editar
   * @param sindicatos row de la tabla
   * @returns void
   */
  editRow(sindicatos: Sindicatos): void {
    this.isEdit = true;
    if (!sindicatos) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return;
    }
    this.form.controls['codsin'].disable();
    this.form.reset(sindicatos);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param sindicatos row de la tabla
   * @returns void
   */
  deleteRow(sindicatos: Sindicatos): void {
    if (!sindicatos) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return; 
    }
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el sindicato <b>${sindicatos.dessin}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.sindicatos = this.sindicatos.filter(sin => sin.codsin !== sindicatos.codsin);
        this.spinner.hide();
      }
    });
  }

  export() {

  }


}
