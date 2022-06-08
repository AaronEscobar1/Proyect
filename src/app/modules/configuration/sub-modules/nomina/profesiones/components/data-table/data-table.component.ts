import { Component, Input, OnInit } from '@angular/core';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
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

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codprf', header: 'Código' },
      { field: 'desprf', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
  }

}
