import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { EstadoCivil } from '../../interfaces/estado-civil.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() estadosCiviles!: EstadoCivil[];

  // Table
  columns: TableHead[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',        header: 'Código'         },
      { field: 'nombre',    header: 'Nombre'         },
      { field: 'codigoLey', header: 'Código oficial' },
    ]
  }

  onRowSelect(event: any): void {    
    this.selectRowService.selectRow$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRow$.emit(null);
  }

}
