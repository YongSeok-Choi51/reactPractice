import { DefVMResource, VendingMachine as VendingMachineEntity } from '../entity/machine/VendingMachine';
import { ProductEntity } from '../entity/product/Product';
import { ProductResourceEntity } from '../entity/product/ProductResource';
import { ResourceEntity } from '../entity/product/Resource';
import TotalRepository from '../repository/TotalRepository';




export class VendingMachineService {

    constructor() {
        // console.log("Service initialized!");
    }

    async createNewVendingMachine() {
        const promiseResult = await Promise.all([
            TotalRepository.product.readTemplate(),
            TotalRepository.vm.createTemplate(),
            TotalRepository.defaultVmResource.readTemplate(),
        ]);

        const productList: Array<ProductEntity> = promiseResult[0];
        const newVendingMachine: VendingMachineEntity = promiseResult[1];
        const defaultResourceList: Array<DefVMResource> = promiseResult[2];

        newVendingMachine._menuList = productList;
        newVendingMachine._vmResource = await TotalRepository.vmResource.initDefaultResource(defaultResourceList, newVendingMachine._id);
        return newVendingMachine;
    }

    async findVendingMachineById(vmId: number) {

    }

    async getVendingMachine() {

    }

    async makeBeverage(product: ProductEntity, vm: VendingMachineEntity) {
        const productResourceList: Array<ProductResourceEntity> = await this.isMenuAvailable(product, vm);
        if (productResourceList.length === 0) {
            console.log("This Menu unAvailable..!");
            return;
        }

        const orderResult = await this.makeOrder(product, vm);

        console.log("");
        console.log(`********* Order result:${orderResult} *********`);
        console.log(`Menu: ${product.name}, Price: ${product.price}`);
        console.log("********* Start Make *********");
        const allResourceName: Array<ResourceEntity> = await TotalRepository.resource.readTemplate();
        const newVmResource = vm._vmResource.map(e => {
            const targetResource = productResourceList.filter(el => el.resourceId === e.resourceId);
            if (targetResource.length === 0) {
                return e;
            } else {
                const resourceName = allResourceName.filter(elem => elem.id === e.resourceId)[0].name;
                console.log(`${resourceName} is successfully added!`);
                return ({ ...e, amount: e.amount - targetResource[0].amount });
            }
        });
        vm._vmResource = newVmResource;
        await TotalRepository.vmResource.onFinishTransaction(newVmResource);
        console.log("********* End Make *********");
    }

    private async makeOrder(product: ProductEntity, vm: VendingMachineEntity) {
        return await TotalRepository.order.createTemplate({ vendingMachineId: vm._id, productId: product.id, amount: 1, price: product.price });
    }

    private async isMenuAvailable(product: ProductEntity, vm: VendingMachineEntity) {
        const productResourceList: Array<ProductResourceEntity> = await TotalRepository.productResource.readTemplate(product.id);
        const notEnoughResource = productResourceList.filter(e => vm._vmResource.filter(el => el.resourceId === e.resourceId && el.amount < e.amount).length >= 1);
        // console.log("notEnoughMenu", notEnoughResource);

        if (notEnoughResource.length > 0) {
            return [];
        }
        return productResourceList;
    }
}