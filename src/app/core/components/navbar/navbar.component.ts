import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logged$?:Observable<any>;

  constructor(private authService: AuthService) { }

  logout(){
    this.authService.logout('/login').subscribe();
  }

  ngOnInit(): void {
    this.logged$ = this.authService.logged;
  }

}
