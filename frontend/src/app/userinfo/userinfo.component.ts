import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { User } from '../models/user.model';
import { Devicestatus } from '../models/devicestatus.model';
import { Topologystatus } from '../models/topologystatus.model';
import { forkJoin } from 'rxjs';
import { Topology } from '../models/topology.model';
import { Project } from '../models/project.model';
import { Devices } from '../models/device.model';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit{
  constructor(private route: ActivatedRoute,public dataService:DataService, private router:Router){}
  getparamid:any;
  user:User=new User('','','','');
  teamname:any;
  projects:Project[]=[];
  access:any;
  successMsg:any
  errMsg:any
  startTime:any;
  topologyInformation:Topology[]=[];
  scheduleDevice:Devicestatus[]=[];
  schedule:Topologystatus[]=[];
  currentDevice:Topologystatus[]=[]
  historyDevice:Topologystatus[]=[]
  historyDevic:Topologystatus[]=[]
  devices:Devices[]=[]
  current:Devicestatus[]=[];
  history:any;
  currentTime:any;
  ngOnInit(): void {
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
      let offset= ISToffSet*60*1000;
      let date=new Date();
      this.startTime=new Date(date.getTime()+offset);
      this.currentTime=this.startTime.toISOString().substring(0,16);
      this.user=JSON.parse(atob(token?.split('.')[1]))
      this.teamname=this.user['teamname']
      this.getparamid=this.user['id']
      this.access=this.user['accesslevel']
      this.loadData(this.teamname,this.getparamid,this.currentTime);
    }
    
  }
  loadData(teamname:any,getparamid:any,currentTime:Date){
    console.log(currentTime)
    console.log(getparamid)
    let historydeviceObservable=this.dataService.getUserDeviceHistory(getparamid, currentTime)
      let currentdeviceObservable=this.dataService.getUserCurrentDevice(getparamid, currentTime)
      let topologyObservable = this.dataService.getDataFromTopology(teamname)
      let projectsObservable = this.dataService.getProjects()
      let devicesObservable=this.dataService.getAllDevices()
      let historytopologyObservable=this.dataService.getUserDeviceHistoryTopology(getparamid, currentTime)
      let currenttopologyObservable=this.dataService.getUserCurrentDeviceTopology(getparamid, currentTime)
      let scheduletopologyObservable=this.dataService.getUserScheduledDeviceTopology(getparamid, currentTime)
      let scheduledeviceObservable=this.dataService.getUserScheduledDevice(getparamid, currentTime)
          forkJoin([devicesObservable,projectsObservable,topologyObservable,currentdeviceObservable,currenttopologyObservable,scheduledeviceObservable,scheduletopologyObservable,historydeviceObservable,historytopologyObservable]).subscribe(([devices,projects,topology,current,currentTopology,schedule,scheduleTopology,history,historyTopology]) => {
            this.scheduleDevice= schedule;
            this.projects=projects
            this.devices=devices

            this.topologyInformation=topology;
            console.log(this.scheduleDevice,"schedule Device")
            this.schedule= scheduleTopology;
            console.log(this.schedule,"schedule topology")
            this.currentDevice= currentTopology;
            console.log(this.currentDevice,"current Device")
            this.historyDevice= historyTopology;
            // this.historyDevice=this.historyDevic.reverse()
            // this.historyDevice.reverse()
            if(this.historyDevic.length-16<0){
              for(let i=this.historyDevic.length-1;i>=0;i--){
                this.historyDevice.push(this.historyDevic[i])
              }
            }
            else{
            for(let i=this.historyDevic.length-1;i>this.historyDevic.length-16;i--){
              this.historyDevice.push(this.historyDevic[i])
            }
          }
            console.log(this.historyDevice,"history device")
            this.current= current;
            console.log(this.current,"current topology")
            this.history= history;
            console.log(this.history,"history topology")

          })
  }
 
  clickedUnreserveFromCurrentDevice(id:any){
    this.dataService.unreserveTheDeviceFromCurrent(id, this.currentTime).then((res)=>{
      this.successMsg = res.message;
      console.log(this.successMsg);
    })
    this.dataService.reloadCurrentRoute();
  }
 
  clickedUnreserveFromSchedule(id:any){
    this.dataService.unreserveTheDeviceFromSchedule(id).then((res)=>{
      this.successMsg= res.message;
    })
    this.ngOnInit();
    this.dataService.reloadCurrentRoute()
  
  }
  getProjectType(devicename:any){
    let device_id= this.devices.filter((d: any) => d['devicename'] == devicename)[0]['id']
    let project_name= this.devices.filter((d: any) => d['devicename'] == devicename)[0]['projectname']


    let project_type= this.projects.filter((d: any) => d['projectname'] == project_name)[0]['type']
    return project_type
    
        
  }
  getDeviceId(devicename:any){
    let device_id= this.devices.filter((d: any) => d['devicename'] == devicename)[0]['id']
    return device_id
  }
  
  clickedUnreserveFromCurrentTopology(id:any, type:any, name:any, time:any){
    if(type=='topology'){
     
      this.dataService.unreserveTheDeviceFromCurrentTopology(id, name,time).then((res)=>{
          console.log(res, "hello india");
      })
        // console.log("in am harshit khanna");
    }
    this.ngOnInit();
   this.dataService.reloadCurrentRoute()
  
  }
  clickedUnreserveFromScheduleTopology(id:any, type:any, name:any, time:any){
    if(type=='topology'){
     
      this.dataService.unreserveTheDeviceFromScheduleTopology(id, name,time).then((res)=>{
          console.log(res);
      })
    }
    this.ngOnInit();
    this.dataService.reloadCurrentRoute()
  
  }
}



