import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent implements OnInit {
  nombreImagen : string;

  constructor(private _imagenService : ImagenService) { 
    this.nombreImagen = '';
  }

  ngOnInit(): void {
  }
  buscarImagenes(){
    if(this.nombreImagen === '') {
      this._imagenService.setError('Escribe algo en el campo de búsqueda')
    }else {
      this._imagenService.setTerminoBusqueda(this.nombreImagen);
    }
  }

}
