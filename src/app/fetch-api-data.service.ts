import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://the-greatest.herokuapp.com/';  //**PLEASE PUT YOUR OWN API URL HERE!!!
@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  //Inject the HttpClient module to the constructor params
  //This will provide the HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  } 

  //making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.' 
    );
  }
}

export class UserLoginService {
  constructor(private http: HttpClient){
  }

  //making the api call to the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

export class GetAllMoviesService {
  constructor(private http: HttpClient){
  }

  //making the api call to the get movies endpoint
  public getAllMovies(movieDetails: any): Observable<any> {
    console.log(movieDetails);
    return this.http.get(apiUrl + 'movies', movieDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status Code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

export class GetOneMovieService {
  constructor(private http: HttpClient){
  }

  //making the api call to get single movie endpoint
  public getOneMovie(movieDetails: any): Observable<any> {
    console.log(movieDetails);
    return this.http.get(apiUrl + 'movies/:Title', movieDetails).pipe(   //review the writing of this endpoint
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

export class GetDirectorService {
  constructor(private http: HttpClient) {
  }

  //making the api call to get director endpoint
  public getDirector(movieDetails: any): Observable<any> {
    console.log(movieDetails);
    return this.http.get(apiUrl + 'movies/Directors/:Name', movieDetails).pipe(  //review the writing of this endpoint
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + 
        `Error body is ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later'
    );
  }
}

export class GetGenreService {
  constructor(private http: HttpClient) {
  }

  //making the api call to get genre endpoint
  public getGenre(movieDetails: any): Observable<any> {
    console.log(movieDetails);
    return this.http.get(apiUrl + 'movies/Genre/:Name', movieDetails).pipe(    //review the writing of this endpoint
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later'
    );
  }
}

export class GetUserService {
  constructor(private http: HttpClient) {
  }

  //making the api call to get user endpoint (I am assuming a single user?)
  public getUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + 'users/:username', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

export class GetFavoriteMoviesService{
  constructor(private http: HttpClient) {
  }

  //making api call to get the user's favorite movies
  public getFavoriteMovies(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + 'users/:username/movies/:movieID', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

export class AddFavoriteMovieService {
  constructor(private http: HttpClient) {
  }

  //making an api call to add a favorite movie
  public addFavoriteMovie(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.put(apiUrl + 'users/:username/movies/:movieID', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

export class EditUserService {
  constructor(private http: HttpClient) {
  }

  //making an api call to edit the user's information
  public editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.put(apiUrl + 'users/:username', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

export class DeleteUserService {
  constructor(private http: HttpClient) {
  }

  //making an api call to delete user
  public deleteUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.delete(apiUrl + 'users/:username', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

export class DeleteFavoriteMovieService {
  constructor(private http: HttpClient) {
  }

  //making an api call to delete a favorite movie
  public deleteFavoriteMovie(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.delete(apiUrl + 'users/:username/movies/:movieID', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occcured:', error.error.message);
    } else {
      console.error(
        `Error status is ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened: please try again later.'
    );
  }
}

export class FetchApiDataService {

  constructor() { }
}
