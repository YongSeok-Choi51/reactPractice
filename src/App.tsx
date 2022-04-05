import React, { ReactElement, useState } from 'react'
import './App.css'


// app컴포넌트에 create, update 공통으로 사용할 Validation구현하기.(이름, 이메일중에 중복값있는지, 있으면 어떤 필드가 문제인지 파악해서))

// 사용자 정보를 담을 구조체 선언 nullable
interface user {
    id: number,
    userName: string,
    userMail: string
}



// any 타입으로 변경하여 children 바인딩 문제 해결... 근본적인 솔루션이 아니다. 
function Article(props: any): ReactElement {

    return <article>
        <h2>{props.userName}</h2>
        {props.userMail}
    </article>

}



function Header(props: { title: string, onChangeMode: () => {} }): ReactElement {

    return <header>
        <h1><a href="/" onClick={e => {
            e.preventDefault()
            props.onChangeMode()
        }}>{props.title}</a></h1>
    </header>

}



function List(props: { userList: user[], onChangeMode: (id: number) => {} }): ReactElement {

    const list: ReactElement[] = []

    for (let i of props.userList) {

        list.push(<li key={i.id}>
            <a id={String(i.id)} href={"/read/" + i.id} onClick={e => {
                e.preventDefault() // 화면 새로고침 방지
                props.onChangeMode(i.id) // 여기 의심스러움.
            }}>{i.userName}</a> { /*userName:'홍길동', userMail:'a123@naver.com'*/}
        </li>)

    }

    return <nav>
        <ol>
            {list}
        </ol>
    </nav>
}



function Create(props: { onCreate: (uName: string, uMail: string) => void }) {

    return <div>
        <h2>입력창</h2>
        <form onSubmit={e => {
            e.preventDefault()
            const uName = e.currentTarget.userName.value
            const uMail = e.currentTarget.userMail.value // 바인딩이 될까?
            props.onCreate(uName, uMail)

        }}>
            <p><input type="text" name='userName' placeholder='이름' /></p>
            <p><input type="email" name='userMail' placeholder='이메일' /></p>
            <p><input type="submit" value="생성" /></p>

        </form>
    </div>
}



function Update(props: { userName: string, userMail: string, onUpdate: (uName: string, uMail: string) => void }) {

    // hook에 대해서도 공부하기
    // prop이 넘어오면 변경되지 않는 문제를 내부 state로 대입해서, 변경 가능하도록 설정
    const [userName, setName] = useState(props.userName)
    const [userMail, setMail] = useState(props.userMail)

    return <div>
        <h2>Update</h2>
        <form onSubmit={e => {
            e.preventDefault()
            const uName = e.currentTarget.userName.value
            const uMail = e.currentTarget.userMail.value
            props.onUpdate(uName, uMail) // Update컴포넌트의 prop 함수를 호출하여 변경됨을 통보
        }}>
            <p><input type="text" name='userName' placeholder='이름' value={userName} onChange={e => {
                setName(e.target.value)
            }} /></p>
            <p><input type="email" name='userMail' placeholder='이메일' value={userMail} onChange={e => {
                setMail(e.target.value)
            }} /></p>
            <p><input type="submit" value="Update" /></p>
        </form>
    </div>

}




