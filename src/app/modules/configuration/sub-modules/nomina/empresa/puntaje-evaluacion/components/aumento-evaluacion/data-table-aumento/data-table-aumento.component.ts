import { Component, OnInit, Input } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { AumentoEvaluacion } from '../../../interfaces/aumento-evaluacion.interfaces';
import { AumentoEvaluacionService } from '../../../services/aumento-evaluacion.service';

@Component({
  selector: 'app-data-table-aumento',
  templateUrl: './data-table-aumento.component.html',
  styleUrls: ['./data-table-aumento.component.scss']
})
export class DataTableAumentoComponent implements OnInit {

  // Objeto para mostrar los aumentos por evaluación en la tabla
  @Input() aumentoEvaluacion: AumentoEvaluacion[] = [];

  // Columnas de la table
  columns: TableHead[] = [];

  constructor(private aumentoEvaluacionService: AumentoEvaluacionService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'idConcepto',   header: 'Código concepto'   },
      { field: 'moncto',       header: 'Monto'             },
      { field: 'cancto',       header: 'Cantidad'          },
      { field: 'facsue',       header: 'Factor'            },
      { field: 'incsue',       header: 'Sueldo'            }
    ];
  }

  onRowSelect(event: any): void {
    this.aumentoEvaluacionService.selectRowAumento$.emit(event.data);
  }

  onRowUnselect(): void {
    this.aumentoEvaluacionService.selectRowAumento$.emit(null);
  }

}
