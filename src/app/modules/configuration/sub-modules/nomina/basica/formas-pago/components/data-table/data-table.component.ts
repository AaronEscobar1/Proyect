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

  // Objeto para mostrar en la tabla
  @Input() formasPago!: FormasPago[];

  // Columnas de la tabla
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codpag', header: 'Código'      },
      { field: 'despag', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
  }

}
