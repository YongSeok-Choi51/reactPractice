import React, { useState } from 'react'
import User from '../domains/User'
import StateCode from '../enums/StateCode'
import ViewMode from '../enums/ViewMode'


function Save(props: {
    user: User | undefined,
    mode: ViewMode,
    onSave: (user: User) => void,
    preCheck: (user: User) => StateCode
}) {

    const style = {
        border: '5px solid red',
        display: 'inline-block'
    }

    // 초기 State설정 
    const [userName, setName] = useState<string | undefined>(props.user !== undefined ? props.user.userName : '')
    const [userMail, setMail] = useState<string | undefined>(props.user !== undefined ? props.user.userMail : '')
    const [curCode, setCode] = useState(StateCode.WAIT_CONFIRM)

    return <div>
        <h2>{props.mode === ViewMode.CREATE ? "Create" : "Update"}</h2>
        <form onSubmit={e => {

            e.preventDefault()

            const tempUser: User = {
                userName: userName,
                userMail: userMail,
                id: props.user !== undefined ? props.user.id : undefined
            }
            setCode(props.preCheck(tempUser))

            if (curCode === StateCode.CHECK_OK) {
                props.onSave(tempUser)
            }
        }}>
            <p style={curCode === StateCode.DUPLICATION_ALL ? style : undefined}>

                {/* Name field */}
                <p style={curCode === StateCode.DUPLICATION_NAME ? style : undefined}>
                    <input type="text" name='userName' placeholder='이름' value={props.mode === ViewMode.CREATE ? undefined : userName} onChange={e => {
                        setName(e.target.value)
                    }} />
                </p>
                {curCode === StateCode.DUPLICATION_NAME ? '같은 이름의 사용자가 존재합니다.' : ''}

                {/* e-Mail field */}
                <p style={curCode === StateCode.DUPLICATION_MAIL ? style : undefined}>
                    <input type="email" name='userMail' placeholder='이메일' value={props.mode === ViewMode.CREATE ? undefined : userMail} onChange={e => {
                        setMail(e.target.value)
                    }} />
                </p>
                {curCode === StateCode.DUPLICATION_MAIL ? '중복된 이메일이 존재합니다.' : ''}
                <p><input type="submit" value="제출" /></p>

            </p><br />
            {curCode === StateCode.DUPLICATION_ALL ? '동일한 유저가 이미 존재합니다.' : ''}
        </form>
    </div>
}
export default Save