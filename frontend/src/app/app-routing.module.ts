import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdddeviceComponent } from './adddevice/adddevice.component';
import { AdduserComponent } from './adduser/adduser.component';
import { CreatetopologyComponent } from './createtopology/createtopology.component';
import { DevicedetailsComponent } from './devicedetails/devicedetails.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { LoginComponent } from './login/login.component';
import { ModifytopologyComponent } from './modifytopology/modifytopology.component';
import { ProjectComponent } from './project/project.component';
import { ReadComponent } from './read/read.component';
import { RegisterprojectComponent } from './registerproject/registerproject.component';
import { TeammemberComponent } from './teammember/teammember.component';
import { TopologydetailComponent } from './topologydetail/topologydetail.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { PasswordComponent } from './password/password.component';
const routes: Routes = [
  {path:'home',component : ReadComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'topologydetail/:name',component : TopologydetailComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'login',component:LoginComponent},
  {path:'devicedetail/:id/:type',component : DevicedetailsComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'modifytopology/:name',component : ModifytopologyComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'project/:name',component : ProjectComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'createtopology',component : CreatetopologyComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'registerproject',component : RegisterprojectComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'teammember/:id',component : TeammemberComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'adddeviceintool',component : AdddeviceComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'changepassword',component : PasswordComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'adduserintool',component : AdduserComponent,canActivate:[IsAuthenticatedGuard]},
  {path:'userinfo',component :UserinfoComponent,canActivate:[IsAuthenticatedGuard]},

  {path:'**',redirectTo: 'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
