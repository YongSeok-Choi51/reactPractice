import { lstat } from 'fs/promises'
import React, { ReactElement, useState } from 'react'
import './App.css'
import Article from './components/Article'
import Header from './components/Header'
import List from './components/List'
import Save from './components/Save'
import User from './domains/User'
import StateCode from './enums/StateCode'

/*
    FeedBack (04.06)
    코드중복 최대한 없애보세요
    let 사용 지양하세요
    매개변수 이름을 user 인터페이스로 일관성있게 사용하세요
    id값 유무에 따라 update/create form + callback함수 추상화하세요
*/

// app component actionMode enumeration type
// app컴포넌트 내부에서만 사용되기 때문에, 여기에 선언하였습니다.
enum ViewMode {
    INIT,       // 초기 모드, 환영문구 출력
    READ,       // 특정id가 set되고, 해당 객체가 display되는 모드
    CREATE,     // 새로운 객체 생성시 동작하는 모드
    UPDATE      // 특정 id가 set, 해당 객체에 대해 수정하는 모드
}

// 렌더링 될 때 마다 초기화가 된다. 사용을 지양한다.
// let 변수 안쓰는 이유가 렌더링 될 때마다 초기화가 되기 때문인걸까?
// TS에서는 비동기적 특성 때문에 메소드체이닝을 사용하면 문제가 많이 일어나는걸까?
// const자료형을 Java제너릭처럼 Setting할 수 있다!

let renderCounter = 0
function App() {

    renderCounter++

    //Refactor
    const [user, setUser] = useState<User>({ id: undefined!, userName: 'hello', userMail: 'world' })
    const [mode, setMode] = useState<ViewMode>(ViewMode.INIT)
    const [id, setId] = useState<number | undefined>(1)
    const [nextId, setNextId] = useState<number>(4)

    //Refactor
    const [users, setUsers] = useState<Array<User>>([
        { id: 1, userName: '홍길동', userMail: 'hong9@naver.com' },
        { id: 2, userName: '홍길순', userMail: 'hong8@naver.com' },
        { id: 3, userName: '홍길자', userMail: 'hong7@naver.com' }
    ]) // 초기 Dummy Data

    // Create / Update 를 하나의 함수에서 핸들링
    const onSave = (user: User): void => {

        if (user.id === undefined) { // Create

            const newUser = { id: nextId, userName: user.userName, userMail: user.userMail }
            const newUsers = [...users]

            newUsers.push(newUser)
            setUsers(newUsers)
            setMode(ViewMode.READ)
            setId(nextId)
            setNextId(nextId + 1)

        } else { // Update

            const newUsers = [...users]
            const updatedUser = { id: id, userName: user.userName, userMail: user.userMail }
            for (let i = 0; i < newUsers.length; i++) {
                if (newUsers[i].id === id) {
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

            // undefined와 비교..?
            if (user.id !== users[i].id) {

                if ((user.userName === users[i].userName) && (user.userMail === users[i].userMail)) return StateCode.DUPLICATION_ALL
                else if (user.userName === users[i].userName) return StateCode.DUPLICATION_NAME
                else if (user.userMail === users[i].userMail) return StateCode.DUPLICATION_MAIL
            }
        }
        // 해당 구문이 실행되어 함수가 종료된다면, 중복값이 없음
        return StateCode.CHECK_OK
    }

    const findUser = (id: number | undefined): User => {

        let idx: number = 0
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                idx = i
                break
            }
        }
        return users[idx]
    }


    //Refactoring to Func 
    const renderContent = () => {
        if (mode === ViewMode.INIT) {
            return <Article user={user} />
        } else if (mode === ViewMode.READ) {
            const tempUser = findUser(id)
            return <Article user={tempUser} />
        } else if (mode === ViewMode.CREATE) {
            return <Save user={undefined} onSave={onSave} preCheck={preCheck} />
        } else if (mode === ViewMode.UPDATE) {
            const tempUser = findUser(id) // 수정할 객체를 찾고, 컴포넌트의 props로 콜백함수와 함께 넘기기 
            return <Save user={tempUser} onSave={onSave} preCheck={preCheck} />
        }
    }

    const renderContext = () => {
        if (mode === ViewMode.READ) {
            return <li><a href={'/update/' + id} onClick={e => {
                e.preventDefault()
                setMode(ViewMode.UPDATE)
            }}>Update</a></li>
        }
    }

    const content = renderContent()
    const context = renderContext()
    return (
        <>
            <Header title={`Hello ${renderCounter}`} onChangeMode={async () => setMode(ViewMode.INIT)} />
            <List userList={users} onChangeMode={async (id: number | undefined) => {
                setMode(ViewMode.READ)
                setId(id)
            }} />
            {content}
            <ul>
                <li><a href="/create" onClick={e => {
                    e.preventDefault()
                    setMode(ViewMode.CREATE)
                }}>등록하기</a></li>
                {context}
            </ul>
        </>
    )
}
export default App