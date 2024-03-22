import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NoticiasService } from './servicios/noticias.service';
import { Noticia } from './servicios/noticia.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule ,RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'El Informante';

  togglerExpandido = false;
  modoNocturnoActivo: boolean = false;
  navcolor: string = '';
  distanciaNavElementos = '0';

  constructor(private elementRef: ElementRef,) {}

  ngOnInit(): void {
    this.toggleModoNocturno();
  }

  verCategoria(noticiaCategoria: string): string[] {
    return ['/categoria', noticiaCategoria];
  }

  getModoNocturno() {
    return this.modoNocturnoActivo;
  }

  toggleNavbar() {
    this.togglerExpandido = !this.togglerExpandido;
    if (this.togglerExpandido) {
      this.distanciaNavElementos = '500px';
    } else {
      this.distanciaNavElementos = '0';
    }
  }

  toggleModoNocturno() {
    this.modoNocturnoActivo = !this.modoNocturnoActivo;
    const body = this.elementRef.nativeElement.ownerDocument.body;
    if (this.modoNocturnoActivo) {
      body.style.background = 'rgb(15, 15, 15)';
      this.navcolor = 'dark';
    } else {
      body.style.background = 'rgb(229, 229, 229)';
      this.navcolor = 'white';
    }
  }

}
