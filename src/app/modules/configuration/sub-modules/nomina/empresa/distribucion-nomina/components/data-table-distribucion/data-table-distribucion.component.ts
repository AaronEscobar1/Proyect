import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { DistribucionNomina } from '../../interfaces/distribucion-impuesto.interfaces';

@Component({
  selector: 'app-data-table-distribucion',
  templateUrl: './data-table-distribucion.component.html',
  styleUrls: ['./data-table-distribucion.component.scss']
})
export class DataTableDistribucionComponent implements OnInit {

  @Input() distribucionesNomina!: DistribucionNomina[];
  
  @Output() onLoadAdditionalData = new EventEmitter();

  // Table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codsuc', header: 'Código'      },
      { field: 'dessuc', header: 'Descripción' },
      { field: 'codubi', header: 'Ubicación'   }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }
  
}
