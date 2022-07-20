import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Countrys, ValorOficial } from '../../interfaces/valor-oficial.interfaces';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValoresOficialesService } from '../../services/valores-oficiales.service';
import { Helpers } from 'src/app/shared/helpers/helpers';

@Component({
  selector: 'app-valores-oficiales',
  templateUrl: './valores-oficiales.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ValoresOficialesComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  valoresOficiales: ValorOficial[] = [];
  countrys: Countrys[] = [];
  valoresSelect!: ValorOficial | undefined;
  typesFile       : TypesFile[] = typesFileData;

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
              private helpers: Helpers) { }

  ngOnInit(): void {
    this.loadData();
    this.loadCountrysData();
  }

  loadData() {
    this.spinner.show();
    this.valoresOficialesService.getAll()
      .subscribe({
        next: (res) => {
          this.valoresOficiales = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.valoresOficiales = [];
    this.loadData();
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
    this.createModal = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.valoresOficiales.length; i++) {
        if (this.valoresOficiales[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
  } 

  /**
   * Carga todos los países
   */
   loadCountrysData(): void {
    this.spinner.show();
    this.valoresOficialesService.getAllCountry()
      .subscribe({
        next: (resp) => {
          this.countrys = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
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
    valorOficial.fecefe = valorOficial.fecefe ? new Date(valorOficial.fecefe) : valorOficial.fecefe;

    this.valoresSelect = valorOficial
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param valorOficial row de la tabla
   * @returns void
   */
  deleteRow(valorOficial: ValorOficial): void {
    valorOficial.fecefe = `${new Date(valorOficial.fecefe).toISOString().slice(0, 10)}T00:00:00`;
    
    if (!valorOficial) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return; 
    }
    this.confirmationService.confirm({
      message: `¿Desea eliminar este valor oficial <b>${valorOficial.id}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.valoresOficialesService.delete(valorOficial)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar Valor Oficial.', life: 3000});
            }
          });
      }
    });
  }
}
