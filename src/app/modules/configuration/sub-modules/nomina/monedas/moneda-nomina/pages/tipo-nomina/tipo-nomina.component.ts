import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Subscription } from 'rxjs';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { MonedaNominaService } from '../../services/moneda-nomina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';

@Component({
  selector: 'app-tipo-nomina',
  templateUrl: './tipo-nomina.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class TipoNominaComponent implements OnInit {

  // Fila seleccionada para filtrar monedas nóminas por empresa
  @Input() empresaRow!: Company;

  // Variable para obtener las nomina por empresa
  tiposNominas: TipoNomina[] = [];

  // Variable seleccionada de nomina
  tipoNominaRow!: TipoNomina | null;

  // Emisión de evento (cargar data monedas nóminas)
  @Output() onGetDataGrupo = new EventEmitter();

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private companyNominaService: CompanyNominaService,
              private monedaNominaService: MonedaNominaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable tipo nomina
    this.subscriber = this.selectRowServices.selectRowAlterno$.subscribe( (row: TipoNomina) => {
      this.tipoNominaRow = row;
      this.loadMonedasNominas();
    });
  }

  ngOnChanges(): void {
    // Realizar peticion al backend al seleccionar una empresa
    if ( this.empresaRow && this.empresaRow.id) {
      this.loadNominas(this.empresaRow.id);
    } 
    // Vaciar los tipos de nomninas cuando la empresa se deselecciona
    else if ( this.empresaRow == null ) {
      this.tiposNominas = []; 
    }
  }

  loadNominas(id: string): void {
    this.spinner.show(undefined, spinnerLight);
    this.companyNominaService.getAllNominasByEmpresa(id)
      .subscribe({
        next: (res: TipoNomina[]) => {
          this.tiposNominas = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Obtener monedas nóminas relacionadas con una empresa y un tipo de nomina
   */
  loadMonedasNominas(): void {
    console.log('load monedas');
    if ( !this.tipoNominaRow ) {
      return;
    }
    // this.spinner.show(undefined, spinnerLight);
    // this.puntajeEvaluacionService.getAllPuntajesByEmpresaNomina(this.empresaRow.id, this.tipoNominaRow.tipnom)
    //   .subscribe({
    //     next: (res: PuntajeEvaluacion[]) => {
    //       this.onGetDataGrupo.emit(res);
    //       this.spinner.hide();
    //     },
    //     error: (err) => {
    //       this.spinner.hide();
    //       this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
    //     }
    //   });
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
