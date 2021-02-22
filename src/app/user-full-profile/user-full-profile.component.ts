import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GetUserService, EditUserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-full-profile',
  templateUrl: './user-full-profile.component.html',
  styleUrls: ['./user-full-profile.component.scss']
})
export class UserFullProfileComponent implements OnInit {
  @Input() userData = {username: '', password: '', email: ''}; 

  users: any[] = [];
  movieIDs: any[] = [];
  movies: any[] = [];

  constructor(
    public getUser: GetUserService,
    public editUser: EditUserService
  ) { }

  ngOnInit(): void {
    this.getUserUser();  //getUserUser() to distinguish from getUser (above)
  }

  getUserUser(): void {
    const user = localStorage.getItem('user');
    this.getUser.getUser(user).subscribe((resp: any) => {
      console.log(resp);
      this.users.push(resp);
      //console.log(this.users);
    });
  }

  // editUserUser(): void {
  //   const user = localStorage.getItem('user');
  //   this.editUser.editUser(user).subscribe((resp: any) => {
  //     console.log(resp);
  //   })
  // }


}
