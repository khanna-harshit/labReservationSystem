export class Devices {
    id : string
    rack:string
    unit:string
    devicename:string
    consoleip:string
    managementip:string
    consoleport:string
    powercycleip:string
    powercycleport:string
    teamname:string
    projectname:string
    status:string
    username:string
    userid:string
    time:string 
    endtime:string 
    serialnumber:string 
    mac:string 
    TG:string

    constructor(id :string,username:string, time:string, endtime:string, mac:string, TG:string,powercycleip:string,serialnumber:string, powercycleport:string, status:string, userid:string, teamname: string,rack:string, unit:string, devicename:string, consoleip:string, consoleport:string, managementip:string, projectname:string) {

        this.serialnumber= serialnumber 
        this.mac=mac
        this.TG=TG
        this.id=id
        this.rack=rack
        this.unit=unit
        this.devicename=devicename
        this.consoleip=consoleip
        this.consoleport=consoleport
        this.managementip=managementip
        this.powercycleip=powercycleip
        this.powercycleport=powercycleport
        this.teamname=teamname 
        this.projectname=projectname
        this.status=status 
        this.username = username 
        this.userid=userid 
        this.time=time
        this.endtime=endtime

    }
}