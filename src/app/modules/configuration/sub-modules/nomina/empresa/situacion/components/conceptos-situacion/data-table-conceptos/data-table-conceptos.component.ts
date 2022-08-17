import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { ConceptoSituacion, SuspencionVacacion, ConceptoSituacionCreate } from '../../../interfaces/concepto-situacion.interfaces';
import { Table } from 'primeng/table';
import { Situacion } from '../../../interfaces/situacion.interfaces';
import { ConceptoSituacionService } from '../../../services/concepto-situacion.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  // Cantidad de registros por página
  rows: number = 5;

  // Bandera para deshabilitar campo concepto
  isEdit: boolean = false;
  // Bandera para agregar un nuevo registro
  isAddNewRow: boolean = false;

  // Variables para almacenar registros en memoria de la fila seleccionada
  clonedDataRow:  { [idConcepto: string]: ConceptoSituacion; } = {};
  clonedIdSusvac: { [idConcepto: string]: string; }            = {};

  // Emisión de eventos (loadData)
  @Output() onLoadData = new EventEmitter();

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private conceptoSituacionService: ConceptoSituacionService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'idConcepto',                          header: 'Conceptos'    },
      { field: 'dialim',                              header: 'Días'         },
      { field: 'nmTipoSuspencionVacacTb.descripcion', header: 'No suspender' },
    ];
  }
  
  /**
   * Agregar una nueva fila vacia con valores por defecto
   */
  addNewRow(): void {
    this.isAddNewRow = true;
    // Crear un nuevo objeto
    const newDataRow = this.newRow();
    // Redondear el número con el fin de posicionar la página correspondiente cuando se agrega una fila
    this.table.first = Math.floor(this.conceptoSituacion.length / this.rows) * this.rows;
    // Actualizar el total de los registros de la tabla con la nueva fila agregada.
    this.table.totalRecords = this.conceptoSituacion.length + 1;
    // Agregar un nuevo objeto a los valores de la tabla
    this.table.value.push(newDataRow);
    // Iniciar la edición para agregar el registro
    this.table.initRowEdit(newDataRow);
    // Reiniciar la cantidad de rows que pueden ver en la tabla cuando se crea una nueva fila
    this.table._rows = this.rows;
  }

  /**
   * Establecer un nuevo objeto con los valores por defecto
   * @returns ConceptoSituacion
   */
  newRow(): ConceptoSituacion {
    return { 
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
      },
      // Colocar un id temporal en el registro para el [dataKey] de la tabla
      idTableTemporal: this.getIdTemporalMax()
    };
  }

  /**
   * Obtener el valor máximo del arreglo y retornar el siguiente valor.
   * @returns number
   */
  getIdTemporalMax(): number {
    return this.conceptoSituacion.length == 0 ? 0 : Math.max(...this.conceptoSituacion.map(data => data.idTableTemporal + 1 ));
  }

  /**
   * Activar formulario del row
   * @param dataRow: ConceptoSituacion
   */
  onRowEditInit(dataRow: ConceptoSituacion): void {
    this.isEdit = true;
    // Clonamos el registro para mantenerlo en memoria y tomar acciones si se guarda o se cancela el registro
    this.clonedDataRow[dataRow.idTableTemporal] = {...dataRow};
    this.clonedIdSusvac[dataRow.idTableTemporal] = this.clonedDataRow[dataRow.idTableTemporal].nmTipoSuspencionVacacTb.susvac;
  }

  /**
   * Crear y editar registros
   * @param conceptoSituacion: ConceptoSituacion
   */
  onRowEditSave(conceptoSituacion: ConceptoSituacion): void {

    let dataForm: ConceptoSituacionCreate = {
      idConcepto: conceptoSituacion.idConcepto,
      dialim: Number(conceptoSituacion.dialim),
      susvac: conceptoSituacion.nmTipoSuspencionVacacTb.susvac
    };
    
    this.spinner.show();

    // Editar
    if ( this.isEdit ) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idConcepto, ...dataUpdate} = dataForm;
      this.conceptoSituacionService.update(conceptoSituacion, dataUpdate)
        .subscribe({
          next: (resp) => {
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.onLoadEmit();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la situación.', life: 3000});
            this.onLoadEmit();
          } 
        });
      return;
    }

    // Crear conceptos
    this.conceptoSituacionService.create(conceptoSituacion, dataForm)
      .subscribe({
        next: (resp) => {
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadEmit();
        },
        error: (err) => {
          if (err.error.detail.includes("ya existente") ) {
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear, concepto por situacion ya existente.', life: 3000});
            this.onLoadEmit();
            return false;
          }
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear la situación.', life: 3000});
          this.onLoadEmit();
          return false;
        }
      });
  }

  /**
   * Elimina un registro
   * @param conceptoSituacion: ConceptoSituacion row de la tabla
   * @returns void
   */
  onRowDelete(conceptoSituacion: ConceptoSituacion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este concepto de situación?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.conceptoSituacionService.delete(conceptoSituacion)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.onLoadEmit();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el concepto de situación, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el concepto de situación.', life: 3000});
              return false;
            }
          });
      }
    });
  }

  /**
   * Cancelar edición del registro
   * @param dataRow: ConceptoSituacion
   * @param index: number, indice del row
   */
  onRowEditCancel(dataRow: ConceptoSituacion, index: number): void {
    if( this.isAddNewRow ) { 
      this.table.value.splice(index, 1);
      // Redondear el número con el fin de posicionar la página correspondiente cuando se agrega una fila
      this.table.first = Math.floor(this.conceptoSituacion.length / this.rows) * this.rows;
      // Actualizar el total de los registros de la tabla.
      this.table.totalRecords = this.conceptoSituacion.length;
      this.isAddNewRow = false;
      return;
    }
    // Mantener registro original sin la modificacion del usuario
    this.conceptoSituacion[index].nmTipoSuspencionVacacTb.susvac = this.clonedIdSusvac[dataRow.idTableTemporal];
    this.conceptoSituacion[index] = this.clonedDataRow[dataRow.idTableTemporal];
    // Eliminar objeto clonado para limpiar variables
    delete this.clonedDataRow[dataRow.idTableTemporal];
    delete this.clonedIdSusvac[dataRow.idTableTemporal];
    this.isEdit = false;
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
