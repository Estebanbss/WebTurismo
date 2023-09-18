import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from './modules/auth/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userS: UserService){}
  title = 'login-firebase';
  ngOnInit(){
    this.userS.redirectToAppropriateRoute()
  }
}
