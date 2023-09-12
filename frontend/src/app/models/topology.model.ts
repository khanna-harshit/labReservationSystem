export class Topology {
    id : string
    topologyname: string
    deviceid: string
    teamname:string
    type:string
    rack:string
    unit:string
    devicename:string
    consoleip:string
    managementip:string
    consoleport:string
    projectname:string
    powercycleip:string 
    powercycleport:string
    usedFor:string
    TG:string 




    constructor(id :string,teamname: string,topologyname: string, powercycleport:string, powercycleip:string, TG:string,deviceid:string, type:string,rack:string, unit:string, devicename:string, consoleip:string, consoleport:string, managementip:string, projectname:string, usedFor:string) {

        this.topologyname=topologyname
        this.teamname=teamname
        this.usedFor=usedFor
        this.powercycleip=powercycleip 
        this.powercycleport=powercycleport 
        this.TG=TG
        this.id=id
        this.type=type
        this.deviceid=deviceid
        this.rack=rack
        this.devicename=devicename
        this.unit=unit
        this.managementip=managementip
        this.consoleip=consoleip
        this.consoleport=consoleport
        this.projectname=projectname

    }
}