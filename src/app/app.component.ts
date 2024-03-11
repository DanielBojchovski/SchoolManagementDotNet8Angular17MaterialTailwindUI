import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { JwtService } from './Authentication/Services/jwt.service';
import { LocalStorageAuthTokenName } from '../Consts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SchoolManagementDotNet8Angular17MaterialTailwindUI';

  constructor(public jwtService: JwtService, private router: Router){}

  LogOut(){
    localStorage.removeItem(LocalStorageAuthTokenName);
    this.router.navigate([""]);
  }
}
