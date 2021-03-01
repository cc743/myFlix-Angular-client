import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GetUserService, EditUserService, GetAllMoviesService, DeleteFavoriteMovieService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-full-profile',
  templateUrl: './user-full-profile.component.html',
  styleUrls: ['./user-full-profile.component.scss']
})

export class UserFullProfileComponent implements OnInit {
  @Input() userData = {username: '', password: '', email: ''}; 

  /**
   * decalaration of variables used in functions below
   */
  users: any[] = [];
  movieIDs: any[] = [];
  movies: any[] = [];
  favMovies: any[] = [];

  /**
   * called upon when creating an instance of the class
   * @param getUser 
   * @param editUser 
   * @param getAllMovies 
   * @param deleteFavoriteMovie 
   * @param snackBar 
   * @param router 
   */
  constructor(
    public getUser: GetUserService,
    public editUser: EditUserService,
    public getAllMovies: GetAllMoviesService,
    public deleteFavoriteMovie: DeleteFavoriteMovieService,
    public snackBar: MatSnackBar, 
    public router: Router
  ) { }

  ngOnInit(): void {
    /**
     * called upon page load to retrieve user's information from database and
     * to get user's favorite movies from within the same user information response
     */
    this.getUserUser();  //getUserUser() to distinguish from getUser (within constructor)
    this.getFavoriteMovies();
  }

  /**
   * function to get user information from database
   * pushes response into users array
   */
  getUserUser(): void {
    const user = localStorage.getItem('user');
    this.getUser.getUser(user).subscribe((resp: any) => {
      this.users.push(resp);
    });
  }

  /**
   * function to get user's favorite movies
   * makes api call to retrieve user's information (which includes IDs of favorite movies)
   * takes the favorite movie IDs from the response and pushes said IDs to the 'movieIDs" array
   * then, calls the getMovies() function
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.getUser.getUser(user).subscribe((resp: any) => {
        this.movieIDs = resp.favoriteMovie;
        this.getMovies();
      });
    }
  }

  /**
   * function to get movies and display favorite movie information on full profile page
   * makes api call to retrieve all movies information
   * then, resets the 'favMovies' array to an empty array (useful for deleteMovie function)
   * checks each movie from the response to see if the movie IDs are included in the 'movieIDs' array
   * if so, the movie information is pushed to the 'favMovies' array
   * @returns this.favMovies
   */
  getMovies(): void {
    this.getAllMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.favMovies = [];
      this.movies.forEach((movie) => {
        if(this.movieIDs.includes(movie._id))
          this.favMovies.push(movie);
      });
      //console.log(this.favMovies);
      return this.favMovies;
    });
  }

  /**
   * function to delete a favorite movie from user's list of favorite movies in both database
   * and from the DOM.  Then, calls this.getFavoriteMovies()
   * @param id 
   * @param title 
   */
  deleteMovie(id: string, title: string): void{
    this.deleteFavoriteMovie.deleteFavoriteMovie(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} removied from your favorites`,
        'OK',
        {
          duration: 3000,
          verticalPosition: 'top'
        }
      );
      this.getFavoriteMovies();
    });
  }
  
  /**
   * function to allow user to edit profile information
   * upon editing profile information, 'user' and 'token' is removed from localStorage,
   * routes user to welcome page in order to log in again with newly edited username/password
   */
  editUserData(): void {
    this.editUser.editUser(this.userData).subscribe((resp: any) => {
      //console.log(resp);
      this.snackBar.open("your profile was successfully updated.", "OK", {
        duration: 2000,
        verticalPosition: "top"
      });
    },
    (resp) => {
      //console.log(resp);
      this.snackBar.open(resp, "OK", {
        duration: 5000,
      });
    });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

}
