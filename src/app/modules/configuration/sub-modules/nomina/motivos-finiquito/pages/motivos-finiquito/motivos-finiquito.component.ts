import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MotivosFiniquito } from '../../interfaces/motivos-finiquito.interfaces';
import { TypesFile } from '../../../../../../../shared/interfaces/typesFiles.interfaces';
import { MotivosFiniquitoService } from '../../services/motivos-finiquito.service';
import { Helpers } from '../../../../../../../shared/helpers/helpers';
import { motivosData } from '../../interfaces/motivos';

@Component({
  selector: 'app-motivos-finiquito',
  templateUrl: './motivos-finiquito.component.html',
  styleUrls: ['./motivos-finiquito.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class MotivosFiniquitoComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  motivosFiniquito: MotivosFiniquito[] = [];
  typesFile  : TypesFile[] = [];

  // Banderas
  isEdit: boolean = false;

  // Cargar table
  loading : boolean = false;

  // Modales
  titleForm  : string = 'Agregar motivos de finiquito';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private motivosFiniquitoService: MotivosFiniquitoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      codmot: ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      desmot: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this) ]],
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
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    setTimeout(() => {
      this.motivosFiniquito = motivosData;
      this.loading = false;
    })
  }

  refresh(): void {
    this.motivosFiniquito = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    if (!this.isEdit) {
      this.form.controls['codmot'].enable();
    }
    this.titleForm = this.isEdit ? 'Editar motivos de finiquito' : 'Agregar motivos de finiquito';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.form.reset();
    this.createModal = false;
  }

  /**
   * Metodo para guardar y actualizar registros
   * @returns void
   */
  save(): void {   
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Mandar el formulario completo y quitar espacios en blancos
    let data: MotivosFiniquito = this.form.getRawValue();
    data.desmot.trim();

    if(this.isEdit) {
      // Editar
      console.log('Update', data);
      this.motivosFiniquito[this.findIndexById(this.form.getRawValue().codmot)] = this.form.getRawValue();
      this.motivosFiniquito = [...this.motivosFiniquito];
      this.closeModal();
      return;
    }

    // Crear
    console.log('Create', data);
    this.motivosFiniquito.push(data);
    this.closeModal();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.motivosFiniquito.length; i++) {
        if (this.motivosFiniquito[i].codmot === id) {
            index = i;
            break;
        }
    }
    return index;
  } 

  /**
   * Carga la data en el formulario para editar
   * @param profesion row de la tabla
   * @returns void
   */
  editRow(motivosFiniquito: MotivosFiniquito): void {
    this.isEdit = true;
    if (!motivosFiniquito) {  
      this.helpers.openErrorAlert('No se encontro el id.')
      return;
    }
    this.form.controls['codmot'].disable();
    this.form.reset(motivosFiniquito);
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param profesion row de la tabla
   * @returns void
   */
    deleteRow(motivosFiniquito: MotivosFiniquito): void {
      if (!motivosFiniquito) {  
        this.helpers.openErrorAlert('No se encontro el id.')
        return; 
      }
      this.confirmationService.confirm({
        message: `¿Estas seguro que quieres borrar el motivo de finiquito <b>${motivosFiniquito.desmot}</b>?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Si',
        accept: () => {
          this.motivosFiniquito = this.motivosFiniquito.filter(val => val.codmot !== motivosFiniquito.codmot);
          // this.motivosFiniquitoService.delete(motivosFiniquito.codmot)
          //   .subscribe( resp => {
          //     this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
          //     // this.loadData();
          //   });
        }
      });
    }
  
    export() {
  
    }

  /**
   * VALIDACIONES DEL FORMULARIO REACTIVO
   */
  campoInvalid(campo: string) {
    return (this.form.controls[campo].errors) 
            && (this.form.controls[campo].touched || this.form.controls[campo].dirty)
             && this.form.invalid;
  }

  // Mensajes de errores dinamicos
  get codmotMsgError(): string {
    const errors = this.form.get('codmot')?.errors;
    if ( errors?.required ) {
      return 'El código es obligatorio.';
    } else if ( errors?.maxlength ) {
      return 'El código es de longitud máximo de 4 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'El código esta registrado.';
    }
    return '';
  }

  // Mensajes de errores dinamicos
  get desmotMsgError(): string {
    const errors = this.form.get('desmot')?.errors;
    if ( errors?.required ) {
      return 'La descripción es obligatoria.';
    } else if ( errors?.maxlength ) {
      return 'La descripción es de longitud máxima de 30 dígitos.';
    } else if ( errors?.duplicated ) {
      return 'La descripción ya existe.';
    }
    return '';
  }

  /**
   * Validar id duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
   validatedId(control: AbstractControl): ValidationErrors | null {
    if( !control.value ) { return null; }
      const duplicated = this.motivosFiniquito.findIndex(mot => mot.codmot === control.value);
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
  }

  /**
   * Validar descripcion duplicado
   * @param control 
   * @returns ValidationErrors | null
   */
  validatedDesniv(control: AbstractControl): ValidationErrors | null {
    if (this.isEdit) {
      if( !control.value && !this.form.getRawValue() && this.motivosFiniquito) { return null; }
      const duplicatedEdit = this.motivosFiniquito.findIndex(
        mot => mot.desmot.trim().toLowerCase() === this.form.getRawValue().desmot.trim().toLowerCase() 
                  && mot.codmot !== this.form.getRawValue().codmot
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.motivosFiniquito.findIndex(mot => mot.desmot.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }


}
