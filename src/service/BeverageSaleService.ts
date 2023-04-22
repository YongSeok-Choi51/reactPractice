import { VendingMachineService } from './VendingMachineService';

// All services
export const BeverageSaleService: { [key: string]: any; } = {
    vmService: new VendingMachineService()
};