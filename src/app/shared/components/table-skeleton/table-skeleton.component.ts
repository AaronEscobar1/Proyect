import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-skeleton',
  templateUrl: './table-skeleton.component.html'
})
export class TableSkeletonComponent implements OnInit {

  /* Numero de filas que tendra el cuerpo de la tabla, por defecto 2*/
  @Input() rowsNumber   : number = 2;
  /* Numero de columnas que tendra el cuerpo de la tabla, por defecto 2 */
  @Input() columnsNumber: number = 2;
  rows   : number[] = [];
  columns: number[] = [];
  
  constructor() {
  }

  ngOnInit(): void {
    this.rows    = new Array<number>(this.rowsNumber);
    this.columns = new Array<number>(this.columnsNumber);
  }

}
