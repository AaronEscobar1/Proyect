import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ClasificacionMotivo, MotivosFiniquito } from '../../interfaces/motivos-finiquito.interfaces';
import { TypesFile } from '../../../../../../../shared/interfaces/typesFiles.interfaces';
import { MotivosFiniquitoService } from '../../services/motivos-finiquito.service';
import { Helpers } from '../../../../../../../shared/helpers/helpers';
import { motivosData } from '../../interfaces/motivos';
import { NgxSpinnerService } from 'ngx-spinner';

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
  motivosFiniquito    : MotivosFiniquito[] = [];
  typesFile           : TypesFile[] = [];
  classificationMotive: ClasificacionMotivo[] = [];

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
              private spinner: NgxSpinnerService,
              private fb: FormBuilder,
              private helpers: Helpers) {
    this.form = this.fb.group({
      coddes: ['', [ Validators.required, Validators.maxLength(4), this.validatedId.bind(this) ]],
      desde1: ['', [ Validators.required, Validators.maxLength(30), this.validatedDesniv.bind(this) ]],
      desde2: ['', [ Validators.maxLength(30) ]],
      impliq: [ false ],
      classo: ['', [ Validators.required ]]
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
    this.classificationMotive = [
      { tipoReporte: 'IVSS: Tipo de trabajador-TIUNA',   codigoOficial: '1' },
      { tipoReporte: 'MINTRA: Clase de ocupación',       codigoOficial: '2' },
      { tipoReporte: 'IVSS: Condición trabajador-TIUNA', codigoOficial: '3' }
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
      this.form.controls['coddes'].enable();
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
    // Obtener formulario
    let data: MotivosFiniquito = this.form.getRawValue();
    // Transformar la data que viene del formulario
    data.desde1.trim();
    data.impliq = data.impliq ? 1 : 0;

    this.spinner.show();

    if(this.isEdit) {
      // Editar
      console.log('Update', data);
      this.motivosFiniquito[this.findIndexById(this.form.getRawValue().coddes)] = this.form.getRawValue();
      this.motivosFiniquito = [...this.motivosFiniquito];
      this.closeModal();
      return;
    }

    // Crear
    this.motivosFiniquitoService.create(data)
      .subscribe( resp => {
        this.closeModal();
        this.spinner.hide();
        this.messageService.add({severity: 'success', summary: 'Éxito', detail: resp.message, life: 3000});
        this.loadData();
      }, (error) => {
        this.spinner.hide();
        this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo crear el motivo de finiquito.', life: 3000});
      });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.motivosFiniquito.length; i++) {
        if (this.motivosFiniquito[i].coddes === id) {
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
    this.form.controls['coddes'].disable();
    motivosFiniquito.impliq = motivosFiniquito.impliq === 1 ? true : false; 
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
        message: `¿Estas seguro que quieres borrar el motivo de finiquito <b>${motivosFiniquito.desde1}</b>?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Si',
        accept: () => {
          this.motivosFiniquito = this.motivosFiniquito.filter(val => val.coddes !== motivosFiniquito.coddes);
          // this.motivosFiniquitoService.delete(motivosFiniquito.coddes)
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
  get coddesMsgError(): string {
    const errors = this.form.get('coddes')?.errors;
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
  get desde1MsgError(): string {
    const errors = this.form.get('desde1')?.errors;
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
      const duplicated = this.motivosFiniquito.findIndex(mot => mot.coddes === control.value);
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
        mot => mot.desde1.trim().toLowerCase() === this.form.getRawValue().desde1.trim().toLowerCase() 
                  && mot.coddes !== this.form.getRawValue().coddes
      );
      if (duplicatedEdit > -1) {
        return {'duplicated': true};
      }
      return null;
    } else {
      if( !control.value ) { return null; }
      const duplicated = this.motivosFiniquito.findIndex(mot => mot.desde1.trim().toLowerCase() === control.value.trim().toLowerCase());
      if (duplicated > -1) {
        return {'duplicated': true};
      }
      return null;
    }
  }


}
