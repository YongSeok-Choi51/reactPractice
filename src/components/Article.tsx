import React, { ReactElement } from 'react'
import User from '../domains/User'

// 객체를 넘겨준다 할때 매개변수를 이런 식으로 할당할 것. 
function Article({ user }: { user: User | undefined }): ReactElement {

    return <article>
        <h2>{user !== undefined ? user.userName : ''}</h2>
        {user !== undefined ? user.userMail : ''}
    </article>

}

export default Article