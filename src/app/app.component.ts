import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'we-repass-frontend';
}
