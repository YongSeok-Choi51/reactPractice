import AvailableType from '../enums/AvailableType'
import CoffeeType from '../enums/CoffeeType'
import BeverageImpl from './BeverageImpl'

class LemonC extends BeverageImpl {

    checkState(): AvailableType {

        if (this.isAvailable()) {
            return AvailableType.UNAVAILABLE
        } else if (!this.isAvailable() && this.ice < 0) { // 따뜻한 음료만 가능할 때
            return AvailableType.HOT_ONLY
        }
        return AvailableType.BOTH_OK
    }

    order(coffeeType?: CoffeeType, coldType?: boolean): boolean {

        // 먼저 음료 제조
        const resultWithMinus = this.minusIngredient(this.cost)
        // 재료와 얼음까지 모두 더해져야 음료 제조가 가능.
        if (coldType) {
            return resultWithMinus && this.addIce(this.cost_ice)
        } else return resultWithMinus
    }


} export default LemonC