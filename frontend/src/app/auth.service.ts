import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersUrl='http://localhost:30001/users'
  public _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  private readonly TOKEN_NAME='access_token'
  user: any;
  isLoggedIn= this._isLoggedIn$.asObservable();
  constructor(private userService:UserService,private router:ActivatedRoute, private route: Router,private http:HttpClient) {
    
    this._isLoggedIn$.next(!!this.token)
    if(this.token!=null)
    this.user=this.getUser(this.token)
   }

   get token(){
    return localStorage.getItem(this.TOKEN_NAME)
   }

  login(email:string,password:string){
	  console.log("trying authenticationf for a user")
    return this.userService.login(email,password).pipe(tap((res:any)=>{
	    console.log("result is")
	    console.log(res)
      if(res != null) {
	      if(res['user_found']){
        this._isLoggedIn$.next(true)
        localStorage.setItem(this.TOKEN_NAME,res['accesstoken'])
        
        this.user=this.getUser(res['accesstoken']);
      }}
    },(error:HttpErrorResponse) => console.log(error)))
  }
  updatePassword(data:any):Observable<any>{
    return this.http.post(`${this.usersUrl}/changepassword`, data);
 }

  logout(){
      localStorage.removeItem(this.TOKEN_NAME)
      this._isLoggedIn$.next(false)
  }

  private getUser(token:string):User{
    return JSON.parse(atob(token.split('.')[1])) as User;
  }
}
