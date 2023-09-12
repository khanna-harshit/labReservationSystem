export class Timeinterval {
    id:string
    startTime: string 
    endTime: string
    status:string 
    user:string 
    topology_slot:string
    showHistory:string 
    extended_slot:string 


    constructor(id:string,startTime: string,endTime: string, status:string,user:string,
        topology_slot:string,showHistory:string,extended_slot:string) {

        this.id=id
        this.startTime=startTime
        this.endTime=endTime
        this.status=status
        this.user=user
        this.topology_slot=topology_slot
        this.showHistory=showHistory
        this.extended_slot=extended_slot
    }
}