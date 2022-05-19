import { Component, OnInit, Input } from '@angular/core';
import { CentrosMedicos } from '../../interfaces/centro-medico.interfaces';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { CentrosMedicosService } from '../../services/centros-medicos.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() centrosMedicos!: CentrosMedicos[];

  // Table
  columns: TableHead[] = [];

  constructor(private centrosMedicosService: CentrosMedicosService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codmed', header: 'Código' },
      { field: 'desmed', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.centrosMedicosService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.centrosMedicosService.selectRow$.emit(null);
  }


}
