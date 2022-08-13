import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConceptoSituacion } from '../../../interfaces/concepto-situacion.interfaces';
import { Situacion } from '../../../interfaces/situacion.interfaces';
import { ConceptoSituacionService } from '../../../services/concepto-situacion.service';

@Component({
  selector: 'app-modal-conceptos',
  templateUrl: './modal-conceptos.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ModalConceptosComponent implements OnInit {

  // Titulo del modal
  title: string = 'Conceptos a desactivar por situación';

  // Objeto de conceptos de situacion
  conceptoSituacion: ConceptoSituacion[] = [];

  // Ver modal
  @Input() dataTableModal!: boolean;

  // Emisión de eventos (cerrar)
  @Output() onCloseDataTableModal = new EventEmitter();

  constructor(private conceptoSituacionService: ConceptoSituacionService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  loadConceptosSituacion(situacion: Situacion): void {
    this.spinner.show();
    this.conceptoSituacionService.getAllConceptosSituacion(situacion)
      .subscribe({
        next: (res) => {
          this.conceptoSituacion = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseDataTableModal.emit();
  }

}
