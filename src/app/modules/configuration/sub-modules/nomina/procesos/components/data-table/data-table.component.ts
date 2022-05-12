import { Component, OnInit, Input } from '@angular/core';
import { Procesos } from '../../interfaces/procesos.interfaces';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { ProcesosService } from '../../services/procesos.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() procesos!: Procesos[];

  // Table
  columns: TableHead[] = [];

  constructor(private procesosService: ProcesosService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'tippro',  header: 'Código' },
      { field: 'nompro',  header: 'Descripción' },
      { field: 'nomadi',  header: 'Descripción adicional' },
    ];
  }

  onRowSelect(event: any): void {
    this.procesosService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.procesosService.selectRow$.emit(null);
  }

}
