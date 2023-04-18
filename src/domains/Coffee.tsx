import AvailableType from '../enums/AvailableType';
import CoffeeType from '../enums/CoffeeType';
import BeverageImpl from './BeverageImpl';
import Condiment from './Condiment';

class CoffeeC extends BeverageImpl {

    condiment: Condiment;

    constructor(props: { water: number, cup: number, powder: number, ice: number; }) {
        super(props);
        this.condiment = new Condiment(200, 300);
    }

    checkState(): AvailableType {
        if (this.isAvailable() && this.condiment.checkState()) return AvailableType.UNAVAILABLE;
        else if (!this.isAvailable() && this.condiment.checkState() && this.ice < 0) return AvailableType.HOT_ONLY;
        else return AvailableType.BOTH_OK;
    }

    order(coffeeType: CoffeeType | undefined, coldType: boolean | undefined): boolean {
        const resultWithMinus = this.minusIngredient(this.cost);
        let resultWithCond = false;
        let resultWithIce = false;

        // 냉, 온음료 얼음추가
        if (coldType) resultWithIce = this.addIce(this.cost_ice);
        else resultWithIce = true;

        // 밀크, 설탕커피 여부
        if (coffeeType === CoffeeType.MILK) resultWithCond = this.condiment.addCondiment({ sugar: 10, milkPowder: 20 });
        else resultWithCond = this.condiment.addCondiment({ sugar: 10, milkPowder: 0 });

        // 세 가지 조건이 모두 만족되어야 음료가 제작될 수 있다.
        return resultWithCond && resultWithIce && resultWithMinus;
    }

}
export default CoffeeC;