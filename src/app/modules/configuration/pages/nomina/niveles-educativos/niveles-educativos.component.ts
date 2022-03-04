import { Component, OnInit } from '@angular/core';
import { NivelesEducativosService } from '../../../services/niveles-educativos.service';
import { NivelesEducativos } from '../../../interfaces/niveles-educativos.interfaces';
import { TypesFile } from '../../../interfaces/typesFiles.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-niveles-educativos',
  templateUrl: './niveles-educativos.component.html',
  styleUrls: ['./niveles-educativos.component.scss']
})
export class NivelesEducativosComponent implements OnInit {

  nivelesForm!: FormGroup;
  niveles  : NivelesEducativos[] = [];
  typesFile: TypesFile[]         = [];
  loading  : boolean             = true;
  columns  : any[]               = [];

  // Modales
  addNivelModal  : boolean = false;
  printNivelModal: boolean = false;

  constructor(private nivelesServices: NivelesEducativosService,
              private formBuilder: FormBuilder) {
    this.nivelesForm = this.formBuilder.group({
      id: ['', [ Validators.required ]],
      name: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',   header: 'Código' },
      { field: 'name', header: 'Nombre' }
    ]
    this.typesFile = [
      { name: 'PDF',  code: 'PDF'  },
      { name: 'CSV',  code: 'CSV'  },
      { name: 'XML',  code: 'XML'  },
      { name: 'RFT',  code: 'RFT'  },
      { name: 'HTML', code: 'HTML' },
      { name: 'XLS',  code: 'XLS'  }
    ];
    this.loadData();
  }

  loadData(): void {
    this.nivelesServices.getNivelesAll().then(data => {
      this.niveles = data
      this.loading = false;
    });
  }

  showModalPrintDialog(): void {
    this.printNivelModal = true;
  }
  
  showModalAddDialog(): void {
    this.addNivelModal = true;
  }

  refresh(): void {
    this.niveles = [];
    setTimeout(() => {
      this.loadData();
    }, 500);
  }

  saveNivel(): void {
    this.niveles.push(this.nivelesForm.value);
    
    this.niveles = [...this.niveles];
    this.addNivelModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.nivelesForm.reset();
  }

}
