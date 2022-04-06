import React, { useState } from 'react'
import user from '../domains/User'
import StateCode from '../enums/StateCode'

function Create(props: {
    onCreate: (user: user) => void,
    preCheck: (user: user) => StateCode
}) {

    const style = {
        border: '5px solid red',
        display: 'inline-block'
    }

    // 초기 State설정 
    const [userName, setName] = useState('')
    const [userMail, setMail] = useState('')
    const [curCode, setCode] = useState(StateCode.WAIT_CONFIRM)


    // 사용자가 타이핑을 할 때마다 중복검사 실행.
    // Name, Mail필드에 대해서 중복되는지 검사 이후 중복되면 빨간 Border로 표시
    return <div>
        <h2>입력창</h2>
        <form onSubmit={e => {

            e.preventDefault()

            const tempUser = {
                userName: userName,
                userMail: userMail,
                id: undefined!
            }
            setCode(props.preCheck(tempUser))
            console.log("stateValue ", userName, userMail, "formValue", e.currentTarget.userName.value, e.currentTarget.userMail.value)
            console.log(curCode)

            if (curCode === StateCode.CHECK_OK) {
                props.onCreate(tempUser)
            }

        }}>
            <p style={curCode === StateCode.DUPLICATION_ALL ? style : undefined}>

                {/* Name field */}
                <p style={curCode === StateCode.DUPLICATION_NAME ? style : undefined}>
                    <input type="text" name='userName' placeholder='이름' onChange={e => {
                        setName(e.target.value)
                        //setCode(props.preCheck(userName, userMail, undefined!))
                    }} />
                </p>
                {curCode === StateCode.DUPLICATION_NAME ? '같은 이름의 사용자가 존재합니다.' : ''}

                {/* e-Mail field */}
                <p style={curCode === StateCode.DUPLICATION_MAIL ? style : undefined}>
                    <input type="email" name='userMail' placeholder='이메일' onChange={e => {
                        setMail(e.target.value)
                        //setCode(props.preCheck(userName, userMail, undefined!))
                    }} />
                </p>
                {curCode === StateCode.DUPLICATION_MAIL ? '중복된 이메일이 존재합니다.' : ''}

                <p><input type="submit" value="생성" /></p>
            </p><br />
            {curCode === StateCode.DUPLICATION_ALL ? '동일한 유저가 이미 존재합니다.' : ''}
        </form>
    </div>
}

export default Create