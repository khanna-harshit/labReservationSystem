import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DataService } from '../data.service';
import { Currentstatus } from '../models/currentstatus.model';
import { Devices } from '../models/device.model';
import { Project } from '../models/project.model';
import { Topology } from '../models/topology.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  devicesInTopology: any[]=[];
  projects:Project[]=[];
  constructor(private route: ActivatedRoute,public dataService:DataService,private router:Router){}
  access:any;
  topologyInformation:Topology[]=[];
  teamname:any;
  currentStatus:Currentstatus[]=[];
  currentStatusArr:string[]=[];
  user:User=new User('','','','');
  devices:Devices[]=[]
  getparamname:any;
  ngOnInit(): void {
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      this.user=JSON.parse(atob(token?.split('.')[1]))
      this.access = this.user['accesslevel']
      this.teamname=this.user['teamname']
      this.route.paramMap.subscribe(params => {
        this.getparamname=params.get('name');
      })
      this.loadData(this.teamname,this.getparamname);
    }
  }
  loadData(teamname:any, getparamname:any){
    let devicesObservable=this.dataService.getAllDevices()
    let currentStatusObservable = this.dataService.getCurrentStatus()
    let topologyObservable = this.dataService.getDataFromTopology(teamname)
    let projectsObservable = this.dataService.getProjects()
    forkJoin([ devicesObservable,currentStatusObservable,topologyObservable,projectsObservable]).subscribe(([devices,currentstatus,topologydata,projectdetail]) => {
      this.devices=devices
      this.projects=projectdetail
      this.currentStatus=currentstatus;
      this.topologyInformation=topologydata;
      for(let i=0;i<this.topologyInformation.length;i++){
          this.devicesInTopology.push(parseInt(this.topologyInformation[i].deviceid));
        }
      console.log(this.devices,"current status")
      for(let i=0;i<this.currentStatus.length;i++){
        this.currentStatusArr.push(this.currentStatus[i].deviceid);
      }

      // console.log(devices)
    })

  }
  getProject(project:any){
    for(let i=0;i<this.projects.length;i++){
      if(this.projects[i].projectname==project){
        return this.projects[i].type
      }
    }
    return 'regular'
  }
  deleteProject(name:any){
    this.dataService.deleteProject(name).then((res)=>{
      this.router.navigate([`/read`])
    })
  }
  
}
