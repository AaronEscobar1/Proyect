import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';

@Component({
  selector: 'app-modal-print',
  templateUrl: './modal-print.component.html',
  styles: [
  ]
})
export class ModalPrintComponent implements OnInit {

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
    console.log(this.form.value);
  }

  resetForm(): void {
    this.form.reset();
  }

  closeModalPrint(): void {
    this.resetForm();
    this.onCloseModalPrint.emit();
  }

}
