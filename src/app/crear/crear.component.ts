import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css',
})
export class CrearComponent {
  constructor(private comprobador : AppComponent) {}

  async submitForm(event: Event): Promise<void> {
    event.preventDefault();

    const form = document.getElementById(
      'formulario-noticias'
    ) as HTMLFormElement;

    const formData = new FormData(form);
    const titulo: string | null = formData.get('titulo') as string;
    const descripcion: string | null = formData.get('descripcion') as string;
    const imagenUrl: string | null = formData.get('imagenUrl') as string; // Obtener la URL de la imagen
    const categoria: string | null = formData.get('categoria') as string;

    const descripcionCorta = descripcion ? descripcion.substring(0, 150)+'...' : '';

    const payload = {
      titulo: titulo,
      descripcion: descripcion,
      descripcionCorta: descripcionCorta,
      imagenUrl: imagenUrl,
      categoria: categoria,
    };

    try {
      const response = await fetch(
        'https://api-informante.glitch.me/api/noticias',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const nuevaNoticia = await response.json();
        console.log('Noticia creada:', nuevaNoticia);

        form.reset();
      } else {
        const responseData = await response.json();
        console.error(
          'Error al crear la noticia:',
          responseData.error || response.statusText
        );
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }

  estadoModoNocturno(){
    return this.comprobador.getModoNocturno();
  }
}
