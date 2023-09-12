import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { forkJoin, Observable, of } from 'rxjs';
import { NavbarService } from '../navbar.service';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(public nav:NavbarService,public dataService:DataService,private authService:AuthService,private router:Router){
    
  }
  user:User=new User('','','','');
  teamname:any;
  access:any;
  projects:Project[]=[];
  teamMembers:User[]=[];
  ngOnInit(): void {
    this.nav.show()
    this.loadData();
    let token = localStorage.getItem('access_token')
    if (token != undefined) {
      
      this.user=JSON.parse(atob(token?.split('.')[1]))
      this.teamname= this.user['teamname'];
      this.access = this.user['accesslevel']
      
    }
  }
  loadData(){
  
    let projectsObservable = this.dataService.getProjects()
    let teammembersObservable = this.dataService.getAllUser()
    

    forkJoin([projectsObservable,teammembersObservable]).subscribe(([projects,teammembers]) => {
    
      this.projects = projects
      this.teamMembers=teammembers
      
     

  })
}
  logout(){
    console.log("logout")
    this.authService.logout();

    this.router.navigate(['login'])
  }
}