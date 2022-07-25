import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
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

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codsuc', header: 'Código'      },
      { field: 'dessuc', header: 'Descripción' },
      { field: 'codubi', header: 'Ubicación'   }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRowAlterno$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRowAlterno$.emit(null);
  }
  
}
