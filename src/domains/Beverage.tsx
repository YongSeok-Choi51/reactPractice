abstract class Beverage {

    public water: number
    public cup: number
    public powder: number

    get getProps() {
        return { water: this.water, cup: this.cup, powder: this.powder }
    }

    minusIngred(props: { water: number, cup: number, powder: number }) {
        this.water -= props.water
        this.cup -= props.cup
        this.powder -= props.powder
    }

    constructor(props: { water: number, cup: number, powder: number }) {
        this.water = props.water
        this.cup = props.cup
        this.powder = props.powder
    }

    isAvailable(): boolean {
        return this.cup < 0 || this.powder < 0 || this.water < 0 ? false : true // 셋중 하나라도 부족하면 false리턴  
    }

    abstract cost(): number

}
export default Beverage