import TotalRepository from '../repository/TotalRepository';
import { DefVMResource, ProductEntity, VendingMachine, VmResourceEntity } from './../entity/machine/VendingMachine';



export class VendingMachineService {

    async createNewVendingMachine() {
        const promiseResult = await Promise.all([
            TotalRepository.product.readTemplate(),
            TotalRepository.vm.createTemplate(),
            TotalRepository.defaultVmResource.readTemplate(),
        ]);

        const productList: Array<ProductEntity> = promiseResult[0];
        const newVendingMachine: VendingMachine = promiseResult[1];
        const defaultResourceList: Array<DefVMResource> = promiseResult[2];

        newVendingMachine._menuList = productList;
        newVendingMachine._vmResource = await TotalRepository.vmResource.initDefaultResource(defaultResourceList, newVendingMachine._id);
        return newVendingMachine;
    }

    async findVendingMachineById(vmId: number) {

    }

    async getVendingMachine() {

    }
}