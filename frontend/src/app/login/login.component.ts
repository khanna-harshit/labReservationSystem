import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private authService:AuthService,private router:Router) { }
  loginForm:FormGroup=new FormGroup({})
  invalidCredentials=false
  errMsg:any;
  ngOnInit(): void {
    if(localStorage.getItem('access_token')){
      this.router.navigate(['/home'])
    }
    this.loginForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required])
    })
  }

  submitForm(){
	  console.log(this.loginForm.get('email')?.value)
	  console.log(this.loginForm.get('password')?.value)
    this.authService.login(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).subscribe((res)=>{
	    console.log("subscribe returned")
	    console.log(res)
      if(res != null ){
      if(!res['user_found']){
	      console.log("user not found")
        this.errMsg='wrong credentials !';
        this.invalidCredentials=true
      }
      else{
	      console.log("user found")
        this.invalidCredentials=false
        if(this.loginForm.get('password')?.value==='welcome123'){
          this.router.navigate(['/changepassword'])
        }
        else{
        this.router.navigate(['/home'])
        }
      }
      }
    },(error:HttpErrorResponse) => console.log(error))
  }
  clickClose(){
    this.errMsg='';
  }

}
