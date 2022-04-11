import AvailableType from '../enums/AvailableType'
import CoffeeType from '../enums/CoffeeType'
import Beverage from '../interfaces/Beverage'
import ColdType from '../interfaces/ColdType'
import Condiment from './Condiment'

// 레시피에 들어가는 값들을 한곳에서 관리할 수는 없을까?


// 함수의 호출관계에 있어서, 지역변수를 최대한 없애 전달하기..
class Coffee implements Beverage, ColdType {

    // 커피 생성비용. 
    cost = { water: 100, cup: 1, powder: 15 }

    water: number
    cup: number
    powder: number
    ice: number
    condiment: Condiment


    constructor(props: { water: number, cup: number, powder: number, ice: number }, sugar: number, milkPowder: number) {
        this.water = props.water
        this.cup = props.cup
        this.powder = props.powder
        this.ice = props.ice
        this.condiment = new Condiment(sugar, milkPowder)
    }


    // 내부 구현 (have to hide)
    minusIngredient(props: { water: number, cup: number, powder: number }): boolean {

        // 제조 가능한 조건이라면 제조, 그렇지 않으면 바로 false 리턴 후 종료 
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


    //외부 제공 인터페이스(client는 해당 인터페이스로만 상호작용할수 있다.)
    // 얼음 떨어져도, 따듯한커피는 제조가 가능해야한다. 
    // 커피 객체의 재고정보를 확인하는 상태. 하나라도 부족하다면, 음료를 제조할 수 없다.
    checkState(): AvailableType {
        if (this.isAvailable() && this.condiment.checkState) return AvailableType.UNAVAILABLE
        else if (!this.isAvailable() && this.condiment.checkState && this.ice < 0) return AvailableType.HOT_ONLY
        else return AvailableType.BOTH_OK
    }

    order(coffeeType: CoffeeType | undefined, coldType: boolean | undefined): boolean {
        const resultWithMinus = this.minusIngredient(this.cost)
        let resultWithCond = false
        let resultWithIce = false

        // 냉, 온음료 얼음추가
        if (coldType) resultWithIce = this.addIce(3)
        else resultWithIce = true

        // 밀크, 설탕커피 여부
        if (coffeeType === CoffeeType.MILK) resultWithCond = this.condiment.addCondiment({ sugar: 10, milkPowder: 20 })
        else resultWithCond = this.condiment.addCondiment({ sugar: 10, milkPowder: 0 })

        // 세 가지 조건이 모두 만족되어야 음료가 제작될 수 있다.
        return resultWithCond && resultWithIce && resultWithMinus
    }
}
export default Coffee


// water: number, cup: number, powder: number, ice: number, condiment: { sugar: number, milkPowder: number }
// getProps(): {} {
//     return { water: this.water, cup: this.cup, powder: this.powder, ice: this.ice, condiment: this.condiment.getStatus }
// }