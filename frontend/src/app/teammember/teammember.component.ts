import { Topologystatus } from './../models/topologystatus.model';
import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DataService } from '../data.service';
import { Devicestatus } from '../models/devicestatus.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-teammember',
  templateUrl: './teammember.component.html',
  styleUrls: ['./teammember.component.css']
})
export class TeammemberComponent implements OnInit{
  constructor(private route: ActivatedRoute,public dataService:DataService,private router:Router){}
  memberID:any;
  user:User=new User('','','','');
  teamname:any;
  getparamid:any;
  access:any;
  successMsg:any
  errMsg:any
  startTime:any;
  scheduleDevice:Devicestatus[]=[];
  schedule:Topologystatus[]=[];
  currentDevice:Topologystatus[]=[]
  historyDevice:Topologystatus[]=[]
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
      this.route.paramMap.subscribe(params => {
        this.memberID=params.get('id');
        
      })
      this.user=JSON.parse(atob(token?.split('.')[1]))
      this.teamname=this.user['teamname']
      this.getparamid=this.user['id']
      this.access=this.user['accesslevel']
      if(this.access!=='admin'){
        this.router.navigate(['/read'])
      }
      this.loadData(this.teamname,this.memberID,this.getparamid,this.currentTime);
    }
    
  }
  loadData(teamname:any,memberID:any,getparamid:any,currentTime:Date){
    let historydeviceObservable=this.dataService.getUserDeviceHistory(memberID, currentTime)
     
      let currentdeviceObservable=this.dataService.getUserCurrentDevice(memberID, currentTime)
    
      let historytopologyObservable=this.dataService.getUserDeviceHistoryTopology(memberID, currentTime)
      let currenttopologyObservable=this.dataService.getUserCurrentDeviceTopology(memberID, currentTime)
      let scheduletopologyObservable=this.dataService.getUserScheduledDeviceTopology(memberID, currentTime)
      let scheduledeviceObservable=this.dataService.getUserScheduledDevice(memberID, currentTime)
          forkJoin([currentdeviceObservable,currenttopologyObservable,scheduledeviceObservable,scheduletopologyObservable,historydeviceObservable,historytopologyObservable]).subscribe(([current,currentTopology,schedule,scheduleTopology,history,historyTopology]) => {
            this.scheduleDevice= schedule;
            console.log(this.scheduleDevice,"schedule Device")
            this.schedule= scheduleTopology;
            console.log(this.schedule,"schedule topology")
            this.currentDevice= currentTopology;
            console.log(this.currentDevice,"current Device")
            this.historyDevice= historyTopology;
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
    this.dataService.reloadCurrentRoute()
  }
  clickedUnreserveFromSchedule(id:any){
    this.dataService.unreserveTheDeviceFromSchedule(id).then((res)=>{
      this.successMsg= res.message;
    })
    this.ngOnInit();
    this.dataService.reloadCurrentRoute()
  
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
