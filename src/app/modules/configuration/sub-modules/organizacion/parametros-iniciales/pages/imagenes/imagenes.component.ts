import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../../../nomina/empresa/shared-empresa/interfaces/empresa.interfaces';
import { ImagenesService } from '../../services/imagenes.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { Imagen } from '../../interfaces/imagenes.interfaces';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ImagenesComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de imagenes por empresa
  imagenes: Imagen[] = [];

  // Objeto seleccionado para editar
  imagenSelect!: Imagen | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar imagen';
  createModal: boolean = false;

  constructor(private imagenesService: ImagenesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadImagenesByEmpresa(this.empresaRow.id);
    }
  }

  /**
   * Obtener datos de localidades asignada a la empresa
   * @param idEmpresa: string id empresa
   */
  loadImagenesByEmpresa( idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.imagenesService.getImagenesByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.imagenes = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.imagenes = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadImagenesByEmpresa(this.empresaRow.id);
    }
  }

  /**
   * Abre modal para crear
   * @returns void
   */
  openModalCreate(): void {
    this.titleForm = 'Agregar imagen';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.imagenSelect = undefined;
  }

  /**
   * Elimina un registro
   * @param imagen row de la tabla
   * @returns void
   */
  deleteRow(imagen: Imagen): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta imagen <b>${imagen.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.imagenesService.delete(this.empresaRow.id, imagen)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.imagenesService.selectRowTable$.emit(null);
              this.refresh();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la imagen, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la imagen.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
