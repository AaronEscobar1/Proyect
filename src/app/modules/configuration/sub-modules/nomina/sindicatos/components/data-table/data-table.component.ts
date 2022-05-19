import { Component, OnInit, Input } from '@angular/core';
import { Sindicatos } from '../../interfaces/sindicatos.interfaces';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { SindicatosService } from '../../services/sindicatos.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() sindicatos!: Sindicatos[];

  // Table
  columns: TableHead[] = [];

  constructor(private sindicatosService: SindicatosService) { }

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
    this.sindicatosService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.sindicatosService.selectRow$.emit(null);
  }

}
