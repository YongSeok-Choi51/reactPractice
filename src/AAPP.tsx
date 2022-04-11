import React, { useState } from 'react'
import './App.css'

import CoffeeType from './enums/CoffeeType'
import CoffeeC from './domains/CoffeeC'
import LemonC from './domains/LemonC'
import BeverageImpl from './domains/BeverageImpl'
import UylmooC from './domains/UylmooC'
import BeveragesC from './components/BeveragesC'


function AApp() {

    const [sales, setSales] = useState<number>(0)
    const [coffee, setCoffee] = useState<CoffeeC>(new CoffeeC({ water: 1000, powder: 200, cup: 20, ice: 9 })) // sugar, milkPowder
    const [lemon, setLemon] = useState<LemonC>(new LemonC({ water: 1000, powder: 200, cup: 20, ice: 15 }))
    const [uylmoo, setUylmoo] = useState<UylmooC>(new UylmooC({ water: 1000, powder: 200, cup: 20, ice: 0 }))


    const onOrder = (beverage: BeverageImpl, coffeeType?: CoffeeType, hotAndCold?: boolean) => {

        let result = false
        // 성공일 경우에만 판매금액 갱신.
        if (beverage instanceof CoffeeC) {
            result = beverage.order(coffeeType, hotAndCold)
            if (result) setSales(sales + 200)
        } else if (beverage instanceof LemonC) {
            result = beverage.order(undefined, hotAndCold)
            if (result) setSales(sales + 200)
        } else if (beverage instanceof UylmooC) {
            result = beverage.order()
            if (result) setSales(sales + 200)
        }
    }

    const renderFor = (beverage: BeverageImpl) => {
        return <BeveragesC beverage={beverage} onOrder={onOrder} />
    }

    const renderContent = () => {
        const arr = []
        arr.push(renderFor(coffee))
        arr.push(renderFor(lemon))
        arr.push(renderFor(uylmoo))
        return arr
    }

    const content = renderContent()
    return (
        <div className="App">
            <header className="App-header">
                <h1>자판기</h1>
                <p>
                    {content}
                </p>
                <p>현재 판매금액: {sales}</p>
            </header>
        </div>
    )
}

export default AApp