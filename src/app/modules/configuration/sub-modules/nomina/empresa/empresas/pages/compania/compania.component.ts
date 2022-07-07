import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../interfaces/compania.interfaces';
import { CompaniaService } from '../../services/compania.service';

@Component({
  selector: 'app-compania',
  templateUrl: './compania.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class CompaniaComponent implements OnInit {

  // Objetos
  companias      : Company[] = [];
  companiaSelect!: Company | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar empresa';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companiaService: CompaniaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.spinner.show();
    this.companiaService.getAll()
      .subscribe({
        next: (res) => {
          this.companias = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }
  
  openModalCreate(): void {
    this.isEdit = false;
    this.titleForm = 'Agregar empresa';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.companiaSelect = undefined;
  }

  refresh(): void {
    this.companias = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  editRow(company: Company) {
    this.isEdit = true;
    this.titleForm = 'Editar empresa';
    this.companiaSelect = company;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param company row de la tabla
   * @returns void
   */
  deleteRow(company: Company) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta empresa <b>${company.nombre}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.companiaService.delete(company.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la empresa.', life: 3000});
              return false;
            }
          });
      }
    });
    this.selectRowServices.selectRow$.emit(null);
  }

}
