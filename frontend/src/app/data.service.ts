import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  projectsUrl=`http://localhost:30001/projects`
  projectTopologyUrl=`http://localhost:30001/project`
  usersUrl = `http://localhost:30001/users`
  topologyUrl = `http://localhost:30001/topology`
  devicesUrl = `http://localhost:30001/devices`
  userdeviceinfoUrl = `http://localhost:30001/userdeviceinfo`

  constructor(private router:ActivatedRoute, private route: Router,private http:HttpClient) { }
  getProjects(){
    return axios.get(this.projectsUrl).then(res => {
      return res.data
    }).catch(error => console.log(error))
  }
  updateTopologyForProject(data:any){
    
    return this.http.post(`${this.topologyUrl}/usedFor/update/`, data);

  }
  getAllUser(){
    return axios.get(this.usersUrl).then(res => {
      return res.data
    }).catch(error => console.log(error))
  }
  getAllDevices(){
    return axios.get(this.devicesUrl).then(res => {
      return res.data
    }).catch(error => console.log(error))
  }
  getExtendedTimeInformation(name:any){
    return axios.get(`${this.userdeviceinfoUrl}/${name}`).then(res => {
      return res.data
    }).catch(error => console.log(error))
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    console.log(currentUrl);
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        console.log('hello')
        this.route.navigate([currentUrl]);
    });
  }
  
  getSingleData(id:any){
    return axios.get(`${this.devicesUrl}/${id}`).then(res => {
      return res.data
    }).catch(error => console.log(error))
  }
  deleteProject(name:any){
    return axios.delete(`${this.projectTopologyUrl}/${name}`).then(res => {
      return res.data
    }).catch(error => console.log(error))
  }
  getExtendedTimeSlotInfo(id:any){
    return axios.get(`${this.devicesUrl}/${id}/get/information`).then(res => {
      return res.data
    }).catch(error => console.log(error))
  }
  getCurrentStatusTopology(){
    return axios.get(this.projectTopologyUrl).then(res => {
      return res.data
    }).catch(error => console.log(error))
  }
  getCurrentStatus(){
    return axios.get(this.userdeviceinfoUrl).then(res => {
      return res.data
    }).catch(error => console.log(error))
  }
  getDataFromTopology(teamname:any){
    return axios.get(this.topologyUrl,{params:{teamname:teamname}}).then(res => {
      return res.data
    }).catch(error => console.log(error))
  }
  getUserCurrentDevice(id:any, currentTime:any){
   
    let ids= id;
    let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
    let updatedTime= dateTime.replaceAll('-', '_');
  
    return axios.get(`${this.userdeviceinfoUrl}/${ids}/${updatedTime}/current/device/status`).then(res=>{
      console.log(res.data,"current device")
      return res.data
    }).catch(error => console.log(error))
  }
  getUserCurrentDeviceTopology(id:any, currentTime:any){
    let ids= id;
    let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
    let updatedTime= dateTime.replaceAll('-', '_');
  
    return axios.get(`${this.topologyUrl}/${ids}/${updatedTime}/current`).then(res=>{
      console.log(res.data,"current topology")
      return res.data
    }).catch(error => console.log(error))
  }
  getUserDeviceHistory(id:any, currentTime:any){
    let ids= id;
    let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
    let updatedTime= dateTime.replaceAll('-', '_');
  
    return axios.get(`${this.userdeviceinfoUrl}/${ids}/${updatedTime}/history`).then(res=>{
      return res.data
    }).catch(error => console.log(error))
  }
  updateDeviceForTopology(timeSlotInformation:any, id:any):Observable<any>{
    let data = timeSlotInformation;
    let ids= id;
    return this.http.put(`${this.topologyUrl}/${ids}`, data);
  }
  selectTimeForTopology(topologyname:any, id:any, dateTime:any){
    let ids= id;
    let name = topologyname;
    let datetime= dateTime;
    let data = {
      name: topologyname,
      id:ids, 
      datetime:dateTime
    }
    
    return axios.put(`${this.topologyUrl}/${ids}/${name}`, data).then(res=>{
      return res.data
    }).catch(error => console.log(error))
  }
  getUserDeviceHistoryTopology(id:any, currentTime:any){
    let ids= id;
    let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
    let updatedTime= dateTime.replaceAll('-', '_');
    return axios.get(`${this.topologyUrl}/${ids}/${updatedTime}/history/device`).then(res=>{
      return res.data
    }).catch(error => console.log(error))
  }
  getUserScheduledDevice(id:any, currentTime:any){
    let ids= id;
    let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
    let updatedTime= dateTime.replaceAll('-', '_');
  
    return axios.get(`${this.topologyUrl}/${ids}/${updatedTime}`).then(res=>{
      console.log(res.data,"Schedule device")
      return res.data
    }).catch(error => console.log(error))
  }
  getUserScheduledDeviceTopology(id:any, currentTime:any){
    let ids= id;
    let dateTime= currentTime.substring(0, 13)+'-'+currentTime.substring(14,16);
    let updatedTime= dateTime.replaceAll('-', '_');
  
    return axios.get(`${this.userdeviceinfoUrl}/${ids}/${updatedTime}/schedule/device`).then(res=>{
      console.log(res.data,"schedule topology")
      return res.data
    }).catch(error => console.log(error))
  }
  unreserveTheDeviceFromCurrent(id:any, time:any){
    let ids= id;
    let data={
      status:'deleted',
      Time:time
    }
    
    return axios.put(`${this.userdeviceinfoUrl}/${ids}`, data).then(res=>{
      return res.data
    }).catch(error => console.log(error))

  }
  unreserveTheDeviceFromSchedule(id:any){
    let ids= id;
    return axios.delete(`${this.userdeviceinfoUrl}/${ids}`).then(res=>{
      return res.data
    }).catch(error => console.log(error))
  }
  addDataToTopology(data:any):Observable<any>{
    return this.http.put(`${this.topologyUrl}`, data);
  }
  registerProject(data:any):Observable<any>{
    return this.http.put(`${this.projectTopologyUrl}`, data);
  }
  deleteDataFromUserDeviceInfo(arrayOfDevices:any):Observable<any>{
    let data= {
      deviceId: arrayOfDevices,
    }
    let result:any;
    console.log(arrayOfDevices);
    for(let i=0;i<arrayOfDevices.length;i++){
      console.log(arrayOfDevices[i]);
      result = this.http.delete(`${this.userdeviceinfoUrl}/${arrayOfDevices[i]}/delete/data/userdevice`);
  
    }
    return result;
  }
  addDevice(data:any):Observable<any>{
    return this.http.put(`${this.devicesUrl}`, data)
  }
  uploadDataFromExcel(data:any):Observable<any>{
    let uploadData = 'uploadData';
    return this.http.post(`${this.devicesUrl}/${uploadData}`, data)
   }
  deleteFromUserdeviceinfo(name:any):Observable<any>{
    return this.http.delete(`${this.userdeviceinfoUrl}/${name}/delete`);
  }
  createData(data:any):Observable<any>{
    return this.http.put(`${this.usersUrl}`, data);
 }

  deleteFromTopology(topologyName:any){
 
    let name = topologyName;
    
    return this.http.delete(`${this.topologyUrl}/${name}`);
  }
  uploadDataFromExcelUser(data:any):Observable<any>{
    let uploadData= 'uploadData';
    return this.http.put(`${this.usersUrl}/${uploadData}`, data)
  }
  unreserveTheDeviceFromScheduleTopology(id:any, name:any, time:any){
    let ids= id;
    let updatedTime= time.replaceAll('-', '_');
    return axios.delete(`${this.userdeviceinfoUrl}/${ids}/${name}/${updatedTime}`).then(res=>{
      return res.data
    }).catch(error => console.log(error))
  }
  unreserveTheDeviceFromCurrentTopology(id:any, name:any, time:any){
  
    let updatedTime= time.replaceAll('-', '_');
    let ids= id;
      let data={
        status:'deleted',
        Time:time
      }
      
      // return this.http.put(`${this.userdeviceinfo}/${ids}`, data)
    return axios.put(`${this.userdeviceinfoUrl}/${ids}/${name}/${updatedTime}`, data).then(res=>{
      return res.data
    }).catch(error => console.log(error))
  }
  getExtendedTimeSlotInformation(data:any):Observable<any>{
    return this.http.post(`${this.userdeviceinfoUrl}`, data);
  }
  updateDeviceForTopologyExtended(timeSlotInformation:any, id:any):Observable<any>{
    let data = timeSlotInformation;
    let ids= id;
    let extended='extended';
    let update = 'update';
    return this.http.put(`${this.topologyUrl}/${ids}/${extended}/${update}`, data);
  }
  selectTimeFordevice(deviceId:any, datetime:any){
    let deviceid=deviceId;
    let dateTime= datetime;
    console.log(dateTime);
    return axios.get(`${this.userdeviceinfoUrl}/${deviceid}/${dateTime}`).then(res=>{
      return res.data;
    }).catch(error => console.log(error))
  
  
   }
   getExtendedTimeSlotInformationDevice(data:any):Observable<any>{
    return this.http.post(`${this.userdeviceinfoUrl}/data`, data);
  }
  updateuserdeviceinfo(deviceid:any, userid:any, data:any):Observable<any>{
    let device= deviceid;
    let user = userid;
    return this.http.put(`${this.userdeviceinfoUrl}/${user}/${device}`, data);
   }
  updateDeviceForExtended(timeSlotInformation:any, id:any):Observable<any>{
    let data = timeSlotInformation;
    let ids= id;
  
    return this.http.post(`${this.topologyUrl}/${ids}`, data);
  }

}
