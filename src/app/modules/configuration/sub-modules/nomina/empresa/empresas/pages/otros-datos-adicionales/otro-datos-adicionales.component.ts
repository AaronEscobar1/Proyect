import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../interfaces/compania.interfaces';
import { OtrosDatosEmpresa } from '../../interfaces/otros-datos-empresa.interfaces';
import { OtroDatosAdicionalesService } from '../../services/otro-datos-adicionales.service';

@Component({
  selector: 'app-otro-datos-adicionales',
  templateUrl: './otro-datos-adicionales.component.html'
})
export class OtroDatosAdicionalesComponent implements OnInit {

  // Empresas para mostrar en la tabla
  @Input() companias!: Company[];

  // Objeto para tomar el id para registrar otros datos de empresa
  companySelect!: Company;

  // Objetos
  otrosDatosEmpresaSelect: OtrosDatosEmpresa | undefined = undefined;
  
  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar otros datos de empresa';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private otroDatosAdicionalesService: OtroDatosAdicionalesService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
  }

  loadOtherDataEmpresa(id: string): void {
    if (id == null) {
      this.otrosDatosEmpresaSelect = undefined;
      return;
    }
    this.spinner.show()
    this.otroDatosAdicionalesService.getDatosAdicionalesByIdEmpresa(id)
      .subscribe({
        next: (resp) => {
          this.otrosDatosEmpresaSelect = resp;
          this.spinner.hide()
        },
        error: (err) => {
          this.otrosDatosEmpresaSelect = undefined;
          this.spinner.hide()
          if( err.error.message == "Recurso no encontrado.") {
            this.messageService.add({severity: 'info', summary: '', detail: err.error.detail, life: 3000});
          }
        }
      })
  }

  openModalCreate(company: Company): void {
    this.isEdit = false;
    this.titleForm = 'Agregar otros datos adicionales';
    this.companySelect = company;
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.otrosDatosEmpresaSelect = undefined;
  }

  /**
   * Seleccionar el row para editar
   * @param company 
   */
  editRow(company: Company) {
    this.isEdit = true;
    this.titleForm = 'Editar otros datos adicionales';
    this.companySelect = company;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @returns void
   */
   deleteRow(company: Company) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar los otros datos adicionales de <b>${company.nombre}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.otroDatosAdicionalesService.delete(company.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar los otros datos adicionales.', life: 3000});
              return false;
            }
          });
      }
    });
    this.selectRowService.selectRowAlterno$.emit(null);
  }
  

}
