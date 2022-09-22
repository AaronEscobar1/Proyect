import { Component, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { ClaseInformacion } from '../../../interfaces/clase-informacion.interfaces';
import { ClaseInformacionService } from '../../../services/clase-informacion.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-data-table-clase-info',
  templateUrl: './data-table-clase-info.component.html',
  styleUrls: ['./data-table-clase-info.component.scss']
})
export class DataTableClaseInfoComponent implements OnInit {

  // Objeto para mostrar en la tabla
  @Input() clasesInformacion: ClaseInformacion[] = [];

  // Table
  columns: TableHead[] = [];

  // Emision de evento para habilitar y deshabilitar botones
  @Output() onButtonDisabled = new EventEmitter();

  // Emision de evento para quitar selección del registro de tipo de información
  @Output() onUnSelectRow = new EventEmitter();

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private companyNominaService: CompanyNominaService,
              private claseInformacionService: ClaseInformacionService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'nmInformacionClaseTbId.id', header: 'Código'       },
      { field: 'nombre',                    header: 'Descripción'  },
      { field: 'equivalencia.nombre',       header: 'Equivalencia' }
    ];
  }

  onRowSelect(event: any): void {
    // Emitir valor para habilitar los botones
    this.onButtonDisabled.emit(false);
    // Emitir valor select de clase de información
    this.claseInformacionService.selectRowClaseInformacion$.emit(event.data);
    // Limpiar select de tipo de información
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Quitar selección del registro de denominacion
    this.onUnSelectRow.emit();
  }

  onRowUnselect(): void {
    // Emitir valor para deshabilitar los botones
    this.onButtonDisabled.emit(true);
    // Limpiar select de clase de información
    this.claseInformacionService.selectRowClaseInformacion$.emit(null);
    // Limpiar select de tipo de información
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Quitar selección del registro de denominacion
    this.onUnSelectRow.emit();
  }

}
