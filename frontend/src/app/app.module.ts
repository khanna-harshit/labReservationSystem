import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReadComponent } from './read/read.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProjectComponent } from './project/project.component';
import { TopologydetailComponent } from './topologydetail/topologydetail.component';
import { ModifytopologyComponent } from './modifytopology/modifytopology.component';
import { DevicedetailsComponent } from './devicedetails/devicedetails.component';
import { TeammemberComponent } from './teammember/teammember.component';
import { CreatetopologyComponent } from './createtopology/createtopology.component';
import { RegisterprojectComponent } from './registerproject/registerproject.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { AdddeviceComponent } from './adddevice/adddevice.component';
import { AdduserComponent } from './adduser/adduser.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [

];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReadComponent,
    ReadComponent,
    NavigationComponent,
    ProjectComponent,
    TopologydetailComponent,
    ModifytopologyComponent,
    DevicedetailsComponent,
    TeammemberComponent,
    CreatetopologyComponent,
    RegisterprojectComponent,
    UserinfoComponent,
    AdddeviceComponent,
    AdduserComponent,
    PasswordComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true })  // .../#/crisis-center/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
