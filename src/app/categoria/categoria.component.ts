import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from '../servicios/noticias.service';
import { CommonModule } from '@angular/common';
import { Noticia } from '../servicios/noticia.models';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {
  noticias: Noticia[] = [];
  private routeSubscription: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private router: Router,
    private comprobador : AppComponent
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.cargarNoticias();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  async cargarNoticias() {
    const categoriaParam = this.route.snapshot.paramMap.get('categoria');
    if (categoriaParam !== null && categoriaParam !== undefined) {
      const categoria = categoriaParam;
      try {
        this.noticias = await this.noticiasService.getNoticiasLocalesByCategoria(categoria); // Cambia el nombre de la variable para que sea coherente
      } catch (error) {
        console.error('Error al cargar las noticias:', error);
      }
    } else {
      console.error('No se encontró la categoría en los parámetros de la ruta.');
    }
  }

  verDetalle(noticiaId: number) {
    this.router.navigate(['/noticia', noticiaId]);
    console.log(noticiaId)
  }

  estadoModoNocturno(){
    return this.comprobador.getModoNocturno();
  }

}
