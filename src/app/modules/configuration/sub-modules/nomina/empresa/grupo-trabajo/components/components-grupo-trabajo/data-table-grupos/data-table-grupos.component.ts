import { Component, Input, OnInit } from '@angular/core';
import { GrupoTrabajoService } from '../../../services/grupo-trabajo.service';
import { GrupoTrabajo, tipoJornadaData } from '../../../interfaces/grupo-trabajo.interfaces';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';

@Component({
  selector: 'app-data-table-grupos',
  templateUrl: './data-table-grupos.component.html',
  styleUrls: ['./data-table-grupos.component.scss']
})
export class DataTableGruposComponent implements OnInit {

  // Objeto para mostrar todos los grupos de trabajo por empresa y tipo nomina
  @Input() gruposTrabajo: GrupoTrabajo[] = [];

  // Table
  columns: TableHead[] = [];

  // Filtro dropdown
  tipoJornadaFilter : dropdownType[] = [];
  diaLaborableFilter: dropdownType[] = [];

  constructor(private grupoTrabajoService: GrupoTrabajoService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codgru',  header: 'Código'      },
      { field: 'desgru',  header: 'Descripción' }
    ];
    // Objeto para filtrar los dias laborables en la tabla
    this.diaLaborableFilter = [
      { label: 'Todos',     value: ''  },
      { label: 'Si labora', value: '1' },
      { label: 'No labora', value: '0' }
    ];
    // Objeto para filtrar los tipos de jornada en la tabla
    this.tipoJornadaFilter = tipoJornadaData;
    // Agregar el objeto al principio del arreglo
    this.tipoJornadaFilter.unshift({ label: 'Todos', value: '' });
  }

  onRowSelect(event: any): void {
    this.grupoTrabajoService.selectRowGrupo$.emit(event.data);
  }

  onRowUnselect(): void {
    this.grupoTrabajoService.selectRowGrupo$.emit(null);
  }

}
