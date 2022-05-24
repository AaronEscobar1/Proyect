import { Component, OnInit, Input } from '@angular/core';
import { Procesos } from '../../interfaces/procesos.interfaces';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() procesos!: Procesos[];

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'tippro',  header: 'Código' },
      { field: 'nompro',  header: 'Descripción' },
      { field: 'nomadi',  header: 'Descripción adicional' },
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
  }

}
