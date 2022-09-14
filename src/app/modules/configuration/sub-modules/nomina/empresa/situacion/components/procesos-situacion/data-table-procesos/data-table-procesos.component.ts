import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProcesoSituacionService } from '../../../services/proceso-situacion.service';
import { SuspencionVacacion } from '../../../interfaces/concepto-situacion.interfaces';
import { SortEventOrder, TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { ProcesoSituacion } from '../../../interfaces/proceso-situacion.interfaces';
import { Situacion } from '../../../interfaces/situacion.interfaces';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { Procesos } from '../../../../../basica/procesos/interfaces/procesos.interfaces';
import { ObjectEventChange } from 'src/app/shared/interfaces/country-entity.interfaces';

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

  // Objeto para mostrar lista de procesos
  @Input() procesos: Procesos[] = [];

  // Objeto para mostrar lista de noSuspender
  @Input() noSuspender: SuspencionVacacion[] = [];

  // Objeto para sub procesos
  subProcesos!: any[];

  // Formulario reactivo
  form!: FormGroup;

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

  // Emisión de eventos (loadData)
  @Output() onLoadData = new EventEmitter();

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  /**
   * Retorna los procesos en un array
   * @Returns FormArray
   */
  get procesosFormArray(): FormArray {
    return this.form.get("procesos") as FormArray;
  }
  
  constructor(private procesosSituacionService: ProcesoSituacionService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private changeDetectorRef: ChangeDetectorRef,
              private helpers: Helpers) {
    this.form = this.fb.group({
      procesos: this.fb.array([]),
    });
  }
  
  /**
   * Método de Angular para comprobar expresiones y deteccion de cambios en la vista antes cambiar valores
   */
  ngAfterContentChecked() {
    // Eliminar errores de [ExpressionChangedAfterItHasBeenCheckedError]
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.columns = [
      { field: 'procTippro',  header: 'Procesos'     },
      { field: 'tipsub',      header: 'Sub proceso'  },
      { field: 'dialim',      header: 'Días'         },
      { field: 'tipsub',      header: 'No suspender' },
    ];
  }

  ngOnChanges(): void {
    if ( this.procesosSituaciones.length > 0 ) {
      this.procesosSituaciones.forEach((data, index) => {
        this.addControls();
        // Agregar la descripcion del proceso
        const procesoString = this.procesos.find(value => value.tippro == data.procTippro);
        data = { ...data, procesoString: procesoString?.nompro};
        this.procesosFormArray.controls[index].setValue(data);
      });
    }
  }

  /**
   * Agregar una nueva fila vacia con valores por defecto en la tabla prime ng
   */
  addNewRow() {
    this.isAddNewRow = true;
    // Crear un nuevo form control en el array
    const newDataRow = this.newArrayControl();
    // Deshabilitar el control del subproceso
    newDataRow.controls['tipsub'].disable();
    // Redondear el número con el fin de posicionar la página correspondiente cuando se agrega una fila
    this.table.first = Math.floor(this.table.value.length / this.rows) * this.rows;
    // Actualizar el total de los registros de la tabla con la nueva fila agregada.
    this.table.totalRecords = this.table.value.length + 1;
    // Agregar un nuevo objeto a los valores de la tabla
    this.table.value.push(newDataRow);
    // Iniciar la edición para agregar el registro ( Se arma un nuevo objeto [controls] para el dataKey de la tabla de primeNg)
    this.table.initRowEdit({ ...newDataRow.value, controls: { idTableTemporal: { value: newDataRow.value.idTableTemporal } }});
    // Reiniciar la cantidad de rows que pueden ver en la tabla cuando se crea una nueva fila
    this.table._rows = this.rows;
  }

  /**
   * Añadir el control al formulario
   */
  addControls(): void {
    this.form.markAllAsTouched();
    this.procesosFormArray.push(this.newArrayControl());
    // Actualizar el total de los registros de la tabla
    this.table.totalRecords = this.procesosFormArray.length;
  }

  /**
   * Establecer un nuevo array en el formulario con las validaciones necesarias
   * @returns FormGroup
   */
  newArrayControl(): FormGroup {
    return new FormGroup({
      // Colocar un id temporal en el registro para el [dataKey] de la tabla
      idTableTemporal: new FormControl(this.getIdTemporalMax()),
      // Valores para crear concepto por empresa, nomina y situacion
      idEmpresa:       new FormControl(this.situacionRow?.idEmpresa),
      idNomina:        new FormControl(this.situacionRow?.idNomina),
      statCodsta:      new FormControl(this.situacionRow?.codsta),
      procesoString:   new FormControl(null),
      // Data necesaria para crear
      procTippro:      new FormControl(null, [ Validators.required, Validators.maxLength(2) ] ),
      tipsub:          new FormControl(null, [ Validators.required, Validators.pattern('[0-9]{1,1}') ] ),
      dialim:          new FormControl(null, [ Validators.required, Validators.pattern('[0-9]{1,3}')] ),
      susvac:          new FormControl(0,    [ Validators.required ] )
    });
  }

  /**
   * Obtener el valor máximo del arreglo y retornar el siguiente valor.
   * @returns number
   */
  getIdTemporalMax(): number {
    return this.procesosFormArray.value.length == 0 ? 0 : Math.max(...this.procesosFormArray.value.map((data: ProcesoSituacion) => data.idTableTemporal + 1 ));
  }

  
  /**
   * Asigna el proceso seleccionado en el campo que se muestra en el formulario y
   * realiza petición al backend para buscar los subprocesos relacionadas con el proceso
   * @param event: ObjectEventChange: valor seleccionado
   * @param index: number: indice del proceso
   * @returns void
   */
  procesoSelectChange(event: ObjectEventChange, index: number): void {
    const codProceso = event.value;
    if (codProceso == null) { return; }
    // Obtener el formGroup del proceso 
    const procesoFormGroup = this.procesosFormArray.controls[index] as FormGroup;
    // Buscar la descripcion del proceso
    const proceso = this.procesos.find(value => value.tippro == codProceso);
    // Asignar la descripcion del proceso en el formulario
    procesoFormGroup.controls['procesoString'].reset(proceso?.nompro);
    // Limpiamos el campo subProceso
    this.clearSubProcesoSelect(index);
    // Peticion al backend para buscar los subProcesos
    this.loadSubProcesosByProceso(codProceso, index);
  }

  /**
   * Limpia la lista de los subprocesos
   * @param index: number: indice del proceso
   */
  clearSubProcesoSelect(index: number) {
    this.subProcesos = [];
    // Obtener el formGroup del proceso 
    const procesoFormGroup = this.procesosFormArray.controls[index] as FormGroup;
    // Limpiar el control del subproceso
    procesoFormGroup.controls['tipsub'].reset();
  }

  /**
   * Cargar subprocesos relacionadas con el proceso
   * @param codProceso: number codigo proceso a buscar
   */
  loadSubProcesosByProceso(codProceso: number, index: number) {
    this.subProcesos = [
      { value: 1, label: 1 },
      { value: 2, label: 2 }
    ];
    // TODO: Pasar este codigo cuando se realice la peticion al backend
      // Obtener el formGroup del proceso 
      const procesoFormGroup = this.procesosFormArray.controls[index] as FormGroup;
      // Habilitar el control del subproceso
      procesoFormGroup.controls['tipsub'].enable();
    // this.spinner.show();
    // this.procesosSituacionService.getSubProcesosByProceso(codProceso)
    //   .subscribe({
    //     next: (resp) => {
    //       this.subProcesos = resp;
          
    //       this.spinner.hide();
    //     },
    //     error: (err) => {
    //       this.spinner.hide();
    //       this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
    //     }
    //   });
  }

  /**
   * Activar formulario del row
   * @param dataRow: FormGroup
   */
  onRowEditInit(dataRow: FormGroup): void {
    const values: ProcesoSituacion = dataRow.value;
    this.isEdit = true;
    // Deshabilitamos los campos que no se pueden editar
    dataRow.controls['procTippro'].disable();
    dataRow.controls['tipsub'].disable();
    // Clonamos el registro para mantenerlo en memoria y tomar acciones si se guarda o cancela el registro
    this.clonedDataRow[values.idTableTemporal] = {...values};
  }

  /**
   * Crear y editar registros
   * @param procesoSituacion: ProcesoSituacion
   */
  onRowEditSave(procesoSituacion: ProcesoSituacion): void {

    // Destructuración de objeto mediante spread (ecmascript 6)
    const { idTableTemporal, ...dataCreate } = procesoSituacion;

    this.spinner.show();

    // Editar
    if ( this.isEdit ) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idEmpresa, idNomina, procTippro, statCodsta, tipsub, ...dataUpdate } = dataCreate;
      this.procesosSituacionService.update(procesoSituacion, dataUpdate)
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
    this.procesosSituacionService.create(procesoSituacion, dataCreate)
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
   * @param procesoSituacion: ProcesoSituacion row de la tabla
   * @returns void
   */
  onRowDelete(procesoSituacion: ProcesoSituacion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este concepto de situación?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.procesosSituacionService.delete(procesoSituacion)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.onLoadEmit();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el proceso de situación, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el proceso de situación.', life: 3000});
              return false;
            }
          });
      }
    });
  }

  /**
   * Cancelar edición del registro
   * @param dataRow: FormGroup
   * @param index: number, indice del row
   */
  onRowEditCancel(dataRow: FormGroup, index: number): void {
    if( this.isAddNewRow ) { 
      this.table.value.splice(index, 1);
      // Redondear el número con el fin de posicionar la página correspondiente cuando se agrega una fila
      this.table.first = Math.floor(this.table.value.length / this.rows) * this.rows;
      // Actualizar el total de los registros de la tabla.
      this.table.totalRecords = this.table.value.length;
      this.isAddNewRow = false;
      return;
    }
    // Habilitamos nuevamente los campos
    dataRow.controls['procTippro'].enable();
    dataRow.controls['tipsub'].enable();
    // Mantener registro original sin la modificacion del usuario
    dataRow.reset(this.clonedDataRow[dataRow.getRawValue().idTableTemporal]);
    // Eliminar objeto clonado para limpiar variables
    delete this.clonedDataRow[dataRow.getRawValue().idTableTemporal];
    this.isEdit = false;
  }

  /**
   * Cargar data, resetear formArray y restaurar banderas Edit y AddNewRow
   */
  onLoadEmit(): void {
    this.clearFormArray(this.procesosFormArray);
    this.onLoadData.emit(this.situacionRow);
    this.isEdit = false;
    this.isAddNewRow = false;
  }

  /**
   * Resetar el formArray con la finalidad que cuando vuelva a cargar la data no duplique los datos
   * @param formArray: FormArray
   */
  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  
  /*
   * VALIDACIONES DEL FORMULARIO REACTIVO
   * @param form: FormControl, evaluar el control del campo
   * @returns: boolean
   */
  campoInvalid(form: FormControl): boolean {
    return form.errors && form.touched || form.dirty && form.status == 'INVALID';
  }

  /**
   * Método para ordenar de manera ascendente y descendente los datos en la tabla usando formulario reactivos
   * @param event: SortEventOrder
   */
  customSort(event: SortEventOrder): void {
    this.helpers.customSort(event);
  }

}
