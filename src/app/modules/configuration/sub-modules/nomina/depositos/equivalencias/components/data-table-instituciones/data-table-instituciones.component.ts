import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { Table } from 'primeng/table';
import { Institucion } from '../../../instituciones/interfaces/instituciones.interfaces';
import { EquivalenciasService } from '../../services/equivalencias.service';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table-instituciones',
  templateUrl: './data-table-instituciones.component.html',
  styleUrls: ['./data-table-instituciones.component.scss']
})
export class DataTableInstitucionesComponent implements OnInit {

  // Objeto para mostrar todos las instituciones por empresa y tipo institución
  @Input() instituciones: Institucion[] = [];

  // Table
  columns: TableHead[] = [];
  
  // Emision de evento para habilitar y deshabilitar botones
  @Output() onButtonDisabled = new EventEmitter();
  
  // Emision de evento para quitar selección del registro de equivalencia
  @Output() onUnSelectRow = new EventEmitter();

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private companyNominaService: CompanyNominaService,
              private equivalenciasService: EquivalenciasService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codins', header: 'Código'      },
      { field: 'desins', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    // Emitir valor para habilitar los botones
    this.onButtonDisabled.emit(false);
    // Emitir valor select de instituciones
    this.equivalenciasService.selectRowInstitucion$.emit(event.data);
    // Limpiar select de equivalencia
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Quitar selección del registro de equivalencia
    this.onUnSelectRow.emit();
  }

  onRowUnselect(): void {
    // Emitir valor para deshabilitar los botones
    this.onButtonDisabled.emit(true);
    // Limpiar select de instituciones
    this.equivalenciasService.selectRowInstitucion$.emit(null);
    // Limpiar select de equivalencia
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Quitar selección del registro de equivalencia
    this.onUnSelectRow.emit();
  }

}
