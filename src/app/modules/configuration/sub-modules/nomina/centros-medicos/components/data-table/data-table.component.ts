import { Component, OnInit, Input } from '@angular/core';
import { CentrosMedicos } from '../../interfaces/centro-medico.interfaces';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { CentrosMedicosService } from '../../services/centros-medicos.service';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() centrosMedicos!: CentrosMedicos[];

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codmed', header: 'Código' },
      { field: 'desmed', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
  }


}
