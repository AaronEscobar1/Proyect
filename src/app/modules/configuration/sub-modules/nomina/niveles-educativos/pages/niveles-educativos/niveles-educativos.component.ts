import { Component, OnInit } from '@angular/core';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';
import { TypesFile } from '../../interfaces/typesFiles.interfaces';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Helpers } from '../../../../../../../shared/helpers/helpers';

@Component({
  selector: 'app-niveles-educativos',
  templateUrl: './niveles-educativos.component.html',
  styleUrls: ['./niveles-educativos.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class NivelesEducativosComponent implements OnInit {

  // Formulario reactivo
  formNiveles!: FormGroup;

  // Objetos
  niveles     : NivelesEducativos[] = [];
  typesFile   : TypesFile[] = [];

  // Banderas
  isEdit        : boolean = false;

  // Tabla
  loading       : boolean           = false;
  columns       : any[]             = [];
  selectNivel!  : NivelesEducativos | null;

  // Modales
  titleForm      : string = 'Agregar niveles educativos';
  addNivelModal  : boolean = false;
  printNivelModal: boolean = false;

  constructor(private nivelesServices: NivelesEducativosService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.formNiveles = this.fb.group({
      codniv: ['', [ Validators.required, Validators.pattern('[1-9]'), Validators.maxLength(1), this.validatedId.bind(this) ]],
      desniv: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this)]],
      codley: ['', [ Validators.maxLength(3) ]]
    });
  }

  ngOnInit(): void {
    this.columns = [
      { field: 'codniv', header: 'Código' },
      { field: 'desniv', header: 'Descripción' },
      { field: 'codley', header: 'Oficial' }
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
    this.loading = true;
    this.nivelesServices.getNivelesAll().subscribe(data => {
      this.niveles = data;
      this.loading = false;
    });
  }

  showModalPrintDialog(): void {
    this.printNivelModal = true;
  }
  
  showModalAddDialog(): void {
    if (!this.isEdit) {
      this.formNiveles.controls['codniv'].enable();
    }
    this.titleForm = this.isEdit ? 'Editar niveles educativos' : 'Agregar niveles educativos';
    this.addNivelModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.selectNivel = null;
    this.addNivelModal = false;
    this.resetForm();
  }

  refresh(): void {
    this.niveles = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  saveNivel(): void {
    if (this.formNiveles.invalid) {
      this.formNiveles.markAllAsTouched();
      return;
    }
    let data = this.formNiveles.getRawValue();
    data.desniv.trim();
    if (this.isEdit) {
      this.nivelesServices.updateNivel(data)
        .subscribe(() => {
          this.closeModal();
          this.loadData();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Nivel educativo actualizado.', life: 3000});
        }, error => {
          console.log(error);
          if(error.status == 401) {
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'Error Unauthorized.', life: 3000});
          }
        });
    } else {
      this.nivelesServices.createNivel(data)
        .subscribe(() => {
          this.closeModal();
          this.loadData();
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Nivel educativo creado.', life: 3000});
        },error => {
          console.log(error);
          if(error.status == 401) {
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'Error Unauthorized.', life: 3000});
          }
        });
    }
  }

  editSelectNivel() {
    this.isEdit = true;
    if (!this.selectNivel) { return; }
    this.formNiveles.controls['codniv'].disable();
    this.formNiveles.reset(this.selectNivel);
    this.showModalAddDialog();
  }
 
  deleteNivel() {
    const id = this.selectNivel?.codniv ? this.selectNivel?.codniv : '';
    if (!id) {
      this.helpers.openErrorAlert('No se encontro el id del nivel.')
      return;
    } 

    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el nivel <b>${this.selectNivel?.desniv}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.nivelesServices.deleteNivel(id)
          .subscribe((data) => {
            console.log('Exito', data);
          }, error => {
            // TODO: Mejorar la respuesta en el backend 
            if(error.status == 200) {
              this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Nivel educativo eliminado.', life: 3000});
              this.loadData();
            }
          })
      }
    });
    this.selectNivel = null;
  }

  resetForm(): void {
    this.formNiveles.reset();
  }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid( campo: string ) {
    return (this.formNiveles.controls[campo].errors) 
            && (this.formNiveles.controls[campo].touched || this.formNiveles.controls[campo].dirty)
             && this.formNiveles.invalid;
  }

  // Mensajes de errores dinamicos
  get codnivMsgError(): string {
    const errors = this.formNiveles.get('codniv')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.pattern ) {
      return 'El código es de longitud de 1 dígito.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get desnivMsgError(): string {
    const errors = this.formNiveles.get('desniv')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
    }
    return '';
  }

  validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
      const duplicated = this.niveles.findIndex(nivel => nivel.codniv === control.value);
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
  }

  validatedDesniv(control: AbstractControl): ValidationErrors | null {
    if (this.isEdit) {
      if( !control.value && !this.formNiveles.getRawValue() && this.niveles) { return null; }
      const duplicatedEdit = this.niveles.findIndex(
        nivel => nivel.desniv.trim().toLowerCase() === this.formNiveles.getRawValue().desniv.trim().toLowerCase() 
                  && nivel.codniv !== this.formNiveles.getRawValue().codniv
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.niveles.findIndex(nivel => nivel.desniv.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        console.log('existe');
        return {'duplicated': true};
      }
      return null;
    }
  }

}
