import TotalRepository from '../repository/TotalRepository';
import { DefVMResource, ProductEntity, ProductResourceEntity, ResourceEntity, VendingMachine, VmResourceEntity } from './../entity/machine/VendingMachine';



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

    async makeBeverage(product: ProductEntity, vm: VendingMachine) {

        const productResourceList: Array<ProductResourceEntity> = await this.isMenuAvailable(product, vm);
        if (productResourceList.length === 0) {
            console.log("This Menu unAvailable..!");
            return;
        }

        const allResourceName: Array<ResourceEntity> = TotalRepository.resource.readTemplate();
        const newVmResource = vm._vmResource.map(e => {
            const targetResource = productResourceList.filter(el => el.resourceId === e.resourceId);
            if (targetResource.length === 0) {
                return e;
            } else {
                const resourceName = allResourceName.filter(elem => elem.id === e.id)[0].name;
                console.log(`${resourceName} is successfully added!`);
                return ({ ...e, amount: e.amount - targetResource[0].amount });
            }
        });

        vm._vmResource = newVmResource;
    }

    // 자판기 초기화 / 판매 사이클 돌고난 이후에 메뉴 보여줄때 사용하는걸로 확장해보기 
    private async isMenuAvailable(product: ProductEntity, vm: VendingMachine) {
        const productResourceList: Array<ProductResourceEntity> = await TotalRepository.productResource.readTemplate(product.id);
        const notEnoughResource = productResourceList.filter(e => vm._vmResource.filter(el => el.amount < e.amount).length >= 1);

        if (notEnoughResource.length > 0) {
            return [];
        }
        return productResourceList;
    }
}