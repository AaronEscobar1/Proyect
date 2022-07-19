import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { PreguntaEntrevista } from '../../../interfaces/pregunta.interfaces';

@Component({
  selector: 'app-data-table-pregunta',
  templateUrl: './data-table-pregunta.component.html',
  styleUrls: ['./data-table-pregunta.component.scss']
})
export class DataTablePreguntaComponent implements OnInit {

  @Input() preguntasEntrevistas: PreguntaEntrevista[] = [];

  // Table
  columns: TableHead[] = [];

  // Filtro dropdown
  tipoFilter: dropdownType[] = [];

  constructor(private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'titulo',  header: 'Nombre' },
      { field: 'cerrada', header: 'Tipo'   }
    ];
    this.tipoFilter = [
      { label: 'Todos',   value: ''  },
      { label: 'Abierta', value: '1' },
      { label: 'Cerrada', value: '0' },
    ];
  }

  onRowSelect(event: any): void {    
    this.selectRowService.selectRowAlterno$.emit(event.data);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRowAlterno$.emit(null);
  }

}
