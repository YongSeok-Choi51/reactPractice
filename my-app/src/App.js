import './App.css'
import { useState } from 'react'

// props -> 호출하는 Client가 전달하는 매개변수의 개념 (immutable)
// state -> 내부 구현에 사용되는 가변데이터 

function Article(props) {
    return <article>
        <h2>{props.userName}</h2>
        {props.userMail}
    </article>
}

function Header(props) {
    return <header>
        <h1><a href="/" onClick={(e) => {
            e.preventDefault()
            props.onChangeMode()
        }}>{props.title}</a></h1>
    </header>
}

function List(props) {

    const list = []
    // <App>에서 인자로 넘겨받은 props를 출력
    for (let i = 0; i < props.infos.length; i++) {
        let temp = props.infos[i]
        list.push(<li key={temp.id}>
            <a id={temp.id} href={"/read/" + temp.id} onClick={e => {
                e.preventDefault() // 화면 새로고침 방지
                props.onChangeMode(Number(e.target.id))
            }}>{temp.userName}</a> { /*userName:'홍길동', userMail:'a123@naver.com'*/}
        </li>)
    }

    return <nav>
        <ol>
            {list}
        </ol>
    </nav>

}

// 중복이름 확인하는 기능 추가해보기
function Create(props) {

    return <div>
        <h2>입력창</h2>
        <form onSubmit={e => {
            e.preventDefault()
            const name = e.target.name.value
            const mail = e.target.mail.value
            props.onCreate(name, mail) // 콜백함수?
        }}>
            <p><input type="text" name="name" placeholder='이름' /></p>
            <p><input type="email" name='mail' placeholder='이메일' /></p>
            <p><input type="submit" value="생성" /></p>
        </form>
    </div>
}

function Update(props) {

    //
    const [userName, setName] = useState(props.userName)
    const [userMail, setMail] = useState(props.userMail)

    return <div>
        <h2>Update</h2>
        <form onSubmit={e => {
            e.preventDefault()
            const userName = e.target.userName.value
            const userMail = e.target.userMail.value
            props.onUpdate(userName, userMail)
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

    const [mode, setMode] = useState('INIT') // 등록, 수정을 구분하기 위한 모드 변수 사용
    const [id, setId] = useState(null) // 각각의 태그를 구분지을 id사용
    const [nextId, setNextId] = useState(4)
    const [infos, setInfos] = useState([
        { id: 1, userName: '홍길동', userMail: 'hong9@naver.com' },
        { id: 2, userName: '홍길순', userMail: 'hong8@naver.com' },
        { id: 3, userName: '홍길자', userMail: 'hong7@naver.com' }
    ]) // 초기 배열 선언

    // 가변적으로 표현할 변수 선언 
    let content = null
    let context = null


    if (mode === 'INIT') {

        content = <Article name='hello' mail='world'> </Article>

    } else if (mode === 'READ') {
        let uName, uMail = null
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].id === id) {
                uName = infos[i].userName
                uMail = infos[i].userMail
            }
        }

        content = <Article userName={uName} userMail={uMail}></Article>
        context = <li><a href={'/update/' + id} onClick={event => {
            event.preventDefault()
            setMode('UPDATE')
        }}>Update</a></li>

    } else if (mode === 'CREATE') {
        content = <Create onCreate={(userName, userMail) => {
            const newInfo = { id: nextId, userName: userName, userMail: userMail }
            const newInfos = [...infos]
            newInfos.push(newInfo)
            setInfos(newInfos)
            setMode('READ')
            setId(nextId)
            setNextId(nextId + 1)
        }}></Create>

    } else if (mode === 'UPDATE') {
        let uName, uMail = null
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].id === id) {
                uName = infos[i].userName
                uMail = infos[i].userMail
            }
        }
        content = <Update userName={uName} userMail={uMail} onUpdate={(uName, uMail) => {
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
        }}></Update>
    }


    return (
        <div>
            <Header title="Hello" onChangeMode={() => {
                setMode('INIT')
            }}></Header>
            <List infos={infos} onChangeMode={(id) => {
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
    )
}

export default App
