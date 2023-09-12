import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from '../navbar.service';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit{
  constructor(public nav:NavbarService,public dataService:DataService,private authService:AuthService,private router:Router){
    
  }
  user:User=new User('','','','');  errMsg:any;
  successMsg:any;
  getparamid:any;
  access:any;
  ngOnInit(): void {
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      
      this.user=JSON.parse(atob(token?.split('.')[1]))
      
      this.access = this.user['accesslevel']
      this.getparamid=this.user['id']
      
    }
    
  }
  userForm = new FormGroup({
    'newpassword': new FormControl('',Validators.required),
    'confirmpassword': new FormControl('',Validators.required),
  })
  clickClose(){
    this.errMsg='';
    this.successMsg='';
  }
  onClickSubmit() {
      if(this.userForm.valid){
        if(this.userForm.value.newpassword== this.userForm.value.confirmpassword){
          let data={
            password:this.userForm.value.newpassword,
            userId:this.getparamid
          }
        
          this.authService.updatePassword(data).subscribe((res)=>{
            this.successMsg= res.message;
           
          })
         
          this.router.navigate([`/read`]);

        }
        else{
          this.errMsg= 'password not matched !';
        }
    }
    else{
      this.errMsg='All fields are required'
    }
   
   }

}
