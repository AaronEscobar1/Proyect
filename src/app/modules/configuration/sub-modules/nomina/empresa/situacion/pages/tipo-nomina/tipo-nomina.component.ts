import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../shared-empresa/interfaces/nominas.interfaces';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SituacionService } from '../../services/situacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { Situacion } from '../../interfaces/situacion.interfaces';

@Component({
  selector: 'app-tipo-nomina',
  templateUrl: './tipo-nomina.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class TipoNominaComponent implements OnInit {

  // Fila seleccionada para filtrar los puntajes de evaluacion con tipo nomina
  @Input() empresaRow!: Company;

  // Fila seleccionada de tipos de nominas
  nominaRow!: TipoNomina | null;

  // Variable para obtener los tipos de nomina por empresa
  tiposNominas: TipoNomina[] = [];

  // Emisión de evento (cargar data de situación y rotacion de grupos)
  @Output() onGetDataSituacion     = new EventEmitter();
  @Output() onGetDataRotacionGrupo = new EventEmitter();

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private companyNominaService: CompanyNominaService,
              private situacionService: SituacionService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable tipo nomina
    this.subscriber = this.selectRowServices.selectRowAlterno$.subscribe( (row: TipoNomina) => {
      this.nominaRow = row;
      this.loadSituaciones();
    });
  }

  ngOnChanges(): void {
    // Realizar peticion al backend al seleccionar una empresa
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadNominas(this.empresaRow.id);
    } 
    // Vaciar los tipos de nominas cuando la empresa se deselecciona
    else if ( this.empresaRow == null ) {
      this.tiposNominas = []; 
    }
  }

  loadNominas( idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.companyNominaService.getAllNominasByEmpresa(idEmpresa)
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
   * Obtener las situaciones relacionadas con una empresa y tipo de nomina
   */
  loadSituaciones(isRefresh: boolean = false): void {
    if ( !this.nominaRow ) {
      return;
    }
    this.spinner.show(undefined, spinnerLight);
    this.situacionService.getAllSituacionesByEmpresaNomina(this.empresaRow.id, this.nominaRow.tipnom)
      .subscribe({
        next: (res: Situacion[]) => {
          this.onGetDataSituacion.emit(res);
          this.spinner.hide();
          // Realizar peticion al backend para buscar los grupos de rotacion cuando no es por metodo refresh
          if (!isRefresh) {
            // Vaciar lista de rotacion de grupos
            this.onGetDataRotacionGrupo.emit([]);
            this.loadRotacionGruposByEmpresaNomina();
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }
  
  /**
   * Cargar rotacion de grupos por empresa y nomina para el listado del formulario
   */
  loadRotacionGruposByEmpresaNomina(): void {
    if ( !this.nominaRow ) {
      return;
    }
    this.spinner.show(undefined, spinnerLight);
    this.companyNominaService.getAllRotacionGruposByEmpresaNomina(this.empresaRow.id, this.nominaRow.tipnom)
      .subscribe({
        next: (res) => {
          this.onGetDataRotacionGrupo.emit(res);
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
