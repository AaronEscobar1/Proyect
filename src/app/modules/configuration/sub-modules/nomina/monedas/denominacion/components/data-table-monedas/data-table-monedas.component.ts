import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { TipoMoneda } from '../../../tipos-monedas/interfaces/tipo-moneda.interfaces';
import { DenominacionService } from '../../services/denominacion.service';
import { Table } from 'primeng/table';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table-monedas',
  templateUrl: './data-table-monedas.component.html',
  styleUrls: ['./data-table-monedas.component.scss']
})
export class DataTableMonedasComponent implements OnInit {

  // Objeto para mostrar todos los tipos de monedas
  @Input() tiposMonedas: TipoMoneda[] = [];

  // Table
  columns: TableHead[] = [];
  
  // Emision de evento para habilitar y deshabilitar botones
  @Output() onButtonDisabled = new EventEmitter();
  
  // Emision de evento para quitar selección del registro de denominacion
  @Output() onUnSelectRow = new EventEmitter();
  
  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private companyNominaService: CompanyNominaService,
              private denominacionService: DenominacionService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',        header: 'Código'      },
      { field: 'nombre',    header: 'Descripción' },
      { field: 'simbolo',   header: 'Simbolo'     }
    ];
  }

  onRowSelect(event: any): void {
    // Emitir valor para habilitar los botones
    this.onButtonDisabled.emit(false);
    // Emitir valor select de Tipo de moneda
    this.denominacionService.selectRowTipoMoneda$.emit(event.data);
    // Limpiar select de denominaciones
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Quitar selección del registro de denominacion
    this.onUnSelectRow.emit();
  }

  onRowUnselect(): void {
    // Emitir valor para deshabilitar los botones
    this.onButtonDisabled.emit(true);
    // Limpiar select de Tipo de moneda
    this.denominacionService.selectRowTipoMoneda$.emit(null);
    // Limpiar select de denominaciones
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Quitar selección del registro de denominacion
    this.onUnSelectRow.emit();
  }

}
