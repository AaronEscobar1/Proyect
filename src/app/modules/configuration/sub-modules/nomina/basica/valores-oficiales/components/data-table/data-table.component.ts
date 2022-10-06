import { Component, OnInit, Input } from '@angular/core';
import { ValorOficial } from '../../interfaces/valor-oficial.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() valoresOficiales: ValorOficial[] = [];

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',     header: 'Id'    },
      { field: 'paisId', header: 'País'  },
      { field: 'fecefe', header: 'Fecha' },
      { field: 'valor',  header: 'Valor' }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
  }

}
