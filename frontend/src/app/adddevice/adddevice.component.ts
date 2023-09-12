import { Component ,OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import * as XLSX from 'xlsx';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-adddevice',
  templateUrl: './adddevice.component.html',
  styleUrls: ['./adddevice.component.css']
})
export class AdddeviceComponent implements OnInit {
  constructor(public dataService:DataService,private authService:AuthService,private router:Router){}
  user:User=new User('','','','');
  access:any 
  getparamid:any
  teamname:any 
  errMsg:any 
  successMsg:any 
  file:any;
  userData:any;
  spiner=false;
  erMsg:any;
  sucMsg:any
  dataOfDevice:any 
  ngOnInit(): void {
    
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      this.user=JSON.parse(atob(token?.split('.')[1]))
      this.access = this.user['accesslevel']
      this.teamname=this.user['teamname']
      this.getparamid=this.user['id']
      if(this.access!=='admin'){
        this.router.navigate(['/home'])
      }
      this.loadData(this.teamname,this.getparamid);

    }
 
    
    
  }
  deviceForm = new FormGroup({
    'rack': new FormControl('',Validators.required),
    'unit': new FormControl('',Validators.required),
    'devicename': new FormControl('',Validators.required),
    'consoleip': new FormControl('', Validators.required),
    'consoleport': new FormControl('',Validators.required),
    'managementip': new FormControl('',Validators.required),
    'powercycleip': new FormControl('',Validators.required),
    'powercycleport': new FormControl('', Validators.required),
    'teamname': new FormControl('',Validators.required),
    'projectname': new FormControl('', Validators.required),
    'serialnumber':new FormControl('', Validators.required),
    'mac':new FormControl('', Validators.required),
    'tg':new FormControl('', Validators.required)
  
  
  })
  loadData(teamname:any,getparamid:any){
    let dataObservable=this.dataService.getSingleData(getparamid)
    forkJoin([dataObservable]).subscribe(([data]) => {
      this.dataOfDevice=data
      this.deviceForm.patchValue({
        'rack':this.dataOfDevice[0].rack,
        'unit':this.dataOfDevice[0][0].unit,
        'devicename':this.dataOfDevice[0][0].devicename,
        'consoleip':this.dataOfDevice[0][0].consoleip,
        'consoleport':this.dataOfDevice[0][0].consoleport,
        'managementip':this.dataOfDevice[0][0].managementip,
        'powercycleip':this.dataOfDevice[0][0].powercycleip,
        'powercycleport':this.dataOfDevice[0][0].powercycleport,
        'teamname':this.dataOfDevice[0][0].teamname,
        'projectname':this.dataOfDevice[0][0].projectname
    
      })
      
    })
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
            
            this.dataService.uploadDataFromExcel(XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])).subscribe((res)=>{
              console.log("uploaded user information");
              this.spiner=false;
              errOrsuccessMsg= true;
  
              this.successMsg="Uploaded !";
            }, (err) => {
              // this.error = err.message;
              console.log(err.message);
              if(err.message=='Http failure response for http://localhost:3000/devices/uploadData: 663 unknown'){
                this.errMsg= 'wrong file chosen !';
              }
              else if(err.message=='Http failure response for http://localhost:3000/devices/uploadData: 404 Not Found'){
                this.successMsg='no new device present !'
              }
              else{
                this.errMsg= 'redundency present in data!';

              }
              errOrsuccessMsg= true;
              this.spiner=false;
              // In this block you get your error message
              // as "Failed to create new user"
          });
            
          
        }   
          }
        }   
        changeFile(event:any){
          this.file=event.target.files[0];
          console.log(this.file);
          
      
        }
  clickClose(){
    this.errMsg='';
    this.successMsg='';
    this.erMsg='';
    this.sucMsg='';
  }
  deviceSubmit(){
    
    if(this.deviceForm.valid){
      console.log(this.deviceForm.value);
      this.dataService.addDevice(this.deviceForm.value).subscribe((res)=>{
        this.sucMsg=res.message;
        // console.log("Hello")
      });
      this.deviceForm.reset();
      
    
    }
    else{
      this.erMsg = 'All fields are required';
    }
  }
}
