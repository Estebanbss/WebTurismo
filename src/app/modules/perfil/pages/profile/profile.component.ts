import { Component } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute){
    this.route.params.subscribe(params => this.profileId = params['id']);
  }
  profileId!: string;

}
