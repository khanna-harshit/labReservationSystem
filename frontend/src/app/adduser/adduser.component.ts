import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { User } from '../models/user.model';
import * as XLSX from 'xlsx';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  constructor(public dataService:DataService,private authService:AuthService,private router:Router){}
  user:User=new User('','','','');
  access:any 
  teamname:any 
  errMsg:any 
  successMsg:any 
  file:any;
  userData:any;
  spiner=false;
  erMsg:any;
  sucMsg:any
  ngOnInit(): void {
    
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      this.user=JSON.parse(atob(token?.split('.')[1]))
      this.access = this.user['accesslevel']
      this.teamname=this.user['teamname']
      if(this.access!=='admin'){
        this.router.navigate(['/home'])
      }
      this.loadData(this.teamname);

    }
  }
  loadData(teamname:any){
    // console.log(this.user['teamname'])
    
   
   
  
  }
  uploadFile(){
    this.spiner=true;
    let errOrsuccessMsg= false;
    if(!this.file){
      errOrsuccessMsg= true;
      this.errMsg="choose a file !";
      this.spiner= false;
    }
    else{
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(this.file);
    fileReader.onload = (e) => {
      var workBook= XLSX.read(fileReader.result, {type:'binary'});
      var sheetNames = workBook.SheetNames;
     
  
      console.log(XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]));
  
      // if(jsonArray[0].length==4){
      
      this.dataService.uploadDataFromExcelUser(XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])).subscribe((res)=>{
        console.log("uploaded user information");
        this.successMsg="Uploaded !";
        this.spiner=false;
        errOrsuccessMsg= true;
  
        
      }, (err) => {
        // this.error = err.message;
        console.log(err.message);
        errOrsuccessMsg= true;
        if(err.message=='Http failure response for http://localhost:3000/users/uploadData: 404 Not Found'){
          this.successMsg='no new  user found';
        }
        else if(err.message=='Http failure response for http://localhost:3000/users/uploadData: 401 Unauthorized'){
          this.errMsg='Redundency present in data !';
        }
        else{
        this.errMsg= 'wrong file choosen !';
        }
        this.spiner=false;
        // In this block you get your error message
        // as "Failed to create new user"
    })
      
    
  }   
    }
  } 
  clickClose(){
    this.errMsg='';
    this.successMsg='';
    this.erMsg='';
    this.sucMsg='';
  }
  
changeFile(event:any){
  this.file=event.target.files[0];
  console.log(this.file);
  

} 
userForm = new FormGroup({
  'fullname': new FormControl('',Validators.required),
  'password': new FormControl('',Validators.required),
  'teamname': new FormControl('',Validators.required),
  'accesslevel': new FormControl('', Validators.required)

})
userSubmit(){
  if(this.userForm.valid){
    console.log(this.userForm.value);
    this.dataService.createData(this.userForm.value).subscribe((res)=>{
      this.sucMsg= res.message;
      // console.log("Hello")
    });
    this.userForm.reset();
 
  }
  else{
    this.errMsg = 'All fields are required';
  }
}
        


}
