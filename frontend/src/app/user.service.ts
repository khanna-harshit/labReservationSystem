import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl="http://localhost:30001/login"
  getAllUsersUrl="http://localhost:30001/users"
  constructor(private http:HttpClient) { }
  login(email:string,password:string){
	  console.log("user login : trying for authentication")
    let temp = this.http.get(this.loginUrl,{params:{email:email,password:password}})
    console.log(temp);
    return temp
  }

  getAllUsers(){
    return this.http.get(this.getAllUsersUrl)
  }
  
}
