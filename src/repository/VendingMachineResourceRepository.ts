import { DefVMResource, VmResourceEntity } from '../entity/machine/VendingMachine';
import { PionRepository } from './PionRepository';


export class VendingMachineResourceRepository extends PionRepository {


    constructor() {
        super();
    }

    async createTemplate(query: string) {


    }
    async readTemplate(query: string) {

    }

    async updateTemplate(query: string) {

    }

    async initDefaultResource(defaultList: Array<DefVMResource>, vmId: number) {

        const inputList = defaultList.map(e => [vmId, e.resourceId, e.amount]);
        const createVmResourceQuery = `
            INSERT INTO
                pixar.vending_machine_resource (vending_machine_id, resource_id, amount)
            VALUES ?`;
        await this._connection.query({ sql: createVmResourceQuery }, [inputList]);

        const selectVmResourceQuery = `
            SELECT 
                r.id,
                r.vending_machine_id as vendingMachineId,
                r.resource_id as resourceId,
                r.amount
            FROM pixar.vending_machine_resource r
            WHERE r.vending_machine_id=?
        `;

        const [rows, field] = await this._connection.query({ sql: selectVmResourceQuery }, [vmId]);
        return rows && (rows as Array<VmResourceEntity>).map(e => e);
    }

    async findByVmId(id: number) {


    }

}