import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Institucion } from '../../../interfaces/instituciones.interfaces';
import { InstitucionPrograma, TipoPrograma } from '../../../interfaces/instituciones-programas.interfaces';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { SortEventOrder, TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { ProgramasInstitucionService } from '../../../services/programas-institucion.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Helpers } from 'src/app/shared/helpers/helpers';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-data-table-programas',
  templateUrl: './data-table-programas.component.html',
  styleUrls: ['./data-table-programas.component.scss']
})
export class DataTableProgramasComponent implements OnInit {

  // Variable seleccionada en el formulario editar
  @Input() institucionSelect!: Institucion | undefined;

  // Objeto para mostrar programas de depositos
  @Input() programasDepositos!: InstitucionPrograma[];

  // Objeto para tipos de programas
  @Input() tiposProgramas: TipoPrograma[] = [];

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
  clonedDataRow:  { [id: string]: InstitucionPrograma; } = {};

  // Emisión de eventos (loadData)
  @Output() onLoadData = new EventEmitter();

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  /**
   * Retorna los programasDepositos en un array
   * @Returns FormArray
   */
  get programasDepositosFormArray(): FormArray {
    return this.form.get("programasDepositos") as FormArray;
  }

  constructor(private programasInstitucionService: ProgramasInstitucionService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private changeDetectorRef: ChangeDetectorRef,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      programasDepositos: this.fb.array([]),
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
      { field: 'nombrePgm',                     header: 'Nombre'      },
      { field: 'nmTipoProgramaTb.descripcion',  header: 'Tipo'        },
      { field: 'descrip',                       header: 'Descripción' }
    ];
  }

  ngOnChanges(): void {
    if ( this.programasDepositos.length > 0 ) {
      this.programasDepositos.forEach((data, index) => {
        this.addControls();
        this.programasDepositosFormArray.controls[index].setValue(data);
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
    this.programasDepositosFormArray.push(this.newArrayControl());
    // Actualizar el total de los registros de la tabla
    this.table.totalRecords = this.programasDepositosFormArray.length;
  }

  /**
   * Establecer un nuevo array en el formulario con las validaciones necesarias
   * @returns FormGroup
   */
  newArrayControl(): FormGroup {
    return new FormGroup({
      // Colocar un id temporal en el registro para el [dataKey] de la tabla
      idTableTemporal: new FormControl(this.getIdTemporalMax()),
      // Valores para crear programa por empresa, codins y tipiCodtip
      idEmpresa:       new FormControl(this.institucionSelect?.idEmpresa),
      codins:          new FormControl(this.institucionSelect?.codins),
      tipiCodtip:      new FormControl(this.institucionSelect?.tipiCodtip),
      // Data necesaria para crear
      nombrePgm:       new FormControl(null, [ Validators.required, Validators.maxLength(10) ] ),
      nmTipoProgramaTb: this.fb.group({
        tippgm:        new FormControl(1, [ Validators.required ]),
        descripcion:   new FormControl(),
        usrcre:        new FormControl(),
        feccre:        new FormControl(),
        usract:        new FormControl(),
        fecact:        new FormControl(),
        primaryKey:    new FormControl(),
      }),
      descrip:         new FormControl(null, [ Validators.maxLength(256) ]),
    });
  }

  /**
   * Obtener el valor máximo del arreglo y retornar el siguiente valor.
   * @returns number
   */
  getIdTemporalMax(): number {
    return this.programasDepositosFormArray.value.length == 0 ? 0 : Math.max(...this.programasDepositosFormArray.value.map((data: InstitucionPrograma) => data.idTableTemporal + 1 ));
  }

  /**
   * Activar formulario del row
   * @param dataRow: FormGroup
   */
  onRowEditInit(dataRow: FormGroup): void {
    const value: InstitucionPrograma = dataRow.value;
    this.isEdit = true;
    // Deshabilitamos los campos que no se pueden editar
    dataRow.controls['nombrePgm'].disable();
    // Clonamos el registro para mantenerlo en memoria y tomar acciones si se guarda o cancela el registro
    this.clonedDataRow[value.idTableTemporal] = {...value};
  }

  /**
   * Crear y editar registros
   * @param institucionPrograma: InstitucionPrograma
   */
  onRowEditSave(institucionPrograma: InstitucionPrograma): void {
    // Destructuración de objeto mediante spread (ecmascript 6)
    const { idTableTemporal, ...dataCreate } = institucionPrograma;
    // return;
    this.spinner.show();

    // Editar
    if ( this.isEdit ) {
      // Destructuración de objeto mediante spread (ecmascript 6)
      const { idEmpresa, tipiCodtip, codins, nombrePgm, ...dataUpdate } = dataCreate;
      this.programasInstitucionService.update(institucionPrograma, dataUpdate)
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
    this.programasInstitucionService.create(institucionPrograma)
      .subscribe({
        next: (resp) => {
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
          this.onLoadEmit();
        },
        error: (err) => {
          if (err.error.detail.includes("ya existente") ) {
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear, programa ya existente.', life: 3000});
            this.onLoadEmit();
            return false;
          }
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el programa.', life: 3000});
          this.onLoadEmit();
          return false;
        }
      });
  }

  /**
   * Elimina un registro
   * @param institucionPrograma: InstitucionPrograma row de la tabla
   * @returns void
   */
  onRowDelete(institucionPrograma: InstitucionPrograma): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este programa?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.programasInstitucionService.delete(institucionPrograma)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.onLoadEmit();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el programa, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el programa.', life: 3000});
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
    dataRow.controls['nombrePgm'].enable();
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
    this.clearFormArray();
    this.onLoadData.emit();
    this.isEdit = false;
    this.isAddNewRow = false;
  }

  /**
   * Resetar el formArray con la finalidad que cuando vuelva a cargar la data no duplique los datos
   */
  clearFormArray() {
    this.isEdit = false;
    this.isAddNewRow = false;
    while (this.programasDepositosFormArray.length !== 0) {
      this.programasDepositosFormArray.removeAt(0)
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
