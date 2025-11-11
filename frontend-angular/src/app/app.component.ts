import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';
import { filter } from 'rxjs';
import { moduleRoutes } from './app.routes';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentRoute = '';
  deveMostrarCabecalho: boolean = true;

  constructor(private router: Router) {
    const routes = moduleRoutes;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url: string = event.url;
        const formatted = url.split('/')[1];
        this.deveMostrarCabecalho = !!routes[formatted];
        console.log(routes[formatted], formatted);
        console.log(this.deveMostrarCabecalho);
      });
  }
}
