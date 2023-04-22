
import process from 'process';
import * as readline from "readline";
import { promisify } from 'util';
import { VendingMachine } from './entity/machine/VendingMachine';
import { BeverageSaleService } from './service/BeverageSaleService';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const VENDING_MACHINE_LIST: Array<VendingMachine> = [];

const initVendingMachine = async () => {
    const vm = await BeverageSaleService.vmService.createNewVendingMachine();
    VENDING_MACHINE_LIST.push(vm);
};

const saleBeverage = () => {

    const vm = VENDING_MACHINE_LIST[0];
    console.log("Select menu!");
    vm._menuList.forEach(e => {
        console.log(`Menu: ${e.name}, Price: ${e.price}`);
    });

};

const question = promisify(rl.question).bind(rl);
(async () => {
    try {
        const answer = await question('자판기 이용? [Y/N]: ');
        if (String(answer).toLowerCase() === 'y') {
            await initVendingMachine();
            saleBeverage();
        }
        rl.close();
    } catch (error) {
        console.error(error);
    }
})();


