import { Component, OnInit, Input } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { Imagen, TipoImagenData } from '../../../interfaces/imagenes.interfaces';
import { ImagenesService } from '../../../services/imagenes.service';
import { dropdownType } from '../../../../../../../../shared/interfaces/typesFiles.interfaces';

@Component({
  selector: 'app-data-table-imagenes',
  templateUrl: './data-table-imagenes.component.html',
  styleUrls: ['./data-table-imagenes.component.scss']
})
export class DataTableImagenesComponent implements OnInit {

  // Objeto de imagenes por empresa
  @Input() imagenes: Imagen[] = [];

  // Table
  columns: TableHead[] = [];

  // Objeto de tipos para filtrar
  tiposFilter: dropdownType[] = [];

  constructor(private imagenesService: ImagenesService) { }

  ngOnInit(): void {
    this.tiposFilter = TipoImagenData;
    this.columns = [
      { field: 'tipo',              header: 'Tipo' },
      { field: 'nombre',            header: 'Nombre' },
      { field: 'fileContentBase64', header: 'Imagen' }
    ];
  }

  onRowSelect(event: any): void {
    this.imagenesService.selectRowTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.imagenesService.selectRowTable$.emit(null);
  }

}
