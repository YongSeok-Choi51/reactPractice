import AvailableType from '../enums/AvailableType'
import Beverage from '../interfaces/Beverage'
import ColdType from '../interfaces/ColdType'

abstract class BeverageImpl implements Beverage, ColdType {


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

    addIce(ice: number): boolean {
        if (this.ice < 0) return false
        this.ice -= ice
        return true
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

    abstract checkState(): AvailableType
    abstract order(): boolean

}

export default BeverageImpl