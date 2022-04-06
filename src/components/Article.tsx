import React, { ReactElement } from 'react'
import user from '../domains/User'

// any 타입으로 변경하여 children 바인딩 문제 해결... 근본적인 솔루션이 아니다.  -> Question
function Article(user: user): ReactElement {

    return <article>
        <h2>{user.userName}</h2>
        {user.userMail}
    </article>

}

export default Article