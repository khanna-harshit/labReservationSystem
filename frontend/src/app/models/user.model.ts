export class User {
    name: string
    accesslevel: string
    id: string
    teamname:string


    constructor(name :string,accesslevel: string,id: string, teamname:string) {

        this.name=name
        this.accesslevel=accesslevel
        this.id=id
        this.teamname=teamname
    }
}