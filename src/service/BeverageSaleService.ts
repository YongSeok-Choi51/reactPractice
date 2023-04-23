import { VendingMachineService } from './VendingMachineService';

// All services
export const BeverageSaleService: { [key: string]: any; } = {
    vmManageService: new VendingMachineService()
};