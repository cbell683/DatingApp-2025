import { signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private http = inject(HttpClient);
  protected title = 'Dating app';
  protected members = signal<any>([])

  async ngOnInit() {
    this.members.set(await this.getMembers())
  }
async getMembers() {
  try {
  return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
} catch (error) {
  console.log(error);
  throw error;
}

}
}