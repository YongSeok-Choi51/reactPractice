import { PionRepository } from './PionRepository';

export class ProductResourceRepository extends PionRepository {
    constructor() {
        super();
    }

    createTemplate(query: string) {
        throw new Error('Method not implemented.');
    }
    readTemplate(query: string) {
        throw new Error('Method not implemented.');
    }
    updateTemplate(query: string) {
        throw new Error('Method not implemented.');
    }
}