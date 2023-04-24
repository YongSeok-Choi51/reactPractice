import { VendingMachineService } from './VendingMachineService';

// All services
const BeverageSaleService: { [key: string]: any; } = {
    vmManageService: new VendingMachineService()
};

export default BeverageSaleService;