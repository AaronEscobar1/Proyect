import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';

@Component({
  selector: 'app-modal-print',
  templateUrl: './modal-print.component.html',
})
export class ModalPrintComponent implements OnInit {

  // Ver modal
  @Input() printNivelModal!: boolean;

  // Emisión de eventos (cerrar)
  @Output() onCloseModalPrint  = new EventEmitter();

  // Formulario
  form!: FormGroup

  // Objeto
  typesFile: TypesFile[] = typesFileData;

  constructor(private nivelesServices: NivelesEducativosService, 
              private fb: FormBuilder,
              private selectRowService: SelectRowService) { 
    this.form = this.fb.group({
      type: [],
      id: [''],
      des: ['']
    });
  }

  ngOnInit(): void {
  }

  exportPdf() {
    // Obtener formulario
    const data = this.form.getRawValue();
    console.log(data);
    this.resetForm();
  }

  resetForm(): void {
    this.form.reset();
  }

  closeModalPrint(): void {
    this.form.reset();
    this.onCloseModalPrint.emit();
  }

}
