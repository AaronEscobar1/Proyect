import { Component, OnInit, Input } from '@angular/core';
import { ValorOficial } from '../../interfaces/valor-oficial.interfaces';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { ValoresOficialesService } from '../../services/valores-oficiales.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() valoresOficiales!: ValorOficial[];

  // Table
  columns: TableHead[] = [];

  constructor(private valoresOficialesService: ValoresOficialesService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'tipevlo', header: 'Tipo' },
      { field: 'datevlo', header: 'Fecha' },
      { field: 'valor',   header: 'Valor' }
    ];
  }

  onRowSelect(event: any): void {
    this.valoresOficialesService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.valoresOficialesService.selectRow$.emit(null);
  }

}
