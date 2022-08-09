import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { CentroTrabajo } from '../../interfaces/distribucion-impuesto.interfaces';

@Component({
  selector: 'app-data-table-centro-trabajo',
  templateUrl: './data-table-centro-trabajo.component.html',
  styleUrls: ['./data-table-centro-trabajo.component.scss']
})
export class DataTableCentroTrabajoComponent implements OnInit {

  // Objeto que se mostrará en la tabla
  @Input() centrosTrabajos: CentroTrabajo[] = [];
  
  // Columnas de la table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codcen', header: 'Código'      },
      { field: 'descen', header: 'Descripción' },
      { field: 'facrie', header: 'Factor'      }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
