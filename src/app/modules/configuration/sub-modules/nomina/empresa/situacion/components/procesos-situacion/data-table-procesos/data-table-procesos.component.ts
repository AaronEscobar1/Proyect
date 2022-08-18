import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Situacion } from '../../../interfaces/situacion.interfaces';
import { ProcesoSituacion } from '../../../interfaces/proceso-situacion.interfaces';
import { SuspencionVacacion } from '../../../interfaces/concepto-situacion.interfaces';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-data-table-procesos',
  templateUrl: './data-table-procesos.component.html',
  styleUrls: ['./data-table-procesos.component.scss']
})
export class DataTableProcesosComponent implements OnInit {

  // Variable del registro de la tabla
  @Input() situacionRow!: Situacion;

  // Objeto para mostrar procesos por situación
  @Input() procesosSituaciones: ProcesoSituacion[] = [];

  // Variable para mostrar lista de noSuspender
  @Input() noSuspender: SuspencionVacacion[] = [];

  // Columnas de la table
  columns: TableHead[] = [];

  // Cantidad de registros por página
  rows: number = 5;

  // Bandera para deshabilitar
  isEdit: boolean = false;
  // Bandera para agregar un nuevo registro
  isAddNewRow: boolean = false;

  // Variables para almacenar registros en memoria de la fila seleccionada
  clonedDataRow:  { [id: string]: ProcesoSituacion; } = {};
  clonedIdSusvac: { [id: string]: string; }           = {};

  // Emisión de eventos (loadData)
  @Output() onLoadData = new EventEmitter();

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Cargar data y restaurar banderas Edit y AddNewRow
   */
  onLoadEmit(): void {
    this.onLoadData.emit(this.situacionRow);
    this.isEdit = false;
    this.isAddNewRow = false;
  }

}
