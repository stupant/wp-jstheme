export class Category {
    constructor(
        public id?: number,
        public count?: number,
        public description?: string,
        public link?: string,
        public name?: string,
        public slug?: string,
        public taxonomy?: string,
        public parent?: number,
        public meta?: any,
    ) {
    }
}