function App() {

    // hook을 사용할때에는 제너릭 명시를 하지 않아도 된다고 함
    const [mode, setMode] = useState('INIT')
    const [id, setId] = useState(1)
    const [nextId, setNextId] = useState(4)
    const [users, setUsers] = useState([
        { id: 1, userName: '홍길동', userMail: 'hong9@naver.com' },
        { id: 2, userName: '홍길순', userMail: 'hong8@naver.com' },
        { id: 3, userName: '홍길자', userMail: 'hong7@naver.com' }
    ]) // 초기 Dummy Data


    let content: ReactElement | null = null
    let context: ReactElement | null = null
    let flag: number

    const onCreate = (uName: string, uMail: string) => {

        const newUser = { id: nextId, userName: uName, userMail: uMail }

        // 멀티 스레드 환경에서는 문제가 될 수 있을것 같다. 어떻게 해야할까?
        flag = preCheck(newUser)
        // update와 같은 구조인데 다른동작. 뭔가 추상화시키고 싶다.
        switch (flag) {
            case -1:
                const newUsers = [...users]
                newUsers.push(newUser)
                setUsers(newUsers)
                setMode('READ')
                setId(nextId)
                setNextId(nextId + 1)
                break
            case 3:
                alert('이미 동일한 유저가 존재합니다.')
                break
            case 2:
                alert('중복된 이름이 존재합니다.\n 다른 이름을 등록해주세요.')
                break
            case 1:
                alert('중복된 Mail이 존재합니다.\n 다른 Mail을 등록해주세요.')
                break
        }
    }

    const onUpdate = (uName: string, uMail: string) => {

        const newUsers = [...users] // 배열을 그대로 복사
        const updatedUser = { id: id, userName: uName, userMail: uMail }

        flag = preCheck(updatedUser)
        switch (flag) {
            case -1:
                for (let i = 0; i < newUsers.length; i++) {
                    if (newUsers[i].id === id) {
                        newUsers[i] = updatedUser
                        break
                    }
                }
                setUsers(newUsers)
                setMode('READ')
                break
            case 3:
                alert('이미 동일한 유저가 존재합니다.')
                break
            case 2:
                alert('중복된 이름이 존재합니다.\n 다른 이름을 등록해주세요.')
                break
            case 1:
                alert('중복된 Mail이 존재합니다.\n 다른 Mail을 등록해주세요.')
                break
        }
    }

    const preCheck = (user: user): number => {

        for (let i = 0; i < users.length; i++) {

            // 매개변수로 넘어온 id가 현재 존재하는 배열의 유저와 다를 때, 즉 자기 자신이 아닌 column일 때
            if (user.id !== users[i].id) {

                // 이름 | 이메일이 중복되는 경우 + 둘 다 중복되는 경우
                if ((user.userName === users[i].userName) && (user.userMail === users[i].userMail)) return 3
                else if (user.userName === users[i].userName) return 2
                else if (user.userMail === users[i].userMail) return 1
            }
        }
        // 해당 구문이 실행되어 함수가 종료된다면, 중복값이 없음
        return -1
    }


    if (mode === 'INIT') {

        // children 속성이 뭘까...
        content = <Article userName='hello' userMail='world'> </Article>

    } else if (mode === 'READ') {

        // 특정 유저가 선택이 되어 상태가 변경이 됐을때, 해당되는 객체를 props로 넘겨 렌더링
        // 특정 state T일때, setting되어있는 id값을 찾아, 그 값으로 동작
        let uName, uMail = null
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                uName = users[i].userName
                uMail = users[i].userMail
            }
        }

        content = <Article userName={uName} userMail={uMail}></Article>
        context = <li><a href={'/update/' + id} onClick={e => {
            e.preventDefault()
            setMode('UPDATE')
        }}>Update</a></li>

    } else if (mode === 'CREATE') {

        content = <Create onCreate={onCreate}></Create>

    } else if (mode === 'UPDATE') {

        // 이름과 이메일을 찾기위한 변수
        let uName = ''
        let uMail = ''

        // 현재 상태에 저장된 id값인경우 (READ로 보여지고 있는 객체id) 
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                uName = users[i].userName
                uMail = users[i].userMail
            }
        }
        content = <Update userName={uName} userMail={uMail} onUpdate={onUpdate}></Update>
    }

    return (
        <>
            {/* async 쓰면 에러가 없어지는데, 왜그런지 공부하기 */}
            <Header title="Hello" onChangeMode={async () => setMode('INIT')}></Header>
            <List userList={users} onChangeMode={async (id) => {
                // 특정 유저를 클릭하면, 모드를 변경하고 해당하는 unique한 id를 가진 객체를 가져오기
                setMode('READ')
                setId(id)
            }}></List>
            {content}
            <ul>
                <li><a href="/create" onClick={e => {
                    e.preventDefault()
                    setMode('CREATE')
                }}>등록하기</a></li>
                {context}
            </ul>
        </>
    )
}
export default App
