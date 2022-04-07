import React, { ReactElement } from 'react'
import User from '../domains/User'

function List(props: { userList: User[], changeModeToRead: (user: User) => void }): ReactElement {

    const list: ReactElement[] = []
    for (let i of props.userList) {
        list.push(<li key={i.id}>
            <a id={String(i.id)} href={"/read/" + i.id} onClick={e => {
                e.preventDefault() // 화면 새로고침 방지
                props.changeModeToRead(i) // i 번쨰 유저객체 저장.
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