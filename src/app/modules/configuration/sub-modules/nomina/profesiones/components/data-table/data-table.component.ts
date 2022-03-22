import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { Profession } from '../../interfaces/professions.interfaces';
import { ProfesionesService } from '../../services/profesiones.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() professions!: Profession[];

  // Table
  columns: TableHead[] = [];

  constructor(private profesionesService: ProfesionesService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codprf', header: 'Código' },
      { field: 'desprf', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.profesionesService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.profesionesService.selectRow$.emit(null);
  }

}
