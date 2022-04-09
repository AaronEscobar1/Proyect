import { Component, OnInit, Input } from '@angular/core';
import { MotivosFiniquito } from '../../interfaces/motivos-finiquito.interfaces';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { MotivosFiniquitoService } from '../../services/motivos-finiquito.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() motivosFiniquito!: MotivosFiniquito[];

  // Table
  columns: TableHead[] = [];

  constructor(private motivosFiniquitoService: MotivosFiniquitoService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codmot', header: 'Código' },
      { field: 'desmot', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.motivosFiniquitoService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.motivosFiniquitoService.selectRow$.emit(null);
  }

}
