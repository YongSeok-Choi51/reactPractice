import React, { ReactElement, useState } from 'react'
import './App.css'
import Article from './components/Article'
import Create from './components/Create'
import Header from './components/Header'
import List from './components/List'
import Update from './components/Update'
import StateCode from './enums/StateCode'

/*
    FeedBack (04.05)

    Create, Update 컴포넌트 안에서 특정 input에 대한 Validation을 실패했을때, 해당필드 border를 빨갛게 표시하세요.
    preCheck하고 반환된 결과를 어떤 숫자가 어떤 의미를 가지는지 협업하는사람이 잘 이해할 수 있도록 바꿔보세요.
    코드중복 최대한 없애보세요.
*/

// app component actionMode enumeration type
// app컴포넌트 내부에서만 사용되기 때문에, 여기에 선언하였습니다.
enum ViewMode {
    INIT,       // 초기 모드, 환영문구 출력
    READ,       // 특정id가 set되고, 해당 객체가 display되는 모드
    CREATE,     // 새로운 객체 생성시 동작하는 모드
    UPDATE      // 특정 id가 set, 해당 객체에 대해 수정하는 모드
}

function App() {

    let content: ReactElement | null = null
    let context: ReactElement | null = null

    let uName: string = '' // 이름, 메일 찾기위한 변수
    let uMail: string = ''

    const [mode, setMode] = useState(ViewMode.INIT)
    const [id, setId] = useState(1)
    const [nextId, setNextId] = useState(4)
    const [users, setUsers] = useState([
        { id: 1, userName: '홍길동', userMail: 'hong9@naver.com' },
        { id: 2, userName: '홍길순', userMail: 'hong8@naver.com' },
        { id: 3, userName: '홍길자', userMail: 'hong7@naver.com' }
    ]) // 초기 Dummy Data

    const onCreate = (uName: string, uMail: string): void => {

        const newUser = { id: nextId, userName: uName, userMail: uMail }

        /*
           update, create 컴포넌트에서 마지막 입력 동작에 대해 중복검사 결과값을 반영하지 못하고 값이 넘어와,
           중복되는 마지막 field(email)에 대해서 체크하지 못하고 생성이 되어버리는 문제를
           onCreate 함수 내에서 한번 더 검사함으로써 해결
        */
        if (preCheck(uName, uMail) === StateCode.CHECK_OK) {
            const newUsers = [...users]
            newUsers.push(newUser)
            setUsers(newUsers)
            setMode(ViewMode.READ)
            setId(nextId)
            setNextId(nextId + 1)
        }
    }

    const onUpdate = (uName: string, uMail: string): ReactElement | void => {

        const newUsers = [...users] // 배열을 그대로 복사
        const updatedUser = { id: id, userName: uName, userMail: uMail }

        // onCreate 함수와 동일한 맥락
        if (preCheck(uName, uMail, id) === StateCode.CHECK_OK) {
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

    const preCheck = (uName: string, uMail: string, uid?: number): StateCode => {

        if (uid === undefined) { // Create컴포넌트에서 중복검사를하는경우 (생성 이전이기 때문에 id가 없음)

            for (let i = 0; i < users.length; i++) {

                if ((uName === users[i].userName) && (uMail === users[i].userMail)) return StateCode.DUPLICATION_ALL
                else if (uName === users[i].userName) return StateCode.DUPLICATION_NAME
                else if (uMail === users[i].userMail) return StateCode.DUPLICATION_MAIL
            }

        } else { // Update에서 중복검사하는경우 (이미 존재하는 정보이기 때문에 id존재)

            for (let i = 0; i < users.length; i++) {

                if (uid !== users[i].id) {

                    if ((uName === users[i].userName) && (uMail === users[i].userMail)) return StateCode.DUPLICATION_ALL
                    else if (uName === users[i].userName) return StateCode.DUPLICATION_NAME
                    else if (uMail === users[i].userMail) return StateCode.DUPLICATION_MAIL
                }
            }

        }
        // 해당 구문이 실행되어 함수가 종료된다면, 중복값이 없음
        return StateCode.CHECK_OK
    }

    const findUser = (id: number) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                uName = users[i].userName
                uMail = users[i].userMail
            }
        }
    }


    if (mode === ViewMode.INIT) {
        content = <Article userName='hello' userMail='world' />

    } else if (mode === ViewMode.READ) {
        findUser(id) // 읽어들일 객체를 찾고, 컴포넌트의 props로 넘기기
        content = <Article userName={uName} userMail={uMail} />
        context = <li><a href={'/update/' + id} onClick={e => {
            e.preventDefault()
            setMode(ViewMode.UPDATE)
        }}>Update</a></li>

    } else if (mode === ViewMode.CREATE) {
        content = <Create onCreate={onCreate} preCheck={preCheck} />

    } else if (mode === ViewMode.UPDATE) {
        findUser(id) // 수정할 객체를 찾고, 컴포넌트의 props로 콜백함수와 함께 넘기기 
        content = <Update id={id} userName={uName} userMail={uMail} onUpdate={onUpdate} preCheck={preCheck} />
    }

    return (
        <>
            <Header title="Hello" onChangeMode={async () => setMode(ViewMode.INIT)} />
            <List userList={users} onChangeMode={async (id: number) => {
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