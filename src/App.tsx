import React, { ReactElement, ReactNode, useState } from 'react'
import './App.css'


// 사용자 정보를 담을 구조체 선언
interface anUser {
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



function List(props: { userList: anUser[], onChangeMode: (id: number) => {} }): ReactElement {

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
    const [infos, setInfos] = useState([
        { id: 1, userName: '홍길동', userMail: 'hong9@naver.com' },
        { id: 2, userName: '홍길순', userMail: 'hong8@naver.com' },
        { id: 3, userName: '홍길자', userMail: 'hong7@naver.com' }
    ]) // 초기 Dummy Data


    let content: ReactElement | null = null
    let context: ReactElement | null = null
    let flag: boolean

    // 제출하면 화면이 아예 없어지는 현상.. 
    const onCreate = (uName: string, uMail: string) => {
        alert('호출됨')
        const newInfo = { id: nextId, userName: uName, userMail: uMail }
        flag = true

        for (let i = 0; i < infos.length; i++) {
            if (infos[i].userName === uName) {
                alert('동일한 이름은 등록할 수 없습니다.')
                setMode('INIT')
                flag = false
                break
            }
        }

        // 새로운 주소값을 할당받아 데이터를 추가해야지 리액트의 가상 돔이 변경을 감지하는듯 함
        // 원시자료형은 고려대상이 아니다.
        //이전 데이터를 그대로 복사하여 새로운 데이터를 추가
        if (flag) {
            const newInfos = [...infos]
            newInfos.push(newInfo)
            setInfos(newInfos)
            setMode('READ')
            setId(nextId)
            setNextId(nextId + 1) // 다음 생성값을 위한 id
        }
    }

    const onUpdate = (uName: string, uMail: string) => {
        console.log(uName, uMail)
        const newInfos = [...infos] // 배열을 그대로 복사
        const updatedInfo = { id: id, userName: uName, userMail: uMail }
        for (let i = 0; i < newInfos.length; i++) {
            if (newInfos[i].id === id) {
                newInfos[i] = updatedInfo
                break
            }
        }
        setInfos(newInfos)
        setMode('READ')
    }


    if (mode === 'INIT') {

        // children 속성이 뭘까...
        content = <Article userName='hello' userMail='world'> </Article>

    } else if (mode === 'READ') {

        // 특정 유저가 선택이 되어 상태가 변경이 됐을때, 해당되는 객체를 props로 넘겨 렌더링
        // 특정 state T일때, setting되어있는 id값을 찾아, 그 값으로 동작
        let uName, uMail = null
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].id === id) {
                uName = infos[i].userName
                uMail = infos[i].userMail
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
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].id === id) {
                uName = infos[i].userName
                uMail = infos[i].userMail
            }
        }
        content = <Update userName={uName} userMail={uMail} onUpdate={onUpdate}></Update>
    }

    return (
        <>
            <div>
                {/* async 쓰면 에러가 없어지는데, 왜그런지 공부하기 */}
                <Header title="Hello" onChangeMode={async () => setMode('INIT')}></Header>
                <List userList={infos} onChangeMode={async (id) => {
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
            </div>
        </>
    )
}
export default App
