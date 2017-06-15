export class Taxonomy {
    constructor(
        public id?: number,
        public capabilities?: any,
        public description?: string,
        public hierarchical?: boolean,
        public labels?: any,
        public name?: string,
        public slug?: string,
        public showcloud?: boolean,
        public types?: any,
        public restbase?: string,
    ) {
        this.hierarchical = false;
        this.showcloud = false;
    }
}
