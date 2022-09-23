import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { TipoInstitucion } from '../../../instituciones/interfaces/instituciones.interfaces';
import { EquivalenciasService } from '../../services/equivalencias.service';

@Component({
  selector: 'app-data-table-tipo-institucion',
  templateUrl: './data-table-tipo-institucion.component.html',
  styleUrls: ['./data-table-tipo-institucion.component.scss']
})
export class DataTableTipoInstitucionComponent implements OnInit {

  // Objeto para mostrar tipos instituciones
  @Input() tiposInstituciones: TipoInstitucion[] = [];

  // Table
  columns: TableHead[] = [];
  
  // Emision de evento para habilitar y deshabilitar botones
  @Output() onButtonDisabled = new EventEmitter();
  
  // Emision de evento para quitar selección del registro de instituciones
  @Output() onUnSelectRow = new EventEmitter();
  
  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private companyNominaService: CompanyNominaService,
              private equivalenciasService: EquivalenciasService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codtip', header: 'Código'      },
      { field: 'destip', header: 'Descripción' },
    ];
  }

  onRowSelect(event: any): void {
    // Emitir valor select de Tipo de instituciones
    this.equivalenciasService.selectRowTipoInstitucion$.emit(event.data);
    // Limpiar select de equivalencia
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Quitar selección del registro de instituciones y equivalencias
    this.onUnSelectRow.emit();
  }

  onRowUnselect(): void {
    // Limpiar select de Tipo de instituciones
    this.equivalenciasService.selectRowTipoInstitucion$.emit(null);
    // Limpiar select de equivalencia
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Quitar selección del registro de instituciones y equivalencias
    this.onUnSelectRow.emit();
  }

}
