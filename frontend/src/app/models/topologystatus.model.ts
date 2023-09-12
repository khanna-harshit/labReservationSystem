export class Topologystatus {
    time: string
    endtime: string
    id: string
    team:string
    topologyname:string


    constructor(time :string,team: string,id: string, endtime:string,topologyname:string) {

        this.time=time
        this.team=team
        this.id=id
        this.endtime=endtime
        this.topologyname=topologyname
    }
}