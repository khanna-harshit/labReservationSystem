import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DataService } from '../data.service';
import { Devices } from '../models/device.model';
import { Topology } from '../models/topology.model';
import { User } from '../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modifytopology',
  templateUrl: './modifytopology.component.html',
  styleUrls: ['./modifytopology.component.css']
})
export class ModifytopologyComponent implements OnInit{
  constructor(public dataService:DataService,private router:Router,private route: ActivatedRoute){}
  user:User=new User('','','','');
  topologyInformation:Topology[]=[];
  successMsgForProject:any
  errMsgForProject:any
  extendedOrRegular:any;
  arrayOfDevicesInTopology:any[]=[];
  arrayOfDevicesToAddInTopology: any[] = [];
  access:any
  errMsg:any
  successMsg:any 
  orignalTopology:any[]=[];
  teamname:any
  topologyName:any 
  devices:Devices[]=[]
  projectname:any;
  ngOnInit(): void {
    
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      this.user=JSON.parse(atob(token?.split('.')[1]))
      this.access = this.user['accesslevel']
      this.teamname=this.user['teamname']
      if(this.access!=='admin'){
        this.router.navigate(['/read'])
      }
    this.route.paramMap.subscribe(params => {
      this.topologyName=params.get('name');
      this.loadData(this.teamname,this.topologyName);
    })
    
  }
  }
  updateUsedForForm = new FormGroup({
    'usedFor': new FormControl(),
  })
  clickedForm(topologyname:any){
   

     
        let usedFor=this.updateUsedForForm.value.usedFor;
        if (usedFor==null){
          usedFor=''
        }
        let data={
          topologyName:topologyname, 
          update:usedFor
        }
        console.log(data)
        this.dataService.updateTopologyForProject(data).subscribe((res)=>{
          this.successMsgForProject= 'Project Updated Successfully'
          console.log("topology updated added");
          this.updateUsedForForm.value.usedFor=''
        },(err)=>{
          this.errMsg='Topology name exist !';
        })
        


      
  
 
}
  loadData(teamname:any,topologyName:any){
    
    let devicesObservable=this.dataService.getAllDevices()
    let topologyObservable = this.dataService.getDataFromTopology(teamname)
    forkJoin([devicesObservable,topologyObservable]).subscribe(([devices,topologyData]) => {
    
      this.devices = devices
      this.topologyInformation=topologyData;
      console.log(devices,"devices")
      console.log(this.topologyInformation)
      for(let i=0;i<this.topologyInformation.length;i++){
          if(this.topologyInformation[i].topologyname== topologyName){
            this.orignalTopology.push(parseInt(this.topologyInformation[i].deviceid));
            this.extendedOrRegular=this.topologyInformation[i].type;
            this.projectname=this.topologyInformation[i].projectname;
            this.arrayOfDevicesToAddInTopology.push(parseInt(this.topologyInformation[i].deviceid));
          }
        else{
          this.arrayOfDevicesInTopology.push(parseInt(this.topologyInformation[i].deviceid));
        }
        }
        console.log(this.arrayOfDevicesToAddInTopology);
      })
      
  }
  clickCloseForProject(){
    this.errMsgForProject=''
    this.successMsgForProject=''
  }
  clickClose(){
    this.successMsg='';
    this.errMsg='';
  }
  deleteFromTopology(id:string){
    let ids= id;
    var index = this.arrayOfDevicesToAddInTopology.indexOf(ids);
    if (index !== -1) {
       this.arrayOfDevicesToAddInTopology.splice(index, 1);
    }
    console.log(this.arrayOfDevicesToAddInTopology)
  }
  addToTopology(id:string){
    let ids= id;
    if(!this.arrayOfDevicesToAddInTopology.includes(ids)){
      this.arrayOfDevicesToAddInTopology.push(ids);
    }
    console.log(this.arrayOfDevicesToAddInTopology);

    
  }
  clickedModify(arrayOfDevices:any,teamname:any){
    console.log(arrayOfDevices,this.orignalTopology)
    if(arrayOfDevices.toString()===this.orignalTopology.toString()){
      this.errMsg='All the devices are same !';
    }
    else{
      this.dataService.deleteFromUserdeviceinfo(this.topologyName).subscribe((res)=>{
        console.log(res);
      })
      this.dataService.deleteFromTopology(this.topologyName).subscribe((res)=>{
        
          let topologyData={
            devices:arrayOfDevices,
            name:this.topologyName,
            teamname:teamname,
            type:this.extendedOrRegular
          }
        
          this.dataService.addDataToTopology(topologyData).subscribe((res)=>{
            this.successMsg= 'Updated !';
            console.log(res.data, "topology modified added");
          },(err)=>{
            this.errMsg='Topology name exist !';
          })
        })
    
      this.dataService.deleteDataFromUserDeviceInfo(arrayOfDevices).subscribe((res)=>{
        console.log(res);
      })

    }
  }
 
  
}
