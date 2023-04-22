import { DefaultVendingMachineResourceRepository } from './DefaultVendingMachineResourceRepository';
import { ProductRepository } from './ProductRepository';
import { ProductResourceRepository } from './ProductResourceRepository';
import { ResourceRepository } from './ResourceRepository';
import { VendingMachineRepository } from './VendingMachineRepository';
import { VendingMachineResourceRepository } from './VendingMachineResourceRepository';


// All repository
export const TotalRepository: { [key: string]: any; } = {
    vm: new VendingMachineRepository(),
    vmResource: new VendingMachineResourceRepository(),
    defaultVmResource: new DefaultVendingMachineResourceRepository(),
    product: new ProductRepository(),
    productResource: new ProductResourceRepository(),
    resource: new ResourceRepository()
};

export default TotalRepository;