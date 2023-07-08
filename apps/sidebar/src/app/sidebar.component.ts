import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  template: `
    <ul>
      <li><a routerLink="profile">Profile</a></li>
      <li><a routerLink="feed">Feed</a></li>
      <li><a routerLink="register">Register</a></li>
    </ul>
  `,
  standalone: true,
})
export class SidebarComponent {}
