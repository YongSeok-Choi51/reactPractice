import React from 'react'


// 이름 바꿔보기
const Result = () => {
    return (
        <div>
            <form>
                <label>
                    성함:
                </label>
                <input
                    type="text"
                    placeholder="이름"
                >
                </input>
                <br></br>
                <label>
                    e-mail:
                </label>
                <input
                    type="email"
                    placeholder="e-mail"
                >
                </input> <br></br>
                <button type="submit">등록</button>
            </form>
        </div>
    )
}

export default Result