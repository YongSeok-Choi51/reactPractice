
import { useState, useCallback } from 'react';
import './App.css';
import UserStore, { DEFAULT_USER_FORMAT } from './UserStore';

// 모드가 바뀔떄 바뀐 props의 값으로 input의 초기값이 결정되지 못하는 경우
const SaveForm = (props) => {

    const { selected, onSubmit } = props;
    console.log("props", props);
    const [userInput, setUserInput] = useState(() => ({ ...selected }));
    console.log("saveForm userInput", userInput);

    const inputElements = useCallback((name, email) => (
        <>
            <p><input type="text" name='userName' placeholder='이름' value={userInput.userName} onChange={onInputChange} /></p>
            <p><input type="email" name='userMail' placeholder='이메일' value={userInput.userMail} onChange={onInputChange} /></p>
        </>
    ), [selected]);

    const onInputChange = (e) => {
        userInput[e.target.getAttribute("name")] = e.target.value;
        setUserInput((userInput) => ({ ...userInput }));
        // console.log(userInput);
    };

    return (
        <>
            <div>
                <h2>{selected.id === undefined ? "Create" : "Update"}</h2>
                <form onSubmit={e => {
                    e.preventDefault();
                    // console.log("onSubmit", userInput);
                    onSubmit(userInput);
                }}>
                    {/* {inputElements()} */}
                    <p><input type="text" name='userName' placeholder='이름' value={userInput.userName} onChange={onInputChange} /></p>
                    <p><input type="email" name='userMail' placeholder='이메일' value={userInput.userMail} onChange={onInputChange} /></p>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    );
};

const App = () => {

    const store = new UserStore([
        { id: 1, userName: '홍길동', userMail: 'hong9@naver.com' },
        { id: 2, userName: '홍길순', userMail: 'hong8@naver.com' },
        { id: 3, userName: '홍길자', userMail: 'hong7@naver.com' }
    ]);

    const [selected, setSelected] = useState(undefined);

    const onSubmit = (value) => {
        store.onSubmit(value);
        setSelected(undefined);
    };

    return (
        <div>
            <h1>유저관리 시스템</h1>
            <div>
                {store && store.getUserArray().map(user => (
                    <li key={user.id}>
                        <a id={user.id} href='/' onClick={evt => {
                            // console.log("React.MouseEvent<HTMLAnchorElement, MouseEvent>", evt);
                            evt.preventDefault();
                            store.detail(user);
                            setSelected(user);
                        }}>{user.userName}
                        </a>
                    </li>
                ))}
            </div>
            <div>
                {selected && (
                    <article>
                        <h2>{selected.userName}</h2>
                        {selected.userMail}
                    </article>
                )}
                {/* {store.selected && store.selected.userName} */}
            </div>
            <div>
                {!selected && (<button onClick={() => setSelected({ ...DEFAULT_USER_FORMAT })}>등록하기</button>)}
            </div>
            <div>
                {selected && (<SaveForm selected={selected} onSubmit={onSubmit} />)}
            </div>
        </div>
    );
};

export default App;
