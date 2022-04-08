import Beverage from './Beverage'

class Coffee extends Beverage {

    constructor(props: { water: number, cup: number, powder: number }) {
        super(props)
    }

    cost(): number {
        return 200
    }

    //
}
export default Coffee