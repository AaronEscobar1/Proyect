import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { GrupoTrabajoService } from '../../../services/grupo-trabajo.service';
import { GrupoRotacion } from '../../../../shared-empresa/interfaces/grupo-rotacion.interfaces';
import { TipoNomina } from '../../../../shared-empresa/interfaces/nominas.interfaces';
import { GrupoTrabajo } from '../../../interfaces/grupo-trabajo.interfaces';

@Component({
  selector: 'app-data-table-rotacion',
  templateUrl: './data-table-rotacion.component.html',
  styleUrls: ['./data-table-rotacion.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class DataTableRotacionComponent implements OnInit {

  // Variable del registro de la tabla
  @Input() nomina!: TipoNomina | undefined;

  //Variable del registro de la tabla idGrupoTrabajo
  @Input() gruposTrabajoSelectRow!: GrupoTrabajo

  // Objeto para mostrar rotaciones de grupo
  @Input() rotacionesGrupoTrabajo: GrupoRotacion[] = [];
  
  // Columnas de la table
  columns: TableHead[] = [];

  // Cantidad de registros por página
  rows: number = 5;

  // Bandera para deshabilitar campo concepto
  isEdit: boolean = false;
  // Bandera para agregar un nuevo registro
  isAddNewRow: boolean = false;

  // Variables para almacenar registros en memoria de la fila seleccionada
  clonedDataRow:  { [idRotacion: string]: GrupoRotacion; } = {};

  // Emisión de eventos (loadData)
  @Output() onLoadData = new EventEmitter();

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private grupoTrabajoService: GrupoTrabajoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'congru',    header: 'Codigo' },
      { field: 'diag01', header: 'diag01' },
      { field: 'diag02', header: 'diag02' },
      { field: 'diag03', header: 'diag03' },
      { field: 'diag04', header: 'diag04' },
      { field: 'diag05', header: 'diag05' },
      { field: 'diag06', header: 'diag06' },
      { field: 'diag07', header: 'diag07' },
      { field: 'diag08', header: 'diag08' },
      { field: 'diag09', header: 'diag09' },
      { field: 'diag10', header: 'diag10' },
      { field: 'diag11', header: 'diag11' },
      { field: 'diag12', header: 'diag12' },
      { field: 'diag13', header: 'diag13' },
      { field: 'diag14', header: 'diag14' },
      { field: 'diag15', header: 'diag15' },
      { field: 'diag16', header: 'diag16' },
      { field: 'diag17', header: 'diag17' },
      { field: 'diag18', header: 'diag18' },
      { field: 'diag19', header: 'diag19' },
      { field: 'diag20', header: 'diag20' },
      { field: 'diag21', header: 'diag21' },
      { field: 'diag22', header: 'diag22' },
      { field: 'diag23', header: 'diag23' },
      { field: 'diag24', header: 'diag24' },
      { field: 'diag25', header: 'diag25' },
      { field: 'diag26', header: 'diag26' },
      { field: 'diag27', header: 'diag27' },
      { field: 'diag28', header: 'diag28' },
      { field: 'diag29', header: 'diag29' },
      { field: 'diag30', header: 'diag30' },
      { field: 'diag31', header: 'diag31' },
      { field: 'diav01', header: 'diav01' },
      { field: 'diav02', header: 'diav02' },
      { field: 'diav03', header: 'diav03' },
      { field: 'diav04', header: 'diav04' },
      { field: 'diav05', header: 'diav05' },
      { field: 'diav06', header: 'diav06' },
      { field: 'diav07', header: 'diav07' },
      { field: 'diav08', header: 'diav08' },
      { field: 'diav09', header: 'diav09' },
      { field: 'diav10', header: 'diav10' },
      { field: 'diav11', header: 'diav11' },
      { field: 'diav12', header: 'diav12' },
      { field: 'diav13', header: 'diav13' },
      { field: 'diav14', header: 'diav14' },
      { field: 'diav15', header: 'diav15' },
      { field: 'diav16', header: 'diav16' },
      { field: 'diav17', header: 'diav17' },
      { field: 'diav18', header: 'diav18' },
      { field: 'diav19', header: 'diav19' },
      { field: 'diav20', header: 'diav20' },
      { field: 'diav21', header: 'diav21' },
      { field: 'diav22', header: 'diav22' },
      { field: 'diav23', header: 'diav23' },
      { field: 'diav24', header: 'diav24' },
      { field: 'diav25', header: 'diav25' },
      { field: 'diav26', header: 'diav26' },
      { field: 'diav27', header: 'diav27' },
      { field: 'diav28', header: 'diav28' },
      { field: 'diav29', header: 'diav29' },
      { field: 'diav30', header: 'diav30' },
      { field: 'diav31', header: 'diav31' },
      { field: 'diaga1', header: 'diaga1' },
      { field: 'diaga2', header: 'diaga2' },
      { field: 'diaga3', header: 'diaga3' },
      { field: 'diaga4', header: 'diaga4' },
      { field: 'diava1', header: 'diava1' },
      { field: 'diava2', header: 'diava2' },
      { field: 'diava3', header: 'diava3' },
      { field: 'diava4', header: 'diava4' },
    ];
  }

  /**
   * Método de Angular para comprobar expresiones y deteccion de cambios en la vista antes cambiar valores
   */
  ngAfterContentChecked() {
    // Eliminar errores de [ExpressionChangedAfterItHasBeenCheckedError]
    this.changeDetectorRef.detectChanges();
  }
  
  /**
   * Agregar una nueva fila vacia con valores por defecto
   */
  addNewRow(): void {
    this.isAddNewRow = true;
    // Crear un nuevo objeto
    const newDataRow = this.newRow();
    // Redondear el número con el fin de posicionar la página correspondiente cuando se agrega una fila
    this.table.first = Math.floor(this.rotacionesGrupoTrabajo.length / this.rows) * this.rows;
    // Actualizar el total de los registros de la tabla con la nueva fila agregada.
    this.table.totalRecords = this.rotacionesGrupoTrabajo.length + 1;
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
  newRow(): GrupoRotacion | undefined {
    if (!this.nomina) return 
    return { 
      // Valores para crear concepto por empresa, nomina y rotacion
      idEmpresa: this.nomina.idEmpresa,
      idNomina: this.nomina.tipnom,
      idGrupo: this.gruposTrabajoSelectRow.codgru,
    
      // Data necesaria para crear
      diag01: null,
      diag02: null,
      diag03: null,
      diag04: null,
      diag05: null,
      diag06: null,
      diag07: null,
      diag08: null,
      diag09: null,
      diag10: null,
      diag11: null,
      diag12: null,
      diag13: null,
      diag14: null,
      diag15: null,
      diag16: null,
      diag17: null,
      diag18: null,
      diag19: null,
      diag20: null,
      diag21: null,
      diag22: null,
      diag23: null,
      diag24: null,
      diag25: null,
      diag26: null,
      diag27: null,
      diag28: null,
      diag29: null,
      diag30: null,
      diag31: null,
      diav01: null,
      diav02: null,
      diav03: null,
      diav04: null,
      diav05: null,
      diav06: null,
      diav07: null,
      diav08: null,
      diav09: null,
      diav10: null,
      diav11: null,
      diav12: null,
      diav13: null,
      diav14: null,
      diav15: null,
      diav16: null,
      diav17: null,
      diav18: null,
      diav19: null,
      diav20: null,
      diav21: null,
      diav22: null,
      diav23: null,
      diav24: null,
      diav25: null,
      diav26: null,
      diav27: null,
      diav28: null,
      diav29: null,
      diav30: null,
      diav31: null,
      diaga1: null,
      diaga2: null,
      diaga3: null,
      diaga4: null,
      diava1: null,
      diava2: null,
      diava3: null,
      diava4: null,
      canlim: 0,
      congru: (this.getIdTemporalMax() + 2).toString(), 

      // Colocar un id temporal en el registro para el [dataKey] de la tabla
      idTableTemporal: this.getIdTemporalMax()
    };
  }

  /**
   * Obtener el valor máximo del arreglo y retornar el siguiente valor.
   * @returns number
   */
  getIdTemporalMax(): number {
    return this.rotacionesGrupoTrabajo.length == 0 ? 0 : Math.max(...this.rotacionesGrupoTrabajo.map(data => data.idTableTemporal + 1 ));
  }

  /**
   * Activar formulario del row
   * @param dataRow: RotacionRow
   */
  onRowEditInit(dataRow: GrupoRotacion): void {    
    this.isEdit = true;
    // Clonamos el registro para mantenerlo en memoria y tomar acciones si se guarda o se cancela el registro
    this.clonedDataRow[dataRow.idTableTemporal] = {...dataRow};
  }

  /**
   * Crear y editar registros
   * @param rotacionGrupo: ConceptoSituacion
   */
  onRowEditSave(rotacionGrupo: GrupoRotacion): void {
    let dataForm = {
        "idGrupo": rotacionGrupo.idGrupo,
        "congru": Number(rotacionGrupo.congru),
        "diag01": rotacionGrupo.diag01,
        "diag02": rotacionGrupo.diag02,
        "diag03": rotacionGrupo.diag03,
        "diag04": rotacionGrupo.diag04,
        "diag05": rotacionGrupo.diag05,
        "diag06": rotacionGrupo.diag06,
        "diag07": rotacionGrupo.diag07,
        "diag08": rotacionGrupo.diag08,
        "diag09": rotacionGrupo.diag09,
        "diag10": rotacionGrupo.diag10,
        "diag11": rotacionGrupo.diag11,
        "diag12": rotacionGrupo.diag12,
        "diag13": rotacionGrupo.diag13,
        "diag14": rotacionGrupo.diag14,
        "diag15": rotacionGrupo.diag15,
        "diag16": rotacionGrupo.diag16,
        "diag17": rotacionGrupo.diag17,
        "diag18": rotacionGrupo.diag18,
        "diag19": rotacionGrupo.diag19,
        "diag20": rotacionGrupo.diag20,
        "diag21": rotacionGrupo.diag21,
        "diag22": rotacionGrupo.diag22,
        "diag23": rotacionGrupo.diag23,
        "diag24": rotacionGrupo.diag24,
        "diag25": rotacionGrupo.diag25,
        "diag26": rotacionGrupo.diag26,
        "diag27": rotacionGrupo.diag27,
        "diag28": rotacionGrupo.diag28,
        "diag29": rotacionGrupo.diag29,
        "diag30": rotacionGrupo.diag30,
        "diag31": rotacionGrupo.diag31,
        "diav01": rotacionGrupo.diav01,
        "diav02": rotacionGrupo.diav02,
        "diav03": rotacionGrupo.diav03,
        "diav04": rotacionGrupo.diav04,
        "diav05": rotacionGrupo.diav05,
        "diav06": rotacionGrupo.diav06,
        "diav07": rotacionGrupo.diav07,
        "diav08": rotacionGrupo.diav08,
        "diav09": rotacionGrupo.diav09,
        "diav10": rotacionGrupo.diav10,
        "diav11": rotacionGrupo.diav11,
        "diav12": rotacionGrupo.diav12,
        "diav13": rotacionGrupo.diav13,
        "diav14": rotacionGrupo.diav14,
        "diav15": rotacionGrupo.diav15,
        "diav16": rotacionGrupo.diav16,
        "diav17": rotacionGrupo.diav17,
        "diav18": rotacionGrupo.diav18,
        "diav19": rotacionGrupo.diav19,
        "diav20": rotacionGrupo.diav20,
        "diav21": rotacionGrupo.diav21,
        "diav22": rotacionGrupo.diav22,
        "diav23": rotacionGrupo.diav23,
        "diav24": rotacionGrupo.diav24,
        "diav25": rotacionGrupo.diav25,
        "diav26": rotacionGrupo.diav26,
        "diav27": rotacionGrupo.diav27,
        "diav28": rotacionGrupo.diav28,
        "diav29": rotacionGrupo.diav29,
        "diav30": rotacionGrupo.diav30,
        "diav31": rotacionGrupo.diav31,
        "canlim": rotacionGrupo.canlim,
        "diaga1": rotacionGrupo.diaga1, 
        "diaga2": rotacionGrupo.diaga2,
        "diaga3": rotacionGrupo.diaga3,
        "diaga4": rotacionGrupo.diaga4,
        "diava1": rotacionGrupo.diaga1,
        "diava2": rotacionGrupo.diaga2,
        "diava3": rotacionGrupo.diaga3,
        "diava4": rotacionGrupo.diaga4
    };
    
    this.spinner.show();

    // Editar
    if ( this.isEdit ) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idGrupo, ...dataUpdate} = dataForm;
      this.grupoTrabajoService.updateRotacion(rotacionGrupo.congru, rotacionGrupo.idGrupo, rotacionGrupo.idEmpresa, rotacionGrupo.idNomina, dataUpdate)
        .subscribe({
          next: (resp) => {
            this.spinner.hide();
            this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
            this.onLoadEmit();
          },
          error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo actualizar la rotacion de grupo de trabajo.', life: 3000});
            this.onLoadEmit();
          } 
        });
      return;
    }

    // Crear conceptos
    this.grupoTrabajoService.createRotacion(rotacionGrupo.idEmpresa, rotacionGrupo.idNomina, dataForm)
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
   * @param rotacionGrupo: ConceptoSituacion row de la tabla
   * @returns void
   */
  onRowDelete(rotacionGrupo: any): void {    
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta de rotacion?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.grupoTrabajoService.deleteRotacion(rotacionGrupo.congru, rotacionGrupo.idGrupo, rotacionGrupo.idEmpresa, rotacionGrupo.idNomina)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.onLoadEmit();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la rotacion de grupo, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la rotacion de grupo.', life: 3000});
              return false;
            }
          });
      }
    });
  }

  /**
   * Cancelar edición del registro
   * @param dataRow: GrupoRotacion
   * @param index: number, indice del row
   */
  onRowEditCancel(dataRow: any, index: number): void {
    if( this.isAddNewRow ) { 
      this.table.value.splice(index, 1);
      // Redondear el número con el fin de posicionar la página correspondiente cuando se agrega una fila
      this.table.first = Math.floor(this.rotacionesGrupoTrabajo.length / this.rows) * this.rows;
      // Actualizar el total de los registros de la tabla.
      this.table.totalRecords = this.rotacionesGrupoTrabajo.length;
      this.isAddNewRow = false;
      return;
    }
    // Mantener registro original sin la modificacion del usuario
    this.rotacionesGrupoTrabajo[index] = this.clonedDataRow[dataRow.idTableTemporal];
    // Eliminar objeto clonado para limpiar variables
    delete this.clonedDataRow[dataRow.idTableTemporal];
    this.isEdit = false;
  }

  /**
   * Cargar data y restaurar banderas Edit y AddNewRow
   */
  onLoadEmit(): void {    
    this.onLoadData.emit(this.gruposTrabajoSelectRow);
    this.isEdit = false;
    this.isAddNewRow = false;
  }

}
