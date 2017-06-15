export class Page {
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
        public parent?: number,
        public title?: any,
        public content?: any,
        public author?: number,
        public excerpt?: any,
        public featuredmedia?: number,
        public commentstatus?: string,
        public pingstatus?: string,
        public menuorder?: number,
        public meta?: any,
        public template?: string,
    ) {
    }
}
