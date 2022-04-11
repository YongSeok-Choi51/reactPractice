import React, { useState } from 'react'
import './App.css'

import Uylmoo from './domains/Uylmoo'
import Coffee from './domains/Coffee'
import LemonTee from './domains/LemonTee'
import Beverage from './interfaces/Beverage'
import Beverages from './components/Beverages'
import CoffeeType from './enums/CoffeeType'


function App() {

    const [sales, setSales] = useState<number>(0)
    const [coffee, setCoffee] = useState<Coffee>(new Coffee({ water: 1000, powder: 200, cup: 20, ice: 9 }, 200, 300)) // sugar, milkPowder
    const [lemon, setLemon] = useState<LemonTee>(new LemonTee({ water: 1000, powder: 200, cup: 20, ice: 9 }))
    const [uylmoo, setUylmoo] = useState<Uylmoo>(new Uylmoo({ water: 1000, powder: 200, cup: 20 }))


    const onOrder = (beverage: Beverage, coffeeType?: CoffeeType, hotAndCold?: boolean) => {

        let result = false
        // 성공일 경우에만 판매금액 갱신.
        if (beverage instanceof Coffee) {
            result = beverage.order(coffeeType, hotAndCold)
            if (result) setSales(sales + 200)
        } else if (beverage instanceof LemonTee) {
            result = beverage.order(hotAndCold)
            if (result) setSales(sales + 200)
        } else if (beverage instanceof Uylmoo) {
            result = beverage.order()
            if (result) setSales(sales + 200)
        }
    }

    const renderFor = (beverage: Beverage) => {
        return <Beverages beverage={beverage} onOrder={onOrder} />
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

export default App