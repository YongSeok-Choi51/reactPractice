
import process from 'process';
import * as readline from "readline/promises";
// import * as rlp from 'readline/promises';
import { promisify } from 'util';
import { VendingMachine } from './entity/machine/VendingMachine';
import { BeverageSaleService } from './service/BeverageSaleService';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// readline/promise module not found issue WIP...
// 해당 함수가 사용자 입력을 받는 함수로 바뀔 예정
const getUserInput = (guideLine?: string) => {

    if (guideLine) {
        console.log(guideLine);
    }
    return "Some string";
};

const VENDING_MACHINE_LIST: Array<VendingMachine> = [];

const initVendingMachine = async () => {
    const vm = await BeverageSaleService.vmService.createNewVendingMachine();
    VENDING_MACHINE_LIST.push(vm);
};


const showMenu = () => {
    console.log("Select menu!");
    console.log("Enter the Menu Name you chosen");
    console.log("**********************");
    VENDING_MACHINE_LIST[0]._menuList.forEach((e, idx) => {
        console.log(`${idx}. ${e.name}, Price: ${e.price}`);
    });
    console.log("**********************");
};

const saleBeverage = () => {

    showMenu();
    const input = getUserInput();
    const selectedMenu = VENDING_MACHINE_LIST[0]._menuList.filter(e => e.name.replaceAll(" ", "").toLowerCase() === input.replaceAll(" ", "").toLowerCase());

    if (selectedMenu.length === 0) {
        console.log("메뉴판에 존재하는 메뉴를 골라주세요");
        return;
    }

    const inputPrice = parseInt(getUserInput("요금을 지불해주세요."));
    if (selectedMenu[0].price > inputPrice) {
        console.log("금액이 부족합니다. 다시 시도해주세요");
        return;
    }

    BeverageSaleService.vmManageService.makeBeverage(selectedMenu, VENDING_MACHINE_LIST[0]);
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

// let userInput: string = '';
// (async () => {
//     while (userInput !== 'y') {
//         userInput = await rl.question("what is your Name?");
//         console.log("your input is ", userInput);
//     }
// })();


