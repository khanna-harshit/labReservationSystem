import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DataService } from '../data.service';
import { Devices } from '../models/device.model';
import { User } from '../models/user.model';


@Component({
  selector: 'app-devicedetails',
  templateUrl: './devicedetails.component.html',
  styleUrls: ['./devicedetails.component.css']
})
export class DevicedetailsComponent implements OnInit{
  showDeviceInformat: any;
  constructor(private route: ActivatedRoute,public dataService:DataService){}
  startTime:any;
  extended:any;
  extendedTimeInterval:any;
  showDeviceInformation:any;
  type:any;
  name:any;
  regular1EndTime:any
  regular2EndTime:any
  getuserid:any;
  endTime:any;
  topologyname:any;
  timeInterval= [{
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
  sTime:any;
  eTime:any;
  currentTime:any;
  hideSelectTime='yes';
  reservedata:any;
  showCurrentTime:any;
  user:User=new User('','','','');
  access:any
  errMsg:any;
  showSelectTime='yes';
  showTime:any;
  successMsg:any;
  dateAndTimeInfo:any;
  teamname:any
  getparamid:any
  ngOnInit(): void {
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
      let offset= ISToffSet*60*1000;
      let date=new Date();
      this.startTime=new Date(date.getTime()+offset);
      this.endTime= new Date(date.getTime()+offset);
      this.regular1EndTime = new Date(date.getTime()+offset);
      this.regular2EndTime = new Date(date.getTime()+offset);
      this.endTime.setDate(this.endTime.getDate() + 10);
      this.regular1EndTime.setDate(this.regular1EndTime.getDate() + 30);
      this.regular2EndTime.setDate(this.regular2EndTime.getDate() + 180);

      this.startTime=this.startTime.toISOString().substring(0,16);
      this.endTime= this.endTime.toISOString().substring(0,16);
      this.regular1EndTime= this.regular1EndTime.toISOString().substring(0, 16);
      this.regular2EndTime= this.regular2EndTime.toISOString().substring(0, 16);
      this.sTime= this.startTime.substring(0, 10);
      this.eTime= this.endTime.substring(0, 10);
      this.currentTime= this.startTime.substring(11, 16);
      this.showCurrentTime=this.startTime.substring(0, 10);
      this.user=JSON.parse(atob(token?.split('.')[1]))
      this.access = this.user['accesslevel']
      
      this.route.paramMap.subscribe(params => {
        this.topologyname=params.get('name');
        this.type=params.get('type')
        this.getparamid=params.get('id');
        this.extended=this.type;

      })
      this.teamname=this.user['teamname']
      this.name=this.user['name']
      this.getuserid=this.user['id']
      
      this.loadData(this.teamname,this.getparamid, this.topologyname,this.startTime,this.currentTime)
    }
  }
  loadData(teamname:any , getparamid:any , topologyname:any,startTime:any,currentTime:any){
    // console.log(timeInterval)
    console.log('testing...')
    console.log(getparamid,startTime,currentTime);
    let devicedataObservable=this.dataService.getSingleData(getparamid);
    console.log(devicedataObservable)
    let selectTimeObservable=this.dataService.selectTimeFordevice(getparamid, startTime.substring(0, 11))
    console.log(selectTimeObservable)
    let ectendedTimeSlotInfoObservable=this.dataService.getExtendedTimeSlotInfo(getparamid)
    console.log(ectendedTimeSlotInfoObservable)
    forkJoin([selectTimeObservable, devicedataObservable,ectendedTimeSlotInfoObservable]).subscribe(([selectTime,devicedata,extendedInformation]) => {

      this.reservedata=devicedata;
      console.log(this.reservedata)
      this.extendedTimeInterval=extendedInformation
      this.dateAndTimeInfo= selectTime;
      console.log(this.dateAndTimeInfo)
      for(let i=0;i<this.dateAndTimeInfo.length;i++){
        for(let j=0;j<this.timeInterval.length;j++){
          if(this.dateAndTimeInfo[i].timeid==this.timeInterval[j].id && this.dateAndTimeInfo[i].status!=='deleted'){
              this.timeInterval[j].status= 'yes';
              this.showDeviceInformation="yes";
              this.timeInterval[j].showHistory='yes';
              this.timeInterval[j].user=this.dateAndTimeInfo[i].name;
          }
    
        }
      }
      
      for(let i=0;i<this.timeInterval.length;i++){
        const d1 = new Date(2018, 11, 24, parseInt(currentTime.substring(0,2)), parseInt(currentTime.substring(3,5)));
        const d2 = new Date(2018, 11, 24, parseInt(this.timeInterval[i].endTime.substring(0,2)), parseInt(this.timeInterval[i].endTime.substring(3,5)));
        
        if(d2<d1){
          this.timeInterval[i].status='invalid';
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
  clickChangeButton(){
    this.dataService.reloadCurrentRoute();
  }
  clickedTimeInterval(id:any, startTime:any, endTime:any){
    let ids= id;
    let starttime= startTime;
    let endtime= endTime;
    this.showDeviceInformat= ids;
    console.log(this.showDeviceInformat);

  }
  clickedSelectTime(){
    if(this.dateForm.valid){
      
      let stDate= this.dateForm.value.startDate;
      let enDate= this.dateForm.value.endDate;
      
      console.log(stDate, enDate);
      let s1= new Date();
      let s2= new Date();
      let s1t= new Date();
      let s2t= new Date();
      let sTime=new Date()
      let eTime=new Date()
      let finalSTime='';
      let finalETime='';
      if(this.dateForm.value.startDate){

        s1= new Date(this.dateForm.value.startDate.substring(0, 10));
        s1t= new Date(this.dateForm.value.startDate);

        finalSTime=s1.toISOString().substring(0, 11)+this.dateForm.value.startDate.substring(11, 16);
    
    
        // sTime=sTime.toISOString();
        console.log("start Date", finalSTime);
      }
      if(this.dateForm.value.endDate){
        s2= new Date(this.dateForm.value.endDate.substring(0, 10));
        s2t= new Date(this.dateForm.value.endDate);

        
    
        finalETime=s2.toISOString().substring(0, 11)+this.dateForm.value.endDate.substring(11, 16);
        console.log("start Date", finalETime);
        console.log(s2);
      }
      
      if(s1t<=s2t && s2t>=new Date(this.startTime)){
        let data={
          sDate:finalSTime,
          eDate:finalETime,
          deviceId:this.getparamid
        }
        this.dataService.getExtendedTimeSlotInformationDevice(data).subscribe((res)=>{
         
            let data={
              name:this.name,
              team:this.teamname,
              deviceId: this.getparamid,
              uId:this.getuserid,
              endDate:finalETime,
              startDate:finalSTime
      
            }
           
            this.dataService.updateDeviceForExtended(data, this.getuserid).subscribe((res)=>{
              console.log(res, "updated userdeviceinfo");
              this.dataService.reloadCurrentRoute()
            },(err)=>{
              this.errMsg='Selected time slot is not available, Please refresh the page to see the latest available time slot :(';
              this.hideSelectTime='';
              this.showTime='yes';
              this.showSelectTime='';
            })
        }, (err)=>{
           this.errMsg='Device is reserved for the selected date and time !'
        })
              }
        else{
          this.errMsg='select proper date and time';
        }
      }
    else{
      this.errMsg= 'select date time';
    }
  }
  updateDevice(timeId:any){
      
      
    let sTime="dn";
    let eTime= "bud";
    for(let i=0;i<this.timeInterval.length;i++){
      if(this.timeInterval[i].id==timeId){
        sTime= this.startTime.substring(0, 11)+this.timeInterval[i].startTime;
        eTime= this.startTime.substring(0, 11)+this.timeInterval[i].endTime;
      }
    }
    let timeid= timeId;
    let userid=this.getuserid;
    let paramid= this.getparamid;
    let accesslevel = this.access;
    
 
      let data={
          name:this.name,
          time: new Date(),
          status:'Uneserved',
          UId: paramid,
          id:this.getuserid,
          teamname:this.teamname,
          starttime: sTime,
          endtime: eTime,
          timeid:timeId

          
      }
      // this.api.updateDevice(this.getparamid, data).subscribe((res)=>{
        this.dataService.updateuserdeviceinfo(this.getparamid, this.getuserid, data).subscribe((res)=>{
     
           this.dataService.reloadCurrentRoute()
          
        }, (err)=>{
          this.errMsg='Selected time slot is not available, Please refresh the page to see the latest available time slot :(';
        })
      
    // });
  
    
    
  }
  
}
