export class Currentstatus {
    deviceid: string
    time: string
    endtime: string
    name:string


    constructor(deviceid :string,time: string,endtime: string, name:string) {

        this.deviceid=deviceid
        this.time=time
        this.endtime=endtime
        this.name=name
    }
}