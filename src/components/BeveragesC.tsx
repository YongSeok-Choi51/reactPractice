import React, { ReactElement, useState } from 'react'
import BeverageImpl from '../domains/BeverageImpl'
import CoffeeC from '../domains/CoffeeC'
import LemonC from '../domains/LemonC'
import UylmooC from '../domains/UylmooC'
import AvailableType from '../enums/AvailableType'
import CoffeeType from '../enums/CoffeeType'

// onSubmit 함수 추출하면 정말 좋겠다. 
function BeveragesC(props: { beverage: BeverageImpl, onOrder: (beverage: BeverageImpl, coffeeType?: CoffeeType, hotAndCold?: boolean) => void }) {

    const state = props.beverage.checkState()
    if (props.beverage instanceof CoffeeC) {
        // 커피 타입인 경우의 Form
        switch (state) {
            case AvailableType.BOTH_OK:
                return <form onSubmit={e => {

                    let cof, cold
                    const cofType = e.currentTarget.coffeeType.value
                    const coldFlag = e.currentTarget.coldType.value

                    // 설탕커피, 냉/온 여부 변수 초기화
                    cof = cofType === "sugar" ? CoffeeType.SUGAR : CoffeeType.MILK
                    cold = coldFlag === "cold" ? true : false

                    // 주문
                    props.onOrder(props.beverage, cof, cold)
                    e.preventDefault()

                }}>
                    <label >냉 / 온 커피 (밀크, 설탕)</label>
                    <select name="coffeeType" id="type">
                        <option value="sugar">sugar</option>
                        <option value="milk">milk</option>
                    </select>
                    <select name="coldType" id="ctype">
                        <option value="cold">cold</option>
                        <option value="hot">hot</option>
                    </select>
                    <input type="submit" value='주문' />
                </form>
            case AvailableType.HOT_ONLY:
                return <form onSubmit={e => {

                    let ctype
                    const cofType = e.currentTarget.coffeeType.value
                    ctype = cofType === "sugar" ? CoffeeType.SUGAR : CoffeeType.MILK

                    props.onOrder(props.beverage, ctype, undefined)
                    e.preventDefault()
                }}>
                    <label >따듯한 커피 (밀크, 설탕)</label>
                    <select name="coffeeType" id="type">
                        <option value="sugar">sugar</option>
                        <option value="milk">milk</option>
                    </select>
                    <input type="submit" value='주문' />
                </form>
            case AvailableType.UNAVAILABLE:
                return <></>
        }

    } else if (props.beverage instanceof LemonC) {
        // 레몬차 타입인 경우의 Form
        switch (state) {
            case AvailableType.UNAVAILABLE:
                return <></>
            case AvailableType.HOT_ONLY:
                return <form onSubmit={e => {

                    e.preventDefault()
                    props.onOrder(props.beverage, undefined, false)

                }}>
                    <label >따뜻한 레몬차(얼음 품절됨)</label>
                    <input type="submit" value='주문' />
                </form>
            case AvailableType.BOTH_OK:
                return <form onSubmit={e => {

                    e.preventDefault() // 이거 안해주면 새로고침 때문에 상태객체들 전부 초기화 
                    const hotAndCold = e.currentTarget.coldType.value
                    let cold = hotAndCold === 'cold' ? true : false

                    props.onOrder(props.beverage, undefined, cold)

                }}>
                    <label >레몬차 (냉/온 선택)</label>
                    <select name="coldType" id="ctype">
                        <option value='cold'>cold</option>
                        <option value="hot">hot</option>
                    </select>
                    <input type="submit" value='주문' />
                </form>
        }

    } else if (props.beverage instanceof UylmooC) {
        // 율무차 타입인 경우의 Form
        switch (state) {
            case AvailableType.UNAVAILABLE:
                return <></>
            case AvailableType.BOTH_OK:
                return <form onSubmit={e => {

                    e.preventDefault()
                    props.onOrder(props.beverage, undefined, undefined)

                }}>
                    <label >율무차</label>
                    <input type="submit" value='주문' />
                </form>
        }
    }
    return <></> // 빈 태그 리턴으로 에러방지.
}
export default BeveragesC