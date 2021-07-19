import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  mensajeError = '';
  mostrar = false;
  suscription: Subscription;

  constructor(private _imagenService : ImagenService) {
    this.suscription =  this._imagenService.getError().subscribe(data => {
      this.mensajeError = data;
      this.mostrarMensaje();
    })
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  mostrarMensaje(){
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 2000);
  }

}
