export class Posts {
    constructor(
        public id?: number,
        public date?: string,
        public dategmt?: string,
        public guid?: any,
        public link?: string,
        public modified?: string,
        public modifiedgmt?: string,
        public slug?: string,
        public status?: string,
        public type?: string,
        public password?: string,
        public title?: any,
        public content?: any,
        public author?: number,
        public excerpt?: any,
        public featuredmedia?: number,
        public commentstatus?: string,
        public pingstatus?: string,
        public format?: string,
        public meta?: any,
        public sticky?: boolean,
        public template?: string,
        public categories?: any,
        public tags?: any,
        public livebloglikes?: number,
        public acf?: any, // Advanced Custom Fields
    ) {
        this.sticky = false;
    }
}
