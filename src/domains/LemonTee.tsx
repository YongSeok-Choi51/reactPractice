import AvailableType from '../enums/AvailableType'
import Beverage from '../interfaces/Beverage'
import ColdType from '../interfaces/ColdType'


class LemonTee implements Beverage, ColdType {

    cost = { water: 100, cup: 1, powder: 15 }
    water: number
    cup: number
    powder: number
    ice: number

    constructor(props: { water: number, cup: number, powder: number, ice: number }) {
        this.water = props.water
        this.cup = props.cup
        this.powder = props.powder
        this.ice = props.ice
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

    addIce(ice: number): boolean {
        if (this.ice < 0) return false
        this.ice -= ice
        return true
    }
    /* 내부 구현 메소드 끝  */


    // 외부 제공 인터페이스
    checkState(): AvailableType {

        if (this.isAvailable()) {
            return AvailableType.UNAVAILABLE
        } else if (!this.isAvailable() && this.ice < 0) {
            return AvailableType.HOT_ONLY
        }
        return AvailableType.BOTH_OK
    }

    order(coldType: boolean | undefined): boolean {

        // 먼저 음료 제조
        const resultWithMinus = this.minusIngredient(this.cost)
        // 재료와 얼음까지 모두 더해져야 음료 제조가 가능.
        if (coldType) {
            return resultWithMinus && this.addIce(3)
        } else return resultWithMinus
    }
}
export default LemonTee