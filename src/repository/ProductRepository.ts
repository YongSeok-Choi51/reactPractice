import { ProductEntity } from '../entity/machine/VendingMachine';
import { PionRepository } from './PionRepository';


export class ProductRepository extends PionRepository {
    constructor() {
        super();
    }

    createTemplate(query: string) {
        throw new Error('Method not implemented.');
    }
    async readTemplate() {

        const selectQuery = `
            SELECT \n
                p.name, \n
                p.price \n
            FROM pixar.product p
        `;

        const [rows, fields] = await this._connection.execute(selectQuery);
        return rows && (rows as Array<ProductEntity>).map(e => e);
    }
    updateTemplate(query: string) {
        throw new Error('Method not implemented.');
    }
}