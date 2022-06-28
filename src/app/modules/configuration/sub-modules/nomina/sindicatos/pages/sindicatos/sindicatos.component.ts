import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Sindicatos, Countrys, ObjectEventChange, FederalEntities } from '../../interfaces/sindicatos.interfaces';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { SindicatosService } from '../../services/sindicatos.service';
import { Dropdown } from 'primeng/dropdown';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-sindicatos',
  templateUrl: './sindicatos.component.html',
  styleUrls: ['./sindicatos.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class SindicatosComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // Objetos
  sindicatos         : Sindicatos[]      = [];
  sindicatosSelect!: Sindicatos | undefined;
  countrys           : Countrys[]        = [];
  countrySelect      : String            = '';
  federalEntities    : FederalEntities[] = [];
  federalEntitySelect: String            = '';

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar sindicato';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private sindicatosService: SindicatosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.loadData();
    this.loadCountrysData();
  }

  loadData(): void {
    this.spinner.show();
    this.sindicatosService.getAll()
      .subscribe({
        next: (resp) => {
          this.sindicatos = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Carga todos los países
   */
  loadCountrysData(): void {
    this.spinner.show();
    this.sindicatosService.getAllCountry()
      .subscribe({
        next: (resp) => {
          this.countrys = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Carga las entidades relacionadas con el país
   * @param codCountry: string código país a buscar
   * @param codEntity: string (opcional) código entidad para mostrar en el formulario
   */
  loadEntitiesByCountry(codCountry: string, codEntity?: string | null): void {
    this.federalEntities = [];
    this.spinner.show();
    this.sindicatosService.getEntitiesByCountry(codCountry)
      .subscribe({
        next: (resp) => {
          this.federalEntities = resp;
          this.form.controls['edoCodedo'].enable();
          // Colocar el nombre del pais y la entidad en el campo del formulario
          if (this.isEdit) {
            this.countrys.find(country => country.codigo === codCountry ? this.countrySelect = country.nombre : '');
            this.federalEntities.find(entity => entity.codEntidad === codEntity ? this.federalEntitySelect = entity.nombre : '');
          }
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.sindicatos = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar sindicato' : 'Agregar sindicato';
    this.createModal = true;
  }
  
  closeModal(): void {
    this.sindicatosSelect = undefined
    this.countrySelect = '';
    this.federalEntitySelect = '';
    this.isEdit = false;
    this.createModal = false;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  /**
   * Carga la data en el formulario para editar
   * @param sindicatos row de la tabla
   */
  editRow(sindicatos: Sindicatos): void {
    this.isEdit = true;
    // Comprobar si el sindicato tiene fecha de inscripción para establecerlo en el formulario y poder editar
    sindicatos.registro = sindicatos.registro ? new Date(sindicatos.registro) : sindicatos.registro;
    // Cargar pais y entidades si existen
    if ( sindicatos.paiCodpai ) {
      this.loadEntitiesByCountry(sindicatos.paiCodpai, sindicatos.edoCodedo);
    }
    this.sindicatosSelect = sindicatos
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param sindicato row de la tabla
   */
  deleteRow(sindicato: Sindicatos): void {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el sindicato <b>${sindicato.dessin}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.sindicatosService.delete(sindicato.codsin)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el sindicato', life: 3000});
            }
          });
      }
    });
  }

}
