
class Condiment {

    sugar: number;
    milkPowder: number;

    constructor(sugar: number, milkPowder: number) {
        this.sugar = sugar;
        this.milkPowder = milkPowder;
    }

    get getStatus(): { sugar: number, milkPowder: number; } {
        return { sugar: this.sugar, milkPowder: this.milkPowder };
    }

    checkState(): boolean {
        return this.sugar < 0 || this.milkPowder < 0 ? true : false;
    }

    // 
    addCondiment(props: { sugar: number, milkPowder: number; }): boolean {

        if (this.checkState()) return false;

        this.sugar -= props.sugar;
        this.milkPowder -= props.milkPowder;
        return true;
    }
}

export default Condiment;