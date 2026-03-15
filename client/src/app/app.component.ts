
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from './layout/nav/nav.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Nav],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  protected router = inject(Router);
 
  
  }



