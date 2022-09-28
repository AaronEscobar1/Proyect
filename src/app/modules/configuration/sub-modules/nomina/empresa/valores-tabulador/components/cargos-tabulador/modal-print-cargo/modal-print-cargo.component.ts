import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';

@Component({
  selector: 'app-modal-print-cargo',
  templateUrl: './modal-print-cargo.component.html'
})
export class ModalPrintCargoComponent implements OnInit {

  // Ver modal
  @Input() printModal!: boolean;

  // Emisión de eventos (cerrar)
  @Output() onCloseModalPrint = new EventEmitter();

  // Formulario
  form!: FormGroup;

  // Objeto
  typesFile: TypesFile[] = typesFileData;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      type: [],
      id: [''],
      des: ['']
    });
  }

  ngOnInit(): void {
  }

  export() {
  }

  resetForm(): void {
    this.form.reset();
  }

  closeModalPrint(): void {
    this.resetForm();
    this.onCloseModalPrint.emit();
  }

}
