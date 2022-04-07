import React, { ReactElement } from 'react'
function Header(props: { title: string, onTouch: () => void }): ReactElement {

    return <header>
        <h1><a href="/" onClick={e => {
            e.preventDefault()
            props.onTouch()
        }}>{props.title}</a></h1>
    </header>

}
export default Header
