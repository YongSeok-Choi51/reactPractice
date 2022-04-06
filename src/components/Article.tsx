import React, { ReactElement } from 'react'

// any 타입으로 변경하여 children 바인딩 문제 해결... 근본적인 솔루션이 아니다.  -> Question
function Article(props: any): ReactElement {

    return <article>
        <h2>{props.userName}</h2>
        {props.userMail}
    </article>

}

export default Article