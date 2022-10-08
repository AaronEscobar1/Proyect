import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AumentoEvaluacionService } from '../../../services/aumento-evaluacion.service';

@Component({
  selector: 'app-buttons-aumento',
  templateUrl: './buttons-aumento.component.html'
})
export class ButtonsAumentoComponent implements OnInit {

  // Habilitar y deshabilitar Todos los botones
  @Input() buttonDisabled: boolean = false;

  // Mostrar botones
  @Input() showRefreshButton: boolean = true;
  @Input() showPrintButton:   boolean = true;
  @Input() showCreateButton:  boolean = true;
  @Input() showUpdateButton:  boolean = true;
  @Input() showDeleteButton:  boolean = true;
  
  // Emision de eventos
  @Output() onRefresh         = new EventEmitter();
  @Output() onOpenModalPrint  = new EventEmitter();
  @Output() onOpenModalCreate = new EventEmitter();
  @Output() onEditRow         = new EventEmitter();
  @Output() onDeleteRow       = new EventEmitter();
  
  // Variable para seleccionar el registro
  selectRow!: any | null;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor( private aumentoEvaluacionService: AumentoEvaluacionService ) {
  }
  
  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.aumentoEvaluacionService.selectRowAumento$.subscribe( row => this.selectRow = row );
  }

  refresh(): void {
    this.onRefresh.emit();
  } 

  openModalPrint(): void {
    this.onOpenModalPrint.emit();
  }

  openModalCreate(): void {
    this.onOpenModalCreate.emit();
  }

  editSelectRow(): void {
    this.onEditRow.emit(this.selectRow);
  }

  deleteRow(): void {
    this.onDeleteRow.emit(this.selectRow);
  }

  /** Destrucción del observable */
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
