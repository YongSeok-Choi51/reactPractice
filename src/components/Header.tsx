import React, { ReactElement } from 'react'
function Header(props: { title: string, onChangeMode: () => {} }): ReactElement {

    return <header>
        <h1><a href="/" onClick={e => {
            e.preventDefault()
            props.onChangeMode()
        }}>{props.title}</a></h1>
    </header>

}
export default Header
