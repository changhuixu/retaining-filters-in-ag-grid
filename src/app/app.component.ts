import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main style="height: 100%; padding: 0 1rem;">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {}
