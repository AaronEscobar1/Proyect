import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { FactorConversion } from '../../interfaces/factor.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

   // Objeto para mostrar en la tabla
   @Input() factoresConversion: FactorConversion[] = [];

   // Table
   columns: TableHead[] = [];
 
   constructor(private companyNominaService: CompanyNominaService) { }
 
   ngOnInit(): void {
     this.columns = [
        { field: 'idMonOrigen',            header: 'Moneda origen'  },
        { field: 'cfMonedaOrigen.nombre',  header: 'por nombre'     },
        { field: 'fvigencia',              header: 'Vigencia'       },
        { field: 'idMonDestino',           header: 'Moneda destino' },
        { field: 'cfMonedaDestino.nombre', header: 'por nombre'     },
        { field: 'factconv',               header: 'Factor'         }
     ];
   }
 
   onRowSelect(event: any): void {
     this.companyNominaService.selectRowThirdTable$.emit(event.data);
   }
 
   onRowUnselect(): void {
     this.companyNominaService.selectRowThirdTable$.emit(null);
   }

}
