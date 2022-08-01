import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { CentroTrabajo } from '../../interfaces/distribucion-impuesto.interfaces';

@Component({
  selector: 'app-data-table-centro-trabajo',
  templateUrl: './data-table-centro-trabajo.component.html',
  styleUrls: ['./data-table-centro-trabajo.component.scss']
})
export class DataTableCentroTrabajoComponent implements OnInit {

  @Input() centrosTrabajos: CentroTrabajo[] = [];
  
  @Output() onLoadAdditionalData = new EventEmitter();

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codcen', header: 'Código'      },
      { field: 'descen', header: 'Descripción' },
      { field: 'facrie', header: 'Factor'      }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRowAlterno$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRowAlterno$.emit(null);
  }

}
