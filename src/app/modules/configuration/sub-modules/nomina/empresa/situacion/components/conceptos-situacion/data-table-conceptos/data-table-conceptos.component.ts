import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { ConceptoSituacion, SuspencionVacacion } from '../../../interfaces/concepto-situacion.interfaces';
import { Table } from 'primeng/table';
import { Situacion } from '../../../interfaces/situacion.interfaces';

@Component({
  selector: 'app-data-table-conceptos',
  templateUrl: './data-table-conceptos.component.html',
  styleUrls: ['./data-table-conceptos.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class DataTableConceptosComponent implements OnInit {

  // Variable del registro de la tabla
  @Input() situacionRow!: Situacion;

  // Objeto para mostrar conceptos por situación
  @Input() conceptoSituacion: ConceptoSituacion[] = [];

  // Variable para mostrar lista de noSuspender
  @Input() noSuspender: SuspencionVacacion[] = [];
  
  // Columnas de la table
  columns: TableHead[] = [];

  // Número de página por defecto
  pageNumber: number = 0;

  // Cantidad de registros por página
  rows: number = 5;

  // Bandera para deshabilitar campo concepto
  isEdit: boolean = false;

  // Variables para almacenar registros en memoria de la fila seleccionada
  clonedDataRow:  { [idConcepto: string]: ConceptoSituacion; } = {};
  clonedIdSusvac: { [idConcepto: string]: string; }            = {};

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') dataTable!: Table;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'idConcepto',                          header: 'Conceptos'    },
      { field: 'dialim',                              header: 'Días'         },
      { field: 'nmTipoSuspencionVacacTb.descripcion', header: 'No suspender' },
    ];
  }

  /**
   * Agregar fila e ir a la última página de la tabla
   */
  goLastPage(): void {
    this.conceptoSituacion.length - this.rows < 0 ? this.pageNumber = 0 : this.pageNumber = this.conceptoSituacion.length - this.rows;
  }

  /**
   * Agregar un nuevo row vacio con valores por defecto
   */
  addNewRow(): void {
    if ( !this.situacionRow ) { return; }
    if ( this.validatedSaveAndNewRow() ) { return; }
    const newDataRow: ConceptoSituacion = { 
      // Valores para crear concepto por empresa, nomina y situacion
      idEmpresa: this.situacionRow.idEmpresa,
      idNomina: this.situacionRow.idNomina,
      codStat: this.situacionRow.codsta,
      // Data necesaria para crear
      idConcepto: '',
      dialim: null,
      nmTipoSuspencionVacacTb: {
        susvac: '0',
        descripcion: 'No aplica' 
      }
    };
    this.conceptoSituacion.push(newDataRow);
    // Asignar el total de registros de la tabla con el fin de actualizar automaticamente el número de páginas
    this.dataTable._totalRecords = this.conceptoSituacion.length;
    // this.goLastPage();
    this.dataTable.editingRowKeys = { '': true };
    console.log((this.conceptoSituacion.length - this.rows) <= 0 ? 0 : (this.conceptoSituacion.length - this.rows) + 1);
    this.dataTable._first = this.conceptoSituacion.length - this.rows < 0 ? 0 : (this.conceptoSituacion.length - this.rows) + 1;
    console.log(this.dataTable);
  }

  validatedSaveAndNewRow(): boolean {
    const checkArray = this.conceptoSituacion.filter(value => value.idConcepto == '');
    if ( checkArray.length > 0 ) {
      console.error('error');
      this.messageService.add({severity: 'warn', summary: 'Error', detail: 'Debe guardar el registro nuevo.', life: 3000});
      return true;
    }
    return false;
  }

  /**
   * 
   * @param dataRow: ConceptoSituacion
   */
  onRowEditInit(dataRow: ConceptoSituacion): void {
    console.log(dataRow);
    this.isEdit = true;
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
    this.resetValores();
  }

  /**
   * Elimina un registro
   * @param dataRow row de la tabla
   * @returns void
   */
  onRowDelete(dataRow: ConceptoSituacion): void {
    console.log(dataRow);
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
    this.resetValores();
  }

  resetValores() {
    this.isEdit = false;
  }

}
