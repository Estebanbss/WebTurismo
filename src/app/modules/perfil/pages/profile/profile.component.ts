import { Component } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private modalService: ModalServiceService) {
    this.route.params.subscribe(params => this.profileId = params['id']);
  }
  profileId!: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.modalService.setProfileHeader(false);
  }
}
