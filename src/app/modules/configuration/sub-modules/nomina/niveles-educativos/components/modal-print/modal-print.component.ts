import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypesFile } from 'src/app/shared/interfaces/typesFiles.interfaces';
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
  typesFile: TypesFile[] = [];

  constructor(private nivelesServices: NivelesEducativosService, 
              private fb: FormBuilder) { 
    this.form = this.fb.group({
      codniv: ['', [ Validators.required, Validators.pattern('[1-9]'), Validators.maxLength(1)]],
      desniv: ['', [ Validators.required, Validators.maxLength(30)]],
      type: ['', [ Validators.maxLength(3) ]]
    });
  }

  ngOnInit(): void {
    this.typesFile = [
      { name: 'PDF',  code: 'PDF'  },
      { name: 'CSV',  code: 'CSV'  },
      { name: 'XML',  code: 'XML'  },
      { name: 'RFT',  code: 'RFT'  },
      { name: 'HTML', code: 'HTML' },
      { name: 'XLS',  code: 'XLS'  }
    ];
  }

  exportPdf() {
    // Obtener formulario
    const data = this.form.getRawValue();
    console.log(data);
    this.nivelesServices.selectRow$.emit(null);
    this.resetForm();
  }

  resetForm(): void {
    this.form.reset();
  }

  closeModalPrint(): void {
    this.form.reset();
    this.onCloseModalPrint.emit();
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid( campo: string ) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

}
