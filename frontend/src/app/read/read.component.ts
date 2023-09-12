import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Topology } from '../models/topology.model';
import { Currentstatus } from '../models/currentstatus.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { forkJoin, Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { Devices } from '../models/device.model';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit{
  user:User=new User('','','','');
  currentStatusArr:string[]=[];
  constructor(public dataService:DataService,private authService:AuthService,private router:Router){}
  access:any;
  topologyname:string[]=[]
  teamname:any
 
  projects:Project[]=[];
  devices:Devices[]=[]
  topologyInformation:Topology[]=[];
  currentStatus:Currentstatus[]=[];
  currentStatusTopology:Currentstatus[]=[]
  devicesInTopology:any[]=[]
  ngOnInit(): void {
   
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      this.user=JSON.parse(atob(token?.split('.')[1]))
      this.access = this.user['accesslevel']
      this.teamname=this.user['teamname']
      this.loadData(this.teamname);
    }
  }
  loadData(teamname:any){
    // console.log(this.user['teamname'])
    let topologyObservable = this.dataService.getDataFromTopology(teamname)
    let currentStatusObservable = this.dataService.getCurrentStatus()
    let projectsObservable = this.dataService.getProjects()
    let currentStatusTopologyObservable= this.dataService.getCurrentStatusTopology();
    let devicesObservable=this.dataService.getAllDevices()
    forkJoin([topologyObservable, currentStatusObservable,currentStatusTopologyObservable,projectsObservable, devicesObservable]).subscribe(([topology, currentstatus,currentStatusTopology,projects,devices]) => {
    this.topologyInformation=topology;
    for(let i=0;i<this.topologyInformation.length;i++){
      if(!this.topologyname.includes(this.topologyInformation[i].topologyname)){
        this.topologyname.push(this.topologyInformation[i].topologyname);
      }
    }
    for(let i=0;i<this.topologyInformation.length;i++){
        this.devicesInTopology.push(parseInt(this.topologyInformation[i].deviceid));
      }
    console.log(this.topologyInformation)
    this.currentStatus=currentstatus;
    for(let i=0;i<this.currentStatus.length;i++){
      this.currentStatusArr.push(this.currentStatus[i].deviceid);
    }
    this.currentStatusTopology=currentStatusTopology
    this.projects=projects
    console.log(this.projects)
    this.devices=devices
    // console.log("hat")
    // console.log(devices)
  })
  }
  filter_used_for(topology_name:any){
    for(let i=0;i<this.topologyInformation.length;i++){
      if(this.topologyInformation[i].topologyname==topology_name){
        console.log(this.topologyInformation[i])
        if(this.topologyInformation[i].usedFor.length!=0){
        return this.topologyInformation[i].usedFor
        }
        return '-1';
      
      }
    }
    return '-1'

  }
  UserData(name:any){
    let data:any;
      for(let j=0;j<this.topologyInformation.length;j++){
        if(name==this.topologyInformation[j].topologyname){
             return this.topologyInformation[j].deviceid.toString();
          }
        }
        return (-1).toString();
      }
    getProject(project:any){
      for(let i=0;i<this.projects.length;i++){
        if(this.projects[i].projectname==project){
          return this.projects[i].type
        }
      }
      return 'regular'
    }
}
