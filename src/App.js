
import { useState } from 'react';
import './App.css';

const DEFAULT_USER_FORMAT = {
    id: undefined,
    userName: undefined,
    userMail: undefined
};

const SaveForm = (props) => {

    const { selected, onSubmit } = props;
    const [userInput, setUserInput] = useState(selected);

    const onInputChange = (e) => {
        userInput[e.target.name] = e.target.value;
        setUserInput((userInput) => ({ ...userInput }));
    };

    return (
        <div>
            <h2>{selected.id === undefined ? "Create" : "Update"}</h2>
            <form onSubmit={e => {
                e.preventDefault();
                onSubmit(userInput);
            }}>

                <p><input type="text" name='userName' placeholder='이름' value={userInput === undefined ? "" : userInput.userName} onChange={onInputChange} /></p>
                <p><input type="email" name='userMail' placeholder='이메일' value={userInput === undefined ? "" : userInput.userMail} onChange={onInputChange} /></p>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

const App = () => {

    const [selected, setSelected] = useState({ ...DEFAULT_USER_FORMAT });
    const [open, setOpen] = useState(false);
    const [userArray, setUserArray] = useState([
        { id: 1, userName: '홍길동', userMail: 'hong9@naver.com' },
        { id: 2, userName: '홍길순', userMail: 'hong8@naver.com' },
        { id: 3, userName: '홍길자', userMail: 'hong7@naver.com' }
    ]);


    const onSubmit = (value) => {
        console.log("the value", value);
        if (value.id === undefined) { // create
            if (userArray && userArray.filter(user => user.userName === value.userName).length > 0) {
                alert('동일한 이름이 이미 존재합니다.');
                return;
            }
            value.id = userArray[userArray.length - 1].id + 1;
            setUserArray(() => [...userArray, value]);
        } else { // UPdate
            if (userArray && userArray.filter(user => user.id !== value.id && user.userName === value.userName).length > 0) {
                alert('동일한 이름이 이미 존재합니다.');
                return;
            }
            const updateIdx = userArray.findIndex(user => user.id === value.id);
            userArray[updateIdx] = value;
            setUserArray((userArray) => [...userArray]);
        }

        setOpen(false);
        setSelected({ ...DEFAULT_USER_FORMAT });
    };

    return (
        <div>
            <h1>유저관리 시스템</h1>
            <div>
                {userArray.map(user => (
                    <li key={user.id}>
                        <a id={user.id} href='/' onClick={evt => {
                            evt.preventDefault();
                            setSelected(user);
                            setOpen(() => false);
                        }}>
                            {user.userName}
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
            </div>
            <div>
                {selected && selected.id === undefined && (
                    <button onClick={() => {
                        setSelected({ ...DEFAULT_USER_FORMAT });
                        setOpen(() => true);
                    }}>등록하기</button>
                )}
                <br />
                {selected && selected.id !== undefined && (<button onClick={() => setOpen(true)}>수정하기</button>)}
            </div>

            <div>
                {selected && open && <SaveForm selected={selected} onSubmit={onSubmit} />}
            </div>
        </div>
    );
};
export default App;