import React, { useState } from 'react'
import StateCode from '../enums/StateCode'

function Update(props: {
    id: number, userName: string, userMail: string,
    onUpdate: (uName: string, uMail: string) => void,
    preCheck: (userName: string, userMail: string, uid?: number) => StateCode
}) {

    const style = {
        border: '5px solid red',
        display: 'inline-block'
    }

    // 초기 State설정 
    const [userName, setName] = useState(props.userName)
    const [userMail, setMail] = useState(props.userMail)
    const [curCode, setCode] = useState(StateCode.WAIT_CONFIRM)

    // 사용자가 타이핑을 할 때마다 중복검사 실행.
    // Name, Mail필드에 대해서 중복되는지 검사 이후 중복되면 빨간 Border로 표시
    return <div>
        <h2>Update</h2>
        <form onSubmit={e => {
            e.preventDefault()
            const uName = e.currentTarget.userName.value
            const uMail = e.currentTarget.userMail.value
            setCode(props.preCheck(uName, uMail, props.id))
            props.onUpdate(uName, uMail) // Update컴포넌트의 prop 함수를 호출하여 변경됨을 통보
        }}>
            <p style={curCode === StateCode.DUPLICATION_ALL ? style : undefined}>

                {/* Name field */}
                <p style={curCode === StateCode.DUPLICATION_NAME ? style : undefined}>
                    <input type="text" name='userName' placeholder='이름' value={userName} onChange={e => {
                        setName(e.target.value)
                        setCode(props.preCheck(userName, userMail, props.id))
                    }} />
                </p>
                {curCode === StateCode.DUPLICATION_NAME ? '같은 이름의 사용자가 존재합니다.' : ''}

                {/* e-Mail field */}
                <p style={curCode === StateCode.DUPLICATION_MAIL ? style : undefined}>
                    <input type="email" name='userMail' placeholder='이메일' value={userMail} onChange={e => {
                        setMail(e.target.value)
                        setCode(props.preCheck(userName, userMail, props.id))
                    }} />
                </p>
                {curCode === StateCode.DUPLICATION_MAIL ? '중복된 이메일이 존재합니다.' : ''}

                <p><input type="submit" value="수정" /></p>
            </p><br />
            {curCode === StateCode.DUPLICATION_ALL ? '동일한 유저가 이미 존재합니다.' : ''}
        </form>
    </div>
}

export default Update