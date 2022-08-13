import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { ConceptoSituacion } from '../../../interfaces/concepto-situacion.interfaces';

@Component({
  selector: 'app-data-table-conceptos',
  templateUrl: './data-table-conceptos.component.html',
  styleUrls: ['./data-table-conceptos.component.scss']
})
export class DataTableConceptosComponent implements OnInit {

  // Objeto para mostrar conceptos por situación
  @Input() conceptoSituacion: ConceptoSituacion[] = [];

  // Columnas de la table
  columns: TableHead[] = [];

  constructor() { }

  ngOnInit(): void {
    this.columns = [
      { field: 'concon', header: 'Conceptos'    },
      { field: 'condia', header: 'Días'         },
      { field: 'connos', header: 'No suspender' },
    ];
  }

}
