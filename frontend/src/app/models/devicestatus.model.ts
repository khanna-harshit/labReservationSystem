export class Devicestatus {
    time: string
    endtime: string
    id: string
    team:string
    devicename:string


    constructor(time :string,team: string,id: string, endtime:string,devicename:string) {

        this.time=time
        this.team=team
        this.id=id
        this.endtime=endtime
        this.devicename=devicename
    }
}