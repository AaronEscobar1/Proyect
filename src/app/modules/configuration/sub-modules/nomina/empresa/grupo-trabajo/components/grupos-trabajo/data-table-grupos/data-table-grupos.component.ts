import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GrupoTrabajo } from '../../../interfaces/grupo-trabajo.interfaces';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { ModalRotacionComponent } from '../../rotacion-grupos/modal-rotacion/modal-rotacion.component';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../shared-empresa/interfaces/nominas.interfaces';

@Component({
  selector: 'app-data-table-grupos',
  templateUrl: './data-table-grupos.component.html',
  styleUrls: ['./data-table-grupos.component.scss']
})
export class DataTableGruposComponent implements OnInit {

  // Objeto para mostrar todos los grupos de trabajo por empresa y tipo nomina
  @Input() gruposTrabajo: GrupoTrabajo[] = [];
  
  // Objeto para dar la nomina a la peticion de Rotaciones
  @Input() nominaRow!: TipoNomina;

  // Variable para seleccionar el registro de la tabla
  gruposTrabajoSelectRow!: GrupoTrabajo | null;

  // Variable para abrir el data table de rotaciones
  dataTableRotacionesModal: boolean = false;

  // Table
  columns: TableHead[] = [];

  // Filtro dropdown
  diaLaborableFilter: dropdownType[] = [];

  // Emisión de evento de padre a hijo (cargar data de rotaciones por grupo trabajo)
  @ViewChild(ModalRotacionComponent) rotacionComponent!: ModalRotacionComponent;

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codgru',                  header: 'Código'       },
      { field: 'desgru',                  header: 'Descripción'  },
      { field: 'tipoJornada.descripcion', header: 'Tipo jornada' }
    ];
    // Objeto para filtrar los dias laborables en la tabla
    this.diaLaborableFilter = [
      { label: 'Todos',     value: ''  },
      { label: 'Si labora', value: '1' },
      { label: 'No labora', value: '0' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
    this.gruposTrabajoSelectRow = event.data;
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
    this.gruposTrabajoSelectRow = null;
  }

  /**
   * Mostrar modal de conceptos por situación
   */
  showRotacionModal(): void {
    if ( this.gruposTrabajoSelectRow ) {
      this.dataTableRotacionesModal = true;
      this.rotacionComponent.loadRotacion(this.gruposTrabajoSelectRow, this.nominaRow);
    }
  }

}
