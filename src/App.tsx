import React, { useState } from 'react'
import './App.css'
import Beverage from './domains/Beverage'
import Uylmoo from './domains/Uylmoo'
import Coffee from './domains/Coffee'
import LemonTee from './domains/LemonTee'

/**
 * 음료 레시피
 * 
 * 종류별 (커피, 레몬차, 율무차)
 * 물 100ml
 * 파우더 15g
 * 컵 1개
 * 클래스 메소드로 사용해서 바꿔보자!
 */

function App() {

    const style = {
        borderRadius: '5px',
        margin: '15px 30px',
        width: '150px'
    }

    const [sales, setSales] = useState<number>(0)
    const [coffee, setCoffee] = useState<Coffee>(new Coffee({ water: 1000, powder: 200, cup: 20 }))
    const [lemon, setLemon] = useState<LemonTee>(new LemonTee({ water: 1000, powder: 200, cup: 20 }))
    const [uylmoo, setUylmoo] = useState<Uylmoo>(new Uylmoo({ water: 1000, powder: 200, cup: 20 }))

    const sale = (beverage: Beverage) => {

        beverage.minusIngred({ water: 100, powder: 15, cup: 1 })
        if (beverage.isAvailable()) setSales(sales + 200)

        if (beverage instanceof Coffee) {
            const tempBeverage = beverage.getProps
            setCoffee(new Coffee(tempBeverage))
        } else if (beverage instanceof LemonTee) {
            const tempBeverage = beverage.getProps
            setLemon(new LemonTee(tempBeverage))
        } else if (beverage instanceof Uylmoo) {
            const tempBeverage = beverage.getProps
            setUylmoo(new Uylmoo(tempBeverage))
        }
    }

    const renderContent = () => {
        const arr = []
        if (coffee.isAvailable()) arr.push(<button style={style} onClick={e => { sale(coffee) }}>Coffee</button>)
        if (lemon.isAvailable()) arr.push(<button style={style} onClick={e => { sale(lemon) }}>LemonTee</button>)
        if (uylmoo.isAvailable()) arr.push(<button style={style} onClick={e => { sale(uylmoo) }}>Uylmoo</button>)
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
