import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GetUserService, GetAllMoviesService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  @Input() userData = {username: '', password: '', email: ''};

  users: any[] = [];
  movieIDs: any[] = [];
  movies: any[] = [];
  favMovies: any[] = [];

  /**
   * called upon when creating an instance of the class
   * @param getUser 
   * @param getMovies 
   * @param dialogRef 
   * @param router 
   */
  constructor(
    public getUser: GetUserService,
    public getMovies: GetAllMoviesService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public router: Router
  ) { }

  ngOnInit(): void {
    /**
     * called upon dialog load to retrieve user's information
     */
    this.getUserUser();  //getUserUser() to distinguish from getUser (within constructor)
  }

  /**
   * retrieves user's information from database
   * pushes response to 'users' array
   * obtains favorite movie IDs from response, pushes to 'movieIDs' array (although presently unused within this component)
   */
  getUserUser(): void {
    const user = localStorage.getItem('user');
    this.getUser.getUser(user).subscribe((resp: any) => {
      this.users.push(resp);
      this.movieIDs = resp.favoriteMovie;
    });
  }

  /**
   * routes user to full profile page upon clicking "Go to Full Profile Page" button
   */
  routeToFull(): void{
    this.dialogRef.close();  //this will close the modal on success
    this.router.navigate(['fullProfile']);
  }

}
