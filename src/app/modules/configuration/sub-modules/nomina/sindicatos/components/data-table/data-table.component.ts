import { Component, OnInit, Input } from '@angular/core';
import { Sindicatos } from '../../interfaces/sindicatos.interfaces';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() sindicatos!: Sindicatos[];

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codsin',     header: 'Código'      },
      { field: 'dessin',     header: 'Descripción' },
      { field: 'registro',   header: 'Fecha'       },
      { field: 'nroreg',     header: 'Número'      },
      { field: 'ntomo',      header: 'Tomo'        },
      { field: 'nfolio',     header: 'Folio'       }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
  }

}
