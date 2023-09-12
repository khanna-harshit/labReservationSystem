export class Project {
    projectname: string
    teamname: string
    id: string
    type:string


    constructor(projectname :string,teamname: string,id: string, type:string) {

        this.projectname=projectname
        this.teamname=teamname
        this.id=id
        this.type=type
    }
}