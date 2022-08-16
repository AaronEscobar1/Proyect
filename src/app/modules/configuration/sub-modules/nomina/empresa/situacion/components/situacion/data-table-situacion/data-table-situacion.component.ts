import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { Situacion } from '../../../interfaces/situacion.interfaces';
import { ModalConceptosComponent } from '../../conceptos-situacion/modal-conceptos/modal-conceptos.component';

@Component({
  selector: 'app-data-table-situacion',
  templateUrl: './data-table-situacion.component.html',
  styleUrls: ['./data-table-situacion.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class DataTableSituacionComponent implements OnInit {

  // Objeto para mostrar todos las situaciones por empresa y tipo nomina
  @Input() situaciones: Situacion[] = [];

  // Objeto de estatus vacaciones para filtrar en tabla
  @Input() estatusVacacionesFilter: dropdownType[] = [];
  
  // Objeto de esquemas de trabajo para filtrar en tabla
  @Input() esquemasTrabajoFilter: dropdownType[] = [];

  // Objeto de clases situaciones para filtrar en tabla
  @Input() claseSituacionesFilter: dropdownType[] = [];

  // Table
  columns: TableHead[] = [];

  // Variable para seleccionar el registro de la tabla
  situacionSelectRow!: Situacion | null;

  // Variable para abrir el data table de conceptos
  dataTableModal: boolean = false;

  // Emisión de evento de padre a hijo (cargar data de conceptos por situación)
  @ViewChild(ModalConceptosComponent) conceptosComponent!: ModalConceptosComponent;

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codsta',                          header: 'Código'        },
      { field: 'dessta',                          header: 'Descripción'   },
      { field: 'nmVacacionStatusTb.vacsta',       header: 'Vacación'      },
      { field: 'idGrupo',                         header: 'Grupo'         },
      { field: 'idRotacion',                      header: 'Cons.'         },
      { field: 'nmTipoEsquTrabCalcVacaTb.conesq', header: 'Esquema'       },
      { field: 'cfClaseSituacionTb.clasta',       header: 'Clasificación' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
    this.situacionSelectRow = event.data;
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
    this.situacionSelectRow = null;
  }

  /**
   * Mostrar modal de conceptos por situación
   */
  showConceptosModal(): void {
    if ( this.situacionSelectRow ) {
      this.dataTableModal = true;
      this.conceptosComponent.loadConceptosSituacion(this.situacionSelectRow);
    }
  }

  /**
   * Cerrar modal de conceptos por situación
   */
  closeDataTableModal(): void {
    this.dataTableModal = false;
  }

}
