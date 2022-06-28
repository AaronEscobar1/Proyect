import { Component, OnInit, Input } from '@angular/core';
import { FormasPago } from '../../interfaces/formas-pago.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() formasPago!: FormasPago[];

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codpag', header: 'Código' },
      { field: 'despag', header: 'Descripción' },
      { field: 'coninsString', header: 'Tipo de pago' }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
  }

}
