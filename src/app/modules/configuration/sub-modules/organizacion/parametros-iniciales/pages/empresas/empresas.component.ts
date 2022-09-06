import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../../../nomina/empresa/shared-empresa/interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../../../nomina/empresa/shared-empresa/services/company-nomina.service';
import { Subscription } from 'rxjs';
import { ParametrosInicialesService } from '../../services/parametros-iniciales.service';
import { TipoVacaciones } from '../../interfaces/parametros-iniciales.interfaces';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class EmpresasComponent implements OnInit, OnDestroy {

  // Objetos para obtener las empresas
  companias: Company[] = [];

  // Objeto de empresa seleccionada
  companiaSelect!: Company | undefined;

  // Variable para llenar el campo select en el formulario
  tipoVacaciones: TipoVacaciones[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar empresa';
  createModal: boolean = false;
  printModal : boolean = false;

  // Variable para seleccionar el registro
  empresaRow!: Company;
  
  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private companyNominaService: CompanyNominaService,
              private parametrosInicialesService: ParametrosInicialesService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
    this.loadTiposVacaciones();
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.selectRowServices.selectRow$.subscribe( (row: Company) => { this.empresaRow = row });
  }

  /**
   * Cargar empresas
   */
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
   * Cargar tipos de vacaciones para mostrar una lista en parametros iniciales
   */
  loadTiposVacaciones(): void {
    this.spinner.show();
    this.parametrosInicialesService.getTiposVacacionesPorVender()
      .subscribe({
        next: (res) => {
          this.tipoVacaciones = res;
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
