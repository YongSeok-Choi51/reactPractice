import AvailableType from '../enums/AvailableType'
import CoffeeType from '../enums/CoffeeType'
import BeverageImpl from './BeverageImpl'


// minusIngred, isAvailable, cost는 중복됨. 
class UylmooC extends BeverageImpl {

    // 외부 제공 인터페이스 
    checkState(): AvailableType {
        if (this.isAvailable()) return AvailableType.UNAVAILABLE
        return AvailableType.BOTH_OK
    }

    order(coffeeType?: CoffeeType, coldType?: boolean): boolean {
        return this.minusIngredient(this.cost)
    }
}
export default UylmooC