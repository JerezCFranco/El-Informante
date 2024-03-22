import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CrearComponent } from './crear/crear.component';
import { NoticiaCompletaComponent } from './noticia-completa/noticia-completa.component';
import { CategoriaComponent } from './categoria/categoria.component';

export const routes: Routes = [
    {path:'', component: InicioComponent},
    {path:'crear', component: CrearComponent},
    {path: 'noticia/:id', component: NoticiaCompletaComponent},
    {path: 'categoria/:categoria', component: CategoriaComponent},
    {path:'**', redirectTo:'', pathMatch:'full'}
];
