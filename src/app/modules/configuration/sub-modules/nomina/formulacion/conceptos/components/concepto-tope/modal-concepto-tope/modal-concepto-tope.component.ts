import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-concepto-tope',
  templateUrl: './modal-concepto-tope.component.html',
  styleUrls: ['./modal-concepto-tope.component.scss']
})
export class ModalConceptoTopeComponent implements OnInit {

  // Titulo del modal
  @Input() titleModal!: string;

  // Modal concepto tope
  @Input() modalConceptoTope: boolean = false;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModalTope  = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  save(): void {
    
  }

  closeModal(): void {
    this.onCloseModalTope.emit();
  }

}
