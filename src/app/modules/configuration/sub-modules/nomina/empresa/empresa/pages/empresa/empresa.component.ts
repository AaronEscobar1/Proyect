import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interfaces/empresa.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { empresasData } from '../../interfaces/empresa-data';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class EmpresaComponent implements OnInit {

  // Objetos
  empresas: Empresa[] = [];
  empresaSelect!: Empresa | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar empresa';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private empresaService: EmpresaService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    setTimeout(() => {
      this.empresas = empresasData;
      this.spinner.hide();
    }, 500);
  }

  refresh(): void {
    this.empresas = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar empresa' : 'Agregar empresa';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.empresaSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param empresa row de la tabla
   * @returns void
   */
  editRow(empresa: Empresa): void {
    this.isEdit = true;
    this.titleForm = this.isEdit ? 'Editar empresa' : 'Agregar empresa';
    this.empresaSelect = empresa;
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param empresa row de la tabla
   * @returns void
   */
  deleteRow(empresa: Empresa): void {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar la empresa <b>${empresa.desemp}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.empresas = this.empresas.filter(val => val.codemp !== empresa.codemp);
        this.spinner.hide();
      }
    });
  }

}
