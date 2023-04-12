
import { useState } from 'react';
import './App.css';
import UserStore, { DEFAULT_USER_FORMAT } from './UserStore';

const SaveForm = (props) => {

    const { selected, onSubmit } = props;
    console.log("props", props);
    const [userInput, setUserInput] = useState({
        id: selected.id,
        userMail: selected.userMail,
        userName: selected.userMail
    });

    const onInputChange = (e) => {
        userInput[e.target.getAttribute("name")] = e.target.value;
        setUserInput((userInput) => ({ ...userInput }));
        // console.log(userInput);
    };

    return (
        <>
            <div>
                <h2>{userInput.id === undefined ? "Update" : "Create"}</h2>
                <form onSubmit={e => {
                    e.preventDefault();
                    // console.log("onSubmit", userInput);
                    onSubmit(userInput);
                }}>
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

    const [selected, setSelected] = useState({ ...DEFAULT_USER_FORMAT });
    return (
        <div>
            <div>
                {store && store.getUserArray().map(user => (
                    <li key={user.id}>
                        <a id={user.id} href='/' onClick={el => {
                            console.log("React.MouseEvent<HTMLAnchorElement, MouseEvent>", el);
                            el.preventDefault();
                            store.detail(user);
                            setSelected(user);
                        }}>{user.userName}
                        </a>
                    </li>
                ))}
            </div>
            <div>
                {selected && selected.userName}
                {store.selected && store.selected.userName}
            </div>
            <div>
                <button onClick={store.test}>테스트</button>
            </div>
            <div>
                <SaveForm selected={selected} onSubmit={store.onSubmit} />
            </div>
        </div>
    );
};

export default App;
