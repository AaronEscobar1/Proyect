import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { CompaniaService } from '../../../empresas/services/compania.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class EmpresaComponent implements OnInit {

  // Objetos
  companias: Company[] = [];
  companiaSelect!: Company | undefined;

  constructor(private companiaService: CompaniaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
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
