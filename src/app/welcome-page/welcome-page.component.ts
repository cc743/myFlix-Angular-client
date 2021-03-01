import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {

  /**
   * Called upon creating an instance of the class
   * @param dialog 
   */
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Function that will open the user registration dialog when the "Sign Up" button is clicked
   * @returns UserRegistrationFormComponent in dialog with inputs for username, email, and birthdate
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Function that will open the login dialog the the "Log In" button is clicked
   * @returns LoginFormComponent in dialog  with inputs for username and password
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280 px'
    });
  }

}
