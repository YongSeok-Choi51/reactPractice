import { ResourceEntity } from '../entity/machine/VendingMachine';
import { PionRepository } from './PionRepository';


export class ResourceRepository extends PionRepository {
    constructor() {
        super();
    }

    async createTemplate(query: string) {

    }

    async readTemplate(query: string) {

        const selectAllQuery = `
            SELECT
                r.id,
                r.name
            FROM pixar.resource
        `;

        const [rows, field] = await this._connection.query({ sql: selectAllQuery });
        return rows && (rows as Array<ResourceEntity>).map(e => e);

    }

    async updateTemplate(query: string) {

    }

}