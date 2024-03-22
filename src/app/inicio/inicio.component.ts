import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NoticiasService } from '../servicios/noticias.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  noticias: any[] = [];
  constructor(
    private noticiasService: NoticiasService,
    private router: Router,
    private comprobador : AppComponent) { }

  ngOnInit(): void {
    this.loadNoticias();
  }

  async loadNoticias() {
    try {
      this.noticias = await this.noticiasService.getNoticiasLocales();
    } catch (error) {
      console.error('Error al cargar noticias:', error);
    }
  }

  verDetalle(noticiaId: number) {
    this.router.navigate(['/noticia', noticiaId]);
  }

  estadoModoNocturno(){
    return this.comprobador.getModoNocturno();
  }

}
