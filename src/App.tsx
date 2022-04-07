import React, { ReactElement, useState } from 'react'
import './App.css'
import Article from './components/Article'
import Header from './components/Header'
import List from './components/List'
import Save from './components/Save'
import User from './domains/User'
import StateCode from './enums/StateCode'
import ViewMode from './enums/ViewMode'

/*
    app component actionMode enumeration type
    app컴포넌트 내부에서만 사용되기 때문에, 여기에 선언하였습니다.
    렌더링 될 때 마다 초기화가 된다. 사용을 지양한다.
    let 변수 안쓰는 이유가 렌더링 될 때마다 초기화가 되기 때문인걸까?
    TS에서는 비동기적 특성 때문에 메소드체이닝을 사용하면 문제가 많이 일어나는걸까?
    const자료형을 Java제너릭처럼 설정할 수 있다.
*/


let renderCounter = 0
function App() {

    renderCounter++

    //Refactor
    const [user, setUser] = useState<User>({ id: undefined!, userName: undefined, userMail: undefined })
    const [mode, setMode] = useState<ViewMode>(ViewMode.READ)
    const [nextId, setNextId] = useState<number>(4)
    const [users, setUsers] = useState<Array<User>>([
        { id: 1, userName: '홍길동', userMail: 'hong9@naver.com' },
        { id: 2, userName: '홍길순', userMail: 'hong8@naver.com' },
        { id: 3, userName: '홍길자', userMail: 'hong7@naver.com' }
    ]) // 초기 Dummy Data

    // Create / Update 를 하나의 함수에서 핸들링
    const onSave = (user: User): void => {

        if (user.id === undefined) {
            const newUser = { id: nextId, userName: user.userName, userMail: user.userMail }
            const newUsers = [...users]

            newUsers.push(newUser)
            setUsers(newUsers)
            setMode(ViewMode.READ)
            setUser(newUser)
            setNextId(nextId + 1)
        } else {
            const newUsers = [...users]
            const updatedUser = { id: user.id, userName: user.userName, userMail: user.userMail }
            for (let i = 0; i < newUsers.length; i++) {
                if (newUsers[i].id === user.id) {
                    newUsers[i] = updatedUser
                    break
                }
            }
            setUsers(newUsers)
            setMode(ViewMode.READ)
        }

    }

    const preCheck = (user: User): StateCode => {

        for (let i = 0; i < users.length; i++) {
            if (user.id !== users[i].id) {
                if ((user.userName === users[i].userName) && (user.userMail === users[i].userMail)) return StateCode.DUPLICATION_ALL
                else if (user.userName === users[i].userName) return StateCode.DUPLICATION_NAME
                else if (user.userMail === users[i].userMail) return StateCode.DUPLICATION_MAIL
            }
        }
        // 해당 구문이 실행되어 함수가 종료된다면, 중복값이 없음
        return StateCode.CHECK_OK
    }

    const changeModeToRead = (user: User | undefined) => {
        setMode(ViewMode.READ)
        if (user !== undefined) {
            setUser(user)
        }
    }

    //Refactoring to Func 
    const renderContent = () => {
        if (mode === ViewMode.READ) {
            return <Article user={user} />
        } else if (mode === ViewMode.CREATE) {
            return <Save user={undefined} mode={mode} onSave={onSave} preCheck={preCheck} />
        } else if (mode === ViewMode.UPDATE) {
            return <Save user={user} mode={mode} onSave={onSave} preCheck={preCheck} />
        }
    }

    const renderContext = () => {
        if (mode === ViewMode.READ) {
            return <li><a href={'/update/' + `${user.id}`} onClick={e => {
                e.preventDefault()
                setMode(ViewMode.UPDATE)
            }}>Update</a></li>
        }
    }

    const content = renderContent()
    const context = renderContext()
    return (
        <>
            <Header title={`Hello ${renderCounter}`} onTouch={async () => setMode(ViewMode.READ)} />
            <List userList={users} changeModeToRead={changeModeToRead} />
            {content}
            <ul>
                <li><a href="/create" onClick={e => {
                    e.preventDefault()
                    setMode(ViewMode.CREATE)
                }}>{mode === ViewMode.UPDATE ? undefined : '등록하기'}</a></li>
                {context}
            </ul>
        </>
    )
}
export default App