import React from 'react'

const Form = () => {
    return (
        <div>
            <header>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
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
            </header>
        </div>
    )
}

export default Form