export class Task {

    title: string;
    date: number;
    urgency: string;
    description: string;
    
    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.date = obj ? obj.date : '';
        this.urgency = obj ? obj.urgency : '';
        this.description = obj ? obj.description : '';
    }

    public toJSON() {
        return {
            title: this.title,
            date: this.date,
            urgency: this.urgency,
            description: this.description
        };
    }


}