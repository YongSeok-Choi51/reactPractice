import AvailableType from '../enums/AvailableType'

interface Beverage {
    // props
    water: number
    cup: number
    powder: number

    // methods
    //getProps(): {}
    minusIngredient({ }): boolean
    checkState(): AvailableType
}
export default Beverage