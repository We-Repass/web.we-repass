import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ExamenComponent } from './components/examen/examen.component';
import { CrearExamenComponent } from './components/crear-examen/crear-examen.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { VerExamenComponent } from './components/ver-examen/ver-examen.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'examenes', component: ExamenComponent, canActivate: [AuthGuard] },
    { path: 'crear-examen', component: CrearExamenComponent, canActivate: [AuthGuard] },
    { path: 'alumnos', component: AlumnosComponent, canActivate: [AuthGuard] },
    { path: 'examen', component: VerExamenComponent, canActivate: [AuthGuard] },

];