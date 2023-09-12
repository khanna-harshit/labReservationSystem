import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registerproject',
  templateUrl: './registerproject.component.html',
  styleUrls: ['./registerproject.component.css']
})
export class RegisterprojectComponent implements OnInit{
  constructor(public dataService:DataService,private authService:AuthService,private router:Router){}
  errMsg='';
  taken='';
  successMsg=''
  ngOnInit(): void {
    
  }
  projectDetailsForm = new FormGroup({
    'projectname': new FormControl('',Validators.required),
    'teamname': new FormControl('', Validators.required),
    'type': new FormControl('', Validators.required)
  })
  clickClose(){
    this.successMsg='';
    this.errMsg='';
  }
  projectSubmit(){
    if(this.projectDetailsForm.valid){
      // let err=false;
      
      let data={
        projectname:this.projectDetailsForm.value.projectname,
        teamname:this.projectDetailsForm.value.teamname,
        type:this.projectDetailsForm.value.type
      }
      
        this.dataService.registerProject(data).subscribe((res)=>{
            console.log(res.data);
            this.successMsg='registered !'
            
        }, (err)=>{
          this.taken= 'yes';
          this.successMsg= '';
          this.errMsg= "Project name already taken";
        })
    }
    else{
      this.errMsg='All fields are required !'
    }
  }


}
