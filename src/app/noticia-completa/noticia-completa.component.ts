import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from '../servicios/noticias.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-noticia-completa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticia-completa.component.html',
  styleUrl: './noticia-completa.component.css'
})
export class NoticiaCompletaComponent implements OnInit {
  noticia: any;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private comprobador : AppComponent
  ) {}

  ngOnInit(): void {
    this.cargarNoticia();
  }

  async cargarNoticia() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== undefined) {
      const id = +idParam;
      try {
        this.noticia = await this.noticiasService.getNoticiaLocalById(id);
      } catch (error) {
        console.error('Error al cargar la noticia:', error);
      }
    } else {
      console.error('No se encontró el id de la noticia en los parámetros de la ruta.');
    }
  }

  estadoModoNocturno(){
    return this.comprobador.getModoNocturno();
  }
}
