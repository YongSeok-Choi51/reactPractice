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

    checkState(): AvailableType {

        if (this.isAvailable()) {
            return AvailableType.UNAVAILABLE
        } else if (!this.isAvailable() && this.ice < 0) {
            return AvailableType.HOT_ONLY
        }
        return AvailableType.BOTH_OK
    }
    /* 내부 구현 메소드 끝  */



    // 주문 당시의 일회성 값으로 사용하고, 인스턴스의 어트리뷰트로 굳이 상태를 유지해야하는지 의문
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