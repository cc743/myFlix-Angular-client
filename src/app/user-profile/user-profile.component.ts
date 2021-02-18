import { Component, OnInit } from '@angular/core';
import { GetUserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any[] = [];

  constructor(public getUser: GetUserService) { }

  ngOnInit(): void {
    this.getUserUser();  //getUserUser() to distinguish from getUser (line 13)
  }

  getUserUser(): void {
    this.getUser.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

}
