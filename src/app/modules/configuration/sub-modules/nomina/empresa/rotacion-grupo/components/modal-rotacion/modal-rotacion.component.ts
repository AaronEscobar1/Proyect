import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-rotacion',
  templateUrl: './modal-rotacion.component.html',
  styleUrls: ['./modal-rotacion.component.scss']
})
export class ModalRotacionComponent implements OnInit {

  // Titulo del modal
  @Input() titleModalRotacion!: string;

  // Banderas
  @Input() rotacionModal!: boolean;

  // Emisión de eventos (cerrar modal, cargar data)
  @Output() onCloseModal = new EventEmitter();

  // Formulario reactivo
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ });
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.onCloseModal.emit();
  }

  onSubmit(): void {
    console.log('Aceptar');
  }

}
