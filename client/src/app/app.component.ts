import { signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Nav } from './layout/nav/nav.component';
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Nav, Home],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected title = 'Dating app';
  protected members = signal<User[]>([])

  async ngOnInit() {
    this.members.set(await this.getMembers())
    this.setCurrentUser()
  }

setCurrentUser(){
  const userString = localStorage.getItem('user');
  if (!userString) return;
  const user = JSON.parse(userString);
  this.accountService.currentUser.set(user);
}

async getMembers() {
  try {
  return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
} catch (error) {
  console.log(error);
  throw error;
}

}
}