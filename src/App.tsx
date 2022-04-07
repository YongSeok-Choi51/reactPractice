import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import Ingredient from './domains/Ingredient'

function App() {


    const [sales, setSales] = useState<number>(0)
    const [ingredient, setIngredient] = useState<Ingredient>({ water: 500, cup: 30, powder: 1000 })
    const [flag, setFlag] = useState<Boolean>(true)

    const isAvailable = (ingredient: Ingredient) => {
        if (ingredient.cup < 0 || ingredient.powder < 0 || ingredient.water < 0)
            setFlag(false)
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>자판기</h1>
                <p>
                    {flag ? <button onClick={e => {
                        setSales(sales + 200)
                        let { water, cup, powder } = ingredient
                        water -= 30
                        cup -= 1
                        powder -= 50
                        setIngredient({ water: water, cup: cup, powder: powder })
                        isAvailable(ingredient)
                    }}>Coffee!</button> : undefined}
                </p>
                <a>
                    현재 매출: {sales}원<br />
                    {flag ? undefined : '재료가 부족합니다ㅠ'}
                </a>
            </header>
        </div>
    )
}

export default App
