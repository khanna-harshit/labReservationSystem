import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { User } from '../models/user.model';
import { forkJoin, Observable, of } from 'rxjs';
import { Topology } from '../models/topology.model';
import { Currentstatus } from '../models/currentstatus.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-topologydetail',
  templateUrl: './topologydetail.component.html',
  styleUrls: ['./topologydetail.component.css']
})
export class TopologydetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,public dataService:DataService){}
  user:User=new User('','','','');
  access:any
  teamname:any
  showTime:any;
  successMsg:any;
  name:any;
  timeSlotForTopology:any;
  errMsg:any;
  topologyname:any
  topologyInformation:Topology[]=[];
  currentStatus:Currentstatus[]=[];
  currentStatusArr:string[]=[];
  extended:any;
  startTime:any
  endTime:any 
  sTime:any 
  eTime:any 
  currentTime:any 
  showCurrentTime:any 
  extendedTimeInterval:any

  showSelectTime='yes';
  hideSelectTime='yes';
  timeInterval =[{
    id:1,
    startTime: '00:00',
    endTime: '01:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:2,
    startTime: '01:00',
    endTime: '02:00 ',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:3,
    startTime: '02:00',
    endTime: '03:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:4,
    startTime: '03:00',
    endTime: '04:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:5,
    startTime: '04:00',
    endTime: '05:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:6,
    startTime: '05:00',
    endTime: '06:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:7,
    startTime: '06:00',
    endTime: '07:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:8,
    startTime: '07:00',
    endTime: '08:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:9,
    startTime: '08:00',
    endTime: '09:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:10,
    startTime: '09:00',
    endTime: '10:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:11,
    startTime: '10:00',
    endTime: '11:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:12,
    startTime: '11:00',
    endTime: '12:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'
  },
  {
    id:13,
    startTime: '12:00',
    endTime: '13:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'
  },
  {
    id:14,
    startTime: '13:00',
    endTime: '14:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:15,
    startTime: '14:00',
    endTime: '15:00 ',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:16,
    startTime: '15:00',
    endTime: '16:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:17,
    startTime: '16:00',
    endTime: '17:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:18,
    startTime: '17:00',
    endTime: '18:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:19,
    startTime: '18:00',
    endTime: '19:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:20,
    startTime: '19:00',
    endTime: '20:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:21,
    startTime: '20:00',
    endTime: '21:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:22,
    startTime: '21:00',
    endTime: '22:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:23,
    startTime: '22:00',
    endTime: '23:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  },
  {
    id:24,
    startTime: '23:00',
    endTime: '24:00',
    status:'no',
    user:'none',
    topology_slot:'no',
    showHistory:'no',
    extended_slot:'no'

  }
 
];
  selectTime:any
  getparamid:any;
  showDeviceInfo:any;
  isTakenForTopology:any;
  ngOnInit(): void {
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      console.log("running topology details...")
      let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
      let offset= ISToffSet*60*1000;
      let date=new Date();
      this.startTime=new Date(date.getTime()+offset);
      this.endTime= new Date(date.getTime()+offset);
      this.endTime.setDate(this.endTime.getDate() + 10);
     
      this.startTime=this.startTime.toISOString().substring(0,16);
      this.endTime= this.endTime.toISOString().substring(0,16);
      this.sTime= this.startTime.substring(0, 10);
      this.eTime= this.endTime.substring(0, 10);
     
      this.currentTime= this.startTime.substring(11, 16);
      this.showCurrentTime=this.startTime.substring(0, 10);
      this.user=JSON.parse(atob(token?.split('.')[1]))
      this.access = this.user['accesslevel']
      
      this.route.paramMap.subscribe(params => {
        this.topologyname=params.get('name');
      })
      this.teamname=this.user['teamname']
      this.getparamid=this.user['id']
      this.name=this.user['name']
      
    }
    console.log("testing...")
   this.loadData(this.teamname,this.getparamid, this.topologyname,this.startTime)
    
  }
  loadData(teamname:any,getparamid:any,topologyname:any,startTime:any){
    let selectTimeObservable=this.dataService.selectTimeForTopology(topologyname, getparamid,startTime.substring(0, 11))

    console.log(topologyname,"testing1...")
  
    let timeInformationObservable=this.dataService.getExtendedTimeInformation(topologyname)
    console.log(timeInformationObservable)
    let topologyObservable = this.dataService.getDataFromTopology(teamname)
    console.log(topologyObservable)
    let currentStatusObservable = this.dataService.getCurrentStatus()
    console.log(currentStatusObservable)
    forkJoin([topologyObservable,currentStatusObservable,timeInformationObservable,selectTimeObservable]).subscribe(([topologydata,currentstatus,timeinformation,selectTimeData]) => {
     
      this.currentStatus=currentstatus;
      console.log(this.currentStatus,"current status")
      for(let i=0;i<this.currentStatus.length;i++){
        this.currentStatusArr.push(this.currentStatus[i].deviceid);
      }
      this.topologyInformation=topologydata;
     console.log(this.topologyInformation, "topology details")
      for(let i=0;i<this.topologyInformation.length;i++){
        if(this.topologyInformation[i].topologyname==this.topologyname){
          this.extended=this.topologyInformation[i].type;
        }
     }
     console.log(this.extended, "extended")
     this.extendedTimeInterval = timeinformation;
     console.log(this.extendedTimeInterval,"extended Time Interval")
     this.selectTime=selectTimeData
    for(let i=0;i<this.selectTime.length;i++){
      for(let j=0;j<this.timeInterval.length;j++){
        if(this.selectTime[i].timeid==this.timeInterval[j].id && this.selectTime[i].status!=='deleted'){
          this.timeInterval[j].topology_slot= 'yes';
          this.showDeviceInfo= "yes";
          this.timeInterval[j].showHistory='yes';
          this.timeInterval[j].user= this.selectTime[i].name;
      }
      }
    }
    for(let i=0;i<this.timeInterval.length;i++){
      const d1 = new Date(2018, 11, 24, parseInt(this.currentTime.substring(0,2)), parseInt(this.currentTime.substring(3,5)));
      const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
      
      if(d2<d1){
        this.isTakenForTopology= false;
        this.timeInterval[i].topology_slot='invalid';
      }
    }
    })
    
    
  }
  dateForm = new FormGroup({
    'startDate': new FormControl('',Validators.required),
    'endDate': new FormControl('', Validators.required)
  
  })
  clickClose(){
    this.successMsg='';
    this.errMsg='';
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
    clickedTimeSlot(id:any, startTime:any, endTime:any){
      this.timeSlotForTopology= id;
      console.log(id);
  }
  clickChangeButton(){
    this.dataService.reloadCurrentRoute();
  }
  updateDeviceForTopology(id:any, nameOfTopology:any){
    let sTime="dn";
    let eTime= "bud";

    for(let i=0;i<this.timeInterval.length;i++){
      if(this.timeInterval[i].id==id){
        sTime= this.startTime.substring(0, 11)+this.timeInterval[i].startTime;
        eTime= this.startTime.substring(0, 11)+this.timeInterval[i].endTime;
      }
    }
    let paramid = this.getparamid;
    let accesslevel = this.access;
    let timeId= id;
    let deviceid: string[] = [];


    for(let i=0;i<this.topologyInformation.length;i++){
      // console.log(this.topologyInformation.topologyname, this.topologyname);
      if(this.topologyInformation[i].topologyname==nameOfTopology){
        
        deviceid.push(this.topologyInformation[i].deviceid);
      }
    }
    console.log(deviceid, 'deviceid');
    
    let data={
        name:this.name,
        team:this.teamname,
        timeid: timeId,
        DeviceId: deviceid,
        uId:this.getparamid,
        startTime:sTime,
        endTime:eTime

      }
     
      this.dataService.updateDeviceForTopology(data, this.getparamid).subscribe((res)=>{
        this.dataService.reloadCurrentRoute()

      }, (err)=>{
        this.errMsg='Selected time slot is not available, Please refresh the page to see the latest available time slot :(';
      })
      
      

    
   

  }
  clickedSelectTime(){
    if(this.dateForm.valid){
      
      let stDate= this.dateForm.value.startDate;
      let enDate= this.dateForm.value.endDate;
      let s1= new Date();
      let s2= new Date();
      if(this.dateForm.value.startDate){
        s1= new Date(this.dateForm.value.startDate);
        console.log("start Date");
      }
      if(this.dateForm.value.endDate){
        s2= new Date(this.dateForm.value.endDate);
      }
      
      if(s1<=s2){
        let data={
          sDate:stDate,
          eDate:enDate,
          name:this.topologyname
        }
        let deviceid: any[]=[];
        for(let i=0;i<this.topologyInformation.length;i++){
          // console.log(this.topologyInformation.topologyname, this.topologyname);
          if(this.topologyInformation[i].topologyname==this.topologyname){
            
            deviceid.push(this.topologyInformation[i].deviceid);
          }
        }
        // console.log(this.dateForm.value.startDate, this.dateForm.value.endDate);
        this.dataService.getExtendedTimeSlotInformation(data).subscribe((res)=>{
         
      
            let data={
              name:this.name,
              team:this.teamname,
              DeviceId: deviceid,
              uId:this.getparamid,
              endDate:this.dateForm.value.endDate,
              startDate:this.dateForm.value.startDate
            }
            console.log(data);
            this.dataService.updateDeviceForTopologyExtended(data, this.getparamid).subscribe((res)=>{
              console.log(res, "updated userdeviceinfo");
              this.dataService.reloadCurrentRoute()
            }, (err)=>{
              this.errMsg='Selected time slot is not available, Please refresh the page to see the latest available time slot :(';
            })
        },(err)=>{
          this.errMsg='Selected time slot is not available, Please refresh the page to see the latest available time slot :(';
          this.hideSelectTime='';
          this.showTime='yes';
          this.showSelectTime='';
        })
    }
    else{
      this.errMsg='select proper date';
    }
    }
    else{
      this.errMsg= 'select date';
    }
  }
}
