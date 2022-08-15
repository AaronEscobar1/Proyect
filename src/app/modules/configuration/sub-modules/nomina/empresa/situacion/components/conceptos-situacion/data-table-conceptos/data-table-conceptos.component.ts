import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { ConceptoSituacion, SuspencionVacacion } from '../../../interfaces/concepto-situacion.interfaces';

@Component({
  selector: 'app-data-table-conceptos',
  templateUrl: './data-table-conceptos.component.html',
  styleUrls: ['./data-table-conceptos.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class DataTableConceptosComponent implements OnInit {

  // Objeto para mostrar conceptos por situación
  @Input() conceptoSituacion: ConceptoSituacion[] = [];

  // Variable para mostrar lista de noSuspender
  @Input() noSuspender: SuspencionVacacion[] = [];
  
  // Columnas de la table
  columns: TableHead[] = [];

  // Número de página por defecto
  pageNumber: number = 0;

  // Cantidad de registros por página
  rows: number = 1;

  // Variables para almacenar registros en memoria de la fila seleccionada
  clonedDataRow:  { [idConcepto: string]: ConceptoSituacion; } = {};
  clonedIdSusvac: { [idConcepto: string]: string; }            = {};

  constructor() { }

  ngOnInit(): void {
    this.columns = [
      { field: 'idConcepto',                          header: 'Conceptos'    },
      { field: 'dialim',                              header: 'Días'         },
      { field: 'nmTipoSuspencionVacacTb.descripcion', header: 'No suspender' },
    ];
  }

  golastPage(): void {
    console.log('cantidad de conceptos', this.conceptoSituacion.length);
    console.log('row', this.rows);
    console.log('total = ', this.conceptoSituacion.length - this.rows);
    this.pageNumber = this.conceptoSituacion.length - this.rows;
    console.log(this.pageNumber);
    // return this.customers ? this.first === (this.customers.length - this.rows): true;
  }

  /**
   * 
   * @param dataRow: ConceptoSituacion
   */
  onRowEditInit(dataRow: ConceptoSituacion): void {
    // Clonamos el registro para mantenerlo en memoria y tomar acciones si se guarda o se cancela el registro
    this.clonedDataRow[dataRow.idConcepto] = {...dataRow};
    this.clonedIdSusvac[dataRow.idConcepto] = this.clonedDataRow[dataRow.idConcepto].nmTipoSuspencionVacacTb.susvac;
  }

  /**
   * 
   * @param dataRow: ConceptoSituacion
   */
  onRowEditSave(dataRow: ConceptoSituacion): void {
    console.log('data Create', dataRow);
  }

  /**
   * 
   * @param dataRow: ConceptoSituacion
   * @param index: number, indice del row
   */
  onRowEditCancel(dataRow: ConceptoSituacion, index: number): void {
    // Mantener registro original sin la modificacion del usuario
    this.conceptoSituacion[index].nmTipoSuspencionVacacTb.susvac = this.clonedIdSusvac[dataRow.idConcepto];
    this.conceptoSituacion[index] = this.clonedDataRow[dataRow.idConcepto];
    // Eliminar objeto clonado para limpiar variables
    delete this.clonedDataRow[dataRow.idConcepto];
    delete this.clonedIdSusvac[dataRow.idConcepto];
  }

}
