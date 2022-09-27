import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { Subscription } from 'rxjs';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { dropdownType } from '../../../../../../../../shared/interfaces/typesFiles.interfaces';
import { sueldoList, Grados } from '../../interfaces/grados-tabuladores.interfaces';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['empresas.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class EmpresasComponent implements OnInit, OnDestroy {

  // Variable para cargar las empresas
  companias: Company[] = [];

  // Variable para seleccionar el registro
  empresaRow!: Company;

  // Objeto para mostrar en la lista desplegable
  sueldos: dropdownType[] = [];

  // Variable para seleccionar el sueldo
  sueldoSelect: string = 'Mensual';

  // Objeto de grados por tabulador     
  grados: Grados[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar empresa';
  createModal: boolean = false;
  printModal : boolean = false;
  
  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private companyNominaService: CompanyNominaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.sueldos = sueldoList;
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

  /**
   * Obtener todos los grados por tabulador
   * @param gradosEvent: Grados[] lista de grados
   */
  getDataGrados(gradosEvent: Grados[]): void {
    this.grados = gradosEvent;
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
