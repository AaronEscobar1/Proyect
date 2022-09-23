import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { Subscription } from 'rxjs';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { EquivalenciasComponent } from '../equivalencias/equivalencias.component';

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

  // Emisión de evento de padre a hijo (resetar valores de tablas)
  @ViewChild(EquivalenciasComponent) equivalenciasComponent!: EquivalenciasComponent;
  
  constructor(private companyNominaService: CompanyNominaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.selectRowServices.selectRow$.subscribe( (row: Company) => {
      this.empresaRow = row;
      this.clearDataTipoInstitucion();
    });
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

  /**
   * Limpiar tabla tipo de instituciones
   */
  clearDataTipoInstitucion() {
    this.equivalenciasComponent.resetTablaTipoInstituciones();
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
