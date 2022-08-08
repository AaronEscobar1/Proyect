import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Company } from '../../../empresas/interfaces/compania.interfaces';
import { CompaniaService } from '../../../empresas/services/compania.service';

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

  constructor(private companiaService: CompaniaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
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

}
