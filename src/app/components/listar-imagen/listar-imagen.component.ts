import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {
  termino = '';
  suscription: Subscription;
  listImagenes: any[] = [];
  loading = false;
  imagenesPorPagina = 30;
  paginaActual = 1;
  totalPaginas = 0;

  constructor(private _imagenService: ImagenService) { 
    this.suscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
      this.termino = data;
      this.paginaActual = 1 ;
      this.loading = true;
      this.obtenerImagenes();
    })
  }

  ngOnInit(): void {
  }

  obtenerImagenes(){
    this._imagenService.getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual).subscribe(data => {
      console.log(data);

      if(data.hits.length === 0){
        this.loading = false;
        this._imagenService.setError('Oops... No encontramos ningún resultado.');
        return;
      }
      this.totalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina);
      this.loading = false;
      this.listImagenes = data.hits;


    }, error => {
      this.loading = false;
      this._imagenService.setError('¡Oh no! Ocurrió un error.')
    })


  }

  paginaAnterior() {
    if(this.paginaActual == 1){

    }else{
      this.paginaActual--;
      this.loading = true;
      this.listImagenes = [];
      this.obtenerImagenes();
    }
    
  }

  paginaSiguiente(){
    if(this.paginaActual == this.totalPaginas){

    }else{
      this.paginaActual++;
      this.loading = true;
      this.listImagenes = [];
      this.obtenerImagenes();
    }
  }

}
