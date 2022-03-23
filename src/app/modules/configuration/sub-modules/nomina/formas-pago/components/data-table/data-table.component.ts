import { Component, OnInit, Input } from '@angular/core';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { FormasPagoService } from '../../services/formas-pago.service';
import { FormasPago } from '../../interfaces/formas-pago.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() formasPago!: FormasPago[];

  // Table
  columns: TableHead[] = [];

  constructor(private formasPagoService: FormasPagoService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codpag', header: 'Código' },
      { field: 'despag', header: 'Descripción' },
      { field: 'coninsString', header: 'Tipo de pago' }
    ];
  }

  onRowSelect(event: any): void {
    this.formasPagoService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.formasPagoService.selectRow$.emit(null);
  }

}
