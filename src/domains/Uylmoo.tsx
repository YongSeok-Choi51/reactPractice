import DrinkType from '../interfaces/ColdType'
import Beverage from '../interfaces/Beverage'
import AvailableType from '../enums/AvailableType'


// minusIngred, isAvailable, cost는 중복됨. 
class Uylmoo implements Beverage {


    cost = { water: 100, cup: 1, powder: 15 }

    water: number
    cup: number
    powder: number

    constructor(props: { water: number, cup: number, powder: number }) {
        this.water = props.water
        this.cup = props.cup
        this.powder = props.powder
    }

    minusIngredient(props: { water: number, cup: number, powder: number }): boolean {
        if (this.isAvailable()) {
            return false
        } else {
            this.water -= props.water
            this.cup -= props.cup
            this.powder -= props.powder
        }
        return true
    }

    isAvailable(): boolean {
        return this.water < 0 || this.cup < 0 || this.powder < 0 ? true : false
    }

    /* 내부 구현 메소드 끝  */


    // 외부 제공 인터페이스 
    checkState(): AvailableType {
        if (this.isAvailable()) return AvailableType.UNAVAILABLE
        return AvailableType.BOTH_OK
    }

    order(): boolean {
        return this.minusIngredient(this.cost)
    }
}
export default Uylmoo