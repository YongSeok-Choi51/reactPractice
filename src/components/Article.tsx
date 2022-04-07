import React, { ReactElement } from 'react'
import User from '../domains/User'

// 객체를 넘겨준다 할때 매개변수를 이런 식으로 할당할 것. 
function Article({ user }: { user: User }): ReactElement {

    return <article>
        <h2>{user.userName}</h2>
        {user.userMail}
    </article>

}

Article.defaultProps = {

}

export default Article