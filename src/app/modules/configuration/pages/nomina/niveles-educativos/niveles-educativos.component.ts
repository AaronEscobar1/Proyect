import { Component, OnInit } from '@angular/core';
import { NivelesEducativosService } from '../../../services/niveles-educativos.service';
import { NivelesEducativos } from '../../../interfaces/niveles-educativos.interfaces';
import { TypesFile } from '../../../interfaces/typesFiles.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-niveles-educativos',
  templateUrl: './niveles-educativos.component.html',
  styleUrls: ['./niveles-educativos.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class NivelesEducativosComponent implements OnInit {

  nivelesForm!: FormGroup;
  niveles     : NivelesEducativos[] = [];
  typesFile   : TypesFile[] = [];
  isEdit      : boolean = false;  

  //Tabla
  loading       : boolean             = true;
  columns       : any[]               = [];
  selectNivel!  : NivelesEducativos | null;

  // Modales
  addNivelModal  : boolean = false;
  printNivelModal: boolean = false;

  constructor(private nivelesServices: NivelesEducativosService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
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
    if (this.isEdit) {
      this.niveles[this.findIndexById(this.nivelesForm.value.id)] = this.nivelesForm.value;
      this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Nivel educacional actualizado.', life: 3000});
    } else {
      this.niveles.push(this.nivelesForm.value);
      this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Nivel educacional creado.', life: 3000});
    }
    this.niveles = [...this.niveles];
    this.addNivelModal = false;
    this.isEdit = false;
    this.selectNivel = null;
    this.resetForm();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.niveles.length; i++) {
        if (this.niveles[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
  } 

  editSelectNivel() {
    this.isEdit = true;
    const nivel = this.selectNivel ? this.selectNivel : '';
    if (!nivel) {
      return;
    }
    this.nivelesForm.setValue(nivel);
    this.addNivelModal = true;
  }
 
  deleteSelectedNivel() {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el nivel <b>${this.selectNivel?.name}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
          this.niveles = this.niveles.filter(val => val.id !== this.selectNivel?.id);
          this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Nivel educacional eliminado.', life: 3000});
      }
    });
    this.selectNivel = null;
  }

   
  resetForm(): void {
    this.nivelesForm.reset();
  }

}
