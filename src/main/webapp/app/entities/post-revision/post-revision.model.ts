export class PostRevision {
    constructor(
        public id?: number,
        public author?: number,
        public date?: string,
        public dategmt?: string,
        public guid?: string,
        public modified?: string,
        public modifiedgmt?: string,
        public parent?: number,
        public slug?: string,
        public title?: string,
        public content?: string,
        public excerpt?: string,
    ) {
    }
}
