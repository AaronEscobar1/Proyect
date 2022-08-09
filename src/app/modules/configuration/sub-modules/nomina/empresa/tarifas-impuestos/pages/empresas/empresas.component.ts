import { Component, OnInit } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { Subscription } from 'rxjs';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class EmpresasComponent implements OnInit {

  // Variable para cargar las empresas
  companias: Company[] = [];

  // Variable para seleccionar el registro
  empresaRow!: Company;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private companyNominaService: CompanyNominaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.selectRowServices.selectRow$.subscribe( (row: Company) => this.empresaRow = row );
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

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
