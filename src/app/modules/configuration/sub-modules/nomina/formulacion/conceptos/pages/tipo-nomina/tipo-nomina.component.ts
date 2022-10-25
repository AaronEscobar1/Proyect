import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Subscription } from 'rxjs';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { ConceptosService } from '../../services/conceptos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { Concepto } from '../../interfaces/concepto.interfaces';

@Component({
  selector: 'app-tipo-nomina',
  templateUrl: './tipo-nomina.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class TipoNominaComponent implements OnInit {

  // Fila seleccionada para filtrar los conceptos con tipo nomina
  @Input() empresaRow!: Company;

  // Fila seleccionada de tipos de nominas
  tipoNominaRow!: TipoNomina | null;

  // Variable para obtener los tipos de nomina por empresa
  tiposNominas: TipoNomina[] = [];

  // Emisión de evento (cargar data de conceptos)
  @Output() onGetDataConceptos = new EventEmitter();

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private companyNominaService: CompanyNominaService,
              private conceptosService: ConceptosService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    // TODO: Quitar cuando se termine el desarrollo
    this.loadConceptos();
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable tipo nomina
    this.subscriber = this.selectRowServices.selectRowAlterno$.subscribe( (row: TipoNomina) => {
      this.tipoNominaRow = row;
      this.loadConceptos();
    });
  }

  ngOnChanges(): void {
    // Realizar peticion al backend al seleccionar una empresa
    if ( this.empresaRow && this.empresaRow.id ) {
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
   * Obtener los conceptos relacionadas con una empresa y un tipo de nomina
   */
  loadConceptos(): void {
    // TODO: Descomentar cuando se termine el desarrollo
    // if ( !this.tipoNominaRow ) {
    //   return;
    // }
    this.spinner.show(undefined, spinnerLight);
    // TODO: Reemplazar linea 88 por la 87 cuando se termine el desarrollo
    // this.conceptosService.getAllConceptosByEmpresaNomina(this.empresaRow.id, this.tipoNominaRow.tipnom)
    this.conceptosService.getAllConceptosByEmpresaNomina("93", "0001")
      .subscribe({
        next: (res: Concepto[]) => {
          this.onGetDataConceptos.emit(res);
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /** Destrucción del observable */
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
