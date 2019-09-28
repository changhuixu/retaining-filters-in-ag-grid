import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <h1>Filters will be lost when you navigate to another page</h1>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      main {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0 1rem;
      }
    `
  ]
})
export class AppComponent {}
