import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import{ ToastService } from '../../../core/services/toast-service';
import { themes } from '../theme';
import { BusyService } from '../../../core/services/busy-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
  imports: [FormsModule, RouterLink]
})
export class Nav implements OnInit{

  protected accountService = inject(AccountService);
  protected busyService = inject(BusyService);
  private router = inject(Router);
  private toast = inject (ToastService);
  protected creds: any = {};
// do i need this line below??
  protected loggedIn = signal(false);

  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;

    ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }
  
  handleSelectTheme(theme: string){
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }

  login() {
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully');
        this.creds = {};
      },
      error: error => {
        this.toast.error(error.error);
      }
        
    })
  }

  logout() {
     this.accountService.logout();
     this.router.navigateByUrl('/');
  }

}
