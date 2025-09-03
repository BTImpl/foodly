import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HeaderComponent, CommonModule, RouterOutlet] // Ne importáld a RouterOutlet-et
})
export class AppComponent {
  title = 'Recepies';

  constructor(private router: Router) {}

  navigateToRecipes() {
    alert('Navigating to Recipes');
    this.router.navigate(['/recipes']);
  }
}
