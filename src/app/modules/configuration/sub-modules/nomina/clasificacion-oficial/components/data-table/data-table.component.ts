import { Component, OnInit, Input } from '@angular/core';
import { OfficialClassification } from '../../interfaces/clasificacion-oficial.interfaces';
import { TableHead } from '../../../../../../../shared/interfaces/tableHead.interfaces';
import { ClasificacionOficialService } from '../../services/clasificacion-oficial.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() officialClassification!: OfficialClassification[];

  // Table
  columns: TableHead[] = [];

  constructor(private clasificacionOficialService: ClasificacionOficialService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codclao',  header: 'Código' },
      { field: 'desclao',  header: 'Descripción' },
      { field: 'typeclao', header: 'Tipo' }
    ];
  }

  onRowSelect(event: any): void {
    this.clasificacionOficialService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.clasificacionOficialService.selectRow$.emit(null);
  }

}
