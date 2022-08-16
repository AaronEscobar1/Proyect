import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table-situacion',
  templateUrl: './data-table-situacion.component.html',
  styleUrls: ['./data-table-situacion.component.scss']
})
export class DataTableSituacionComponent implements OnInit {

  // Objeto para mostrar todos las situaciones por empresa y tipo nomina
  @Input() situaciones: any[] = [];

  // Objeto de estatus vacaciones para filtrar en tabla
  @Input() estatusVacacionesFilter: dropdownType[] = [];
  
  // Objeto de esquemas de trabajo para filtrar en tabla
  @Input() esquemasTrabajoFilter: dropdownType[] = [];

  // Objeto de clases situaciones para filtrar en tabla
  @Input() claseSituacionesFilter: dropdownType[] = [];

  // Table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codsta', header: 'Código'        },
      { field: 'dessta', header: 'Descripción'   },
      { field: 'nmVacacionStatusTb.vacsta', header: 'Vacación'      },
      { field: 'idGrupo', header: 'Grupo'         },
      { field: 'idRotacion', header: 'Cons.'         },
      { field: 'nmTipoEsquTrabCalcVacaTb.conesq', header: 'Esquema'       },
      { field: 'cfClaseSituacionTb.clasta', header: 'Clasificación' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

  /**
   * Devolver valor de la descripción del campo
   * @param value string
   * @param objFilter: dropdownType[]
   * @returns string
   */
  getDescripcion(value: string, objFilter: dropdownType[]): string {
    const descripcion = objFilter.find(val => val.value === value);
    return descripcion ? descripcion.label : '-';
  }

}
