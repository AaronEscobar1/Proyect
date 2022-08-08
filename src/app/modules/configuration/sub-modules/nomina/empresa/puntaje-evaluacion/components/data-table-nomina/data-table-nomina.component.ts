import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TipoNomina } from '../../../grupo-trabajo/interfaces/nominas.interfaces';
import { PuntajeEvaluacionService } from '../../services/puntaje-evaluacion.service';

@Component({
  selector: 'app-data-table-nomina',
  templateUrl: './data-table-nomina.component.html',
  styleUrls: ['./data-table-nomina.component.scss']
})
export class DataTableNominaComponent implements OnInit {

  @Input() tiposNominas!: TipoNomina[];
  @Input() tab: string = 'consultar';

  // Table
  columns: TableHead[] = [];

  constructor(private puntajeEvaluacionService: PuntajeEvaluacionService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'tipnom', header: 'Código'      },
      { field: 'desnom', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.selectRowService.selectRowAlterno$.emit(event.data);
    // Limpiar variable observable de tabla puntaje de evaluacion
    this.puntajeEvaluacionService.selectRowPuntaje$.emit(null);
  }

  onRowUnselect(): void {
    this.selectRowService.selectRowAlterno$.emit(null);
    // Limpiar variable observable de tabla puntaje de evaluacion
    this.puntajeEvaluacionService.selectRowPuntaje$.emit(null);
  }

}
