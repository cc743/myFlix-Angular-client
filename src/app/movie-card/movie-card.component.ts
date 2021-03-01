import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, AddFavoriteMovieService } from '../fetch-api-data.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  /**
   * called upon when creating an instance of the class
   * @param getAllMovies 
   * @param addFavoriteMovie 
   * @param dialog 
   * @param snackBar 
   * @param router 
   */
  constructor(
    public getAllMovies: GetAllMoviesService,
    public addFavoriteMovie: AddFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    /**
     * called upon page load to retrieve all movies from database
     */
    this.getMovies(); 
  }

  /**
   * retrieves all movies from database
   * @returns this.movies
   */
  getMovies(): void {
    this.getAllMovies.getAllMovies().subscribe((resp: any) => {
      console.log(resp);
      this.movies = resp;
    });
  }

  /**
   * Function that adds a movie to a user's favorite movies array
   * @param id 
   * @param Title 
   */
  addFavMovie(id: string, Title: string): void{
    this.addFavoriteMovie.addFavoriteMovie(id).subscribe((resp: any) => {
      //console.log(resp);
      this.snackBar.open(
        `${Title} added to your favorites`,
        'OK',
        {
          duration: 2000,
          verticalPosition: 'top'
        }
      );
    });
  }

  /**
   * Function that logs user out from the app
   * removes "user" and "token" items from localStorage, 
   * routes user back to the Welcome page
   */
  logOutUser(): void{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  /**
   * Function that will open the dialog when the "Go to Profile Information" button is clicked
   * @returns UserProfileComponent in dialog with information displaying username, email
   * @returns button which sends user to full user profile page
   */
  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '480px'
    });
  }

  /**
   * Function that will open the dialog displaying genre's information when "Genre" button is clicked
   * @param Name 
   * @param Description 
   */
  openGenreDialog(Name: string, Description: string): void{
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '580px',
      height: '480px'
    });
  }

  /**
   * Function that will open the dialog displaying director's information when "Director" button is clicked
   * @param Name 
   * @param Bio 
   * @param Birth 
   * @param Death 
   */
  openDirectorDialog(Name: string, Bio: string, Birth: string, Death: string): void{
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, Birth, Death },
      width: '580px',
      height: '480px'
    });
  }

  /**
   * Function that will open the dialog displaying the movie's description when "Synopsis" button is clicked
   * @param Description 
   */
  openSynopsisDialog(Description: string): void{
    this.dialog.open(MovieSynopsisComponent, {
      data: {Description},
      width: '580px',
      height: '480px'
    });
  } 

}
