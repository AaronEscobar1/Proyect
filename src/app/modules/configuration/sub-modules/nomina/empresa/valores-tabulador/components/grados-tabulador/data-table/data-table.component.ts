import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { Grados } from '../../../interfaces/grados-tabuladores.interfaces';
import { GradosTabuladorService } from '../../../services/grados-tabulador.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  // Objeto para mostrar en la tabla
  @Input() gradosTabulador!: Grados[];

  // Table
  columns: TableHead[] = [];

  // Emision de evento para habilitar y deshabilitar botones
  @Output() onButtonDisabled = new EventEmitter();

  // Emision de evento para quitar selección del registro de tipo de información
  @Output() onUnSelectRow = new EventEmitter();
  
  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private companyNominaService: CompanyNominaService,
              private gradosTabuladorService: GradosTabuladorService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'eoGradoTbId.id', header: 'Código'      },
      { field: 'descrip',        header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    // Emitir valor para habilitar los botones
    this.onButtonDisabled.emit(false);
    // Emitir valor select de grados tabulador
    this.gradosTabuladorService.selectRowGrado$.emit(event.data);
    // Limpiar select de tipo de información
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Quitar selección del registro de denominacion
    this.onUnSelectRow.emit();
  }

  onRowUnselect(): void {
    // Emitir valor para deshabilitar los botones
    this.onButtonDisabled.emit(true);
    // Limpiar select de grados tabulador
    this.gradosTabuladorService.selectRowGrado$.emit(null);
    // Limpiar select de tipo de información
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Quitar selección del registro de denominacion
    this.onUnSelectRow.emit();
  }
  
}
