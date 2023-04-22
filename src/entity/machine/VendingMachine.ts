export interface ProductEntity {
    id: number;
    name: string;
    price: number;
}

export interface VendingMachineEntity {
    id: number;
    name?: string;
    vmResource?: Array<VmResourceEntity>;
    menu?: Array<Menu>;
}

export interface Menu {
    id: number;
    name: string;
}

export interface VmResourceEntity {
    id: number;
    vendingMachineId: number;
    resourceId: number;
    amount: number;
}

export interface DefVMResource {
    resourceId: number;
    amount: number;
}

export class VendingMachine {

    _id: number;
    _name: string;
    _vmResource: Array<VmResourceEntity>;
    _menuList: Array<ProductEntity>;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    set setVmResource(vmResource: Array<VmResourceEntity>) {
        if (vmResource.length === 0) {
            console.log("invalid resource!");
            return;
        }
        this._vmResource = vmResource;
    }

    set setMenuList(menuList: Array<ProductEntity>) {
        if (menuList.length === 0) {
            console.log("invalid menuList");
            return;
        }
        this._menuList = menuList;
    }

}