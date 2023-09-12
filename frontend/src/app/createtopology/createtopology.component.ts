import { Topology } from './../models/topology.model';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Devices } from '../models/device.model';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createtopology',
  templateUrl: './createtopology.component.html',
  styleUrls: ['./createtopology.component.css']
})
export class CreatetopologyComponent implements OnInit {
  constructor(public dataService:DataService,private authService:AuthService,private router:Router){}
  user:User=new User('','','','');
  projects:Project[]=[]
  errMsg:any;
  successMsg:any;
  projectname:any;
  devices:Devices[]=[]
  access:any;
  teamname:any;
  type:any;
  arrayOfDevicesToAddInTopology:any[]=[];
  topologyInformation:Topology[]=[]
  arrayOfDevicesInTopology:any[]=[]
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
  topologyForm = new FormGroup({
    'topologyName': new FormControl('',Validators.required),
  })
  loadData(teamname:any){
    // console.log(this.user['teamname'])
    let topologyObservable = this.dataService.getDataFromTopology(teamname)
    let projectsObservable = this.dataService.getProjects()
    let devicesObservable=this.dataService.getAllDevices()
    forkJoin([projectsObservable,devicesObservable,topologyObservable]).subscribe(([projects,device,topology]) => {
    this.devices=device
    this.topologyInformation=topology
    for(let i=0;i<this.topologyInformation.length;i++){
      this.arrayOfDevicesInTopology.push(parseInt(this.topologyInformation[i].deviceid));
    }
    this.projects=projects
    console.log(this.projects)
    
  })
  }
  clickedProjectName(name:any){
    this.projectname= name;
    for(let i=0;i<this.projects.length;i++){
      if(this.projects[i].projectname==this.projectname){
        this.type=this.projects[i].type;
      }


    }
    this.arrayOfDevicesToAddInTopology=[];
  }
  addToTopology(id:string){
    let ids= id;
    if(!this.arrayOfDevicesToAddInTopology.includes(ids)){
      this.arrayOfDevicesToAddInTopology.push(ids);
    }
    console.log(this.arrayOfDevicesToAddInTopology);

    
  }
  deleteFromTopology(id:string){
    let ids= id;
    var index = this.arrayOfDevicesToAddInTopology.indexOf(ids);
    if (index !== -1) {
       this.arrayOfDevicesToAddInTopology.splice(index, 1);
    }
    console.log(this.arrayOfDevicesToAddInTopology)
  }
  clickClose(){
    this.successMsg='';
    this.errMsg='';
  }
  clickedForm(data:any,teamname:any){
    if(data.length==0){
      this.errMsg='Select devices to add in topology '
    }
    else{
    if(this.topologyForm.valid){

      let topologyData={
        devices:data,
        name:this.topologyForm.value.topologyName,
        type:this.type,
        teamname: teamname
      
      }
      this.dataService.addDataToTopology(topologyData).subscribe((res)=>{
        this.successMsg= res.message;
        console.log(res.data, "topology data added");
      },(err)=>{
        this.errMsg='Topology name exist !';
      })
      this.dataService.deleteDataFromUserDeviceInfo(data).subscribe((res)=>{
        console.log(res);
      })
  
    }
    else{
      this.errMsg='Enter all the fields !';
    }
    
  }
  }
}
