import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class EmpresasComponent implements OnInit {

  // Objetos para cargar todas las empresas
  companias: Company[] = [];

  // Variable para seleccionar la empresa
  companiaSelect!: Company | undefined;

  constructor(private companyNominaService: CompanyNominaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    this.companyNominaService.getAll()
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

}
