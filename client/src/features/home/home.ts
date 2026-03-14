import { Component, Input, signal } from '@angular/core';
import { RegisterCreds } from '../../types/user';
import { Register } from '../account/register/register';
import { User } from '../../types/user';


@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {

  protected registerMode = signal(false);

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
}
