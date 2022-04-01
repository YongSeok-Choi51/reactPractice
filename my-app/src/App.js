
import './App.css'
import { useState } from 'react'



// props -> 호출하는 Client가 전달하는 매개변수의 개념 (immutable)
// state -> 내부 구현에 사용되는 가변데이터 

// App컴포넌트는 INIT <-> CREATE <-> UPDATE 상태를 번갈아가며 다른 동작을 합니다.

// 한개 객체정보를 뿌려주는 컴포넌트 
function Article(props) {
    return <article>
        <h2>{props.userName}</h2>
        {props.userMail}
    </article>
}

// Header 부분을 사용. page의 초기 상태를 결정 -> 초기상태: INIT
function Header(props) {
    return <header>
        <h1><a href="/" onClick={(e) => {
            e.preventDefault()
            props.onChangeMode()
        }}>{props.title}</a></h1>
    </header>
}

// 사용자 정보를 담는 배열을 사용해 
function List(props) {

    const list = []

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

// 사용자에게 입력값을 받는 form + 
function Create(props) {

    return <div>
        <h2>입력창</h2>
        <form onSubmit={e => {
            e.preventDefault()
            const name = e.target.name.value
            const mail = e.target.mail.value
            // 콜백함수? -> 사용자에게 입력을 받고, Create태그를 포함하는 다른 컴포넌트에게 값의 변경을 알려주는 리턴함수.. 개념이 명확하게 잡히지 않음.
            props.onCreate(name, mail)
        }}>
            <p><input type="text" name="name" placeholder='이름' /></p>
            <p><input type="email" name='mail' placeholder='이메일' /></p>
            <p><input type="submit" value="생성" /></p>
        </form>
    </div>
}

function Update(props) {

    // hook에 대해서도 공부하기
    const [userName, setName] = useState(props.userName)
    const [userMail, setMail] = useState(props.userMail)

    return <div>
        <h2>Update</h2>
        <form onSubmit={e => {
            e.preventDefault()
            const userName = e.target.userName.value
            const userMail = e.target.userMail.value
            props.onUpdate(userName, userMail) // Update컴포넌트의 prop 함수를 호출하여 변경됨을 통보
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
    ]) // 초기 Dummy Data

    // 가변적으로 표현할 변수 선언 
    let content = null
    let context = null


    // 초기 view상태인 경우 화면표시
    if (mode === 'INIT') {

        content = <Article name='hello' mail='world'> </Article>

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
        content = <Create onCreate={(userName, userMail) => {
            const newInfo = { id: nextId, userName: userName, userMail: userMail }

            // 새로운 주소값을 할당받아 데이터를 추가해야지 리액트의 가상 돔이 변경을 감지하는듯 함
            // 원시자료형은 고려대상이 아니다.
            //이전 데이터를 그대로 복사하여 새로운 데이터를 추가
            const newInfos = [...infos]
            newInfos.push(newInfo)
            setInfos(newInfos)
            setMode('READ')
            setId(nextId)
            setNextId(nextId + 1) // 다음 생성값을 위한 id
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
    )
}

export default App
