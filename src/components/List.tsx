import React, { ReactElement } from 'react'
import user from '../domains/User'

function List(props: { userList: user[], onChangeMode: (id: number) => {} }): ReactElement {

    const list: ReactElement[] = []
    for (let i of props.userList) {

        list.push(<li key={i.id}>
            <a id={String(i.id)} href={"/read/" + i.id} onClick={e => {
                e.preventDefault() // 화면 새로고침 방지
                props.onChangeMode(i.id)
            }}>{i.userName}</a>
        </li>)

    }

    return <nav>
        <ol>
            {list}
        </ol>
    </nav>
}

export default List