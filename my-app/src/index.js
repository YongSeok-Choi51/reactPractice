import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// 여기서 리액트 돔을 그리는 함수? 로 사용하는듯
// 입구 파일이라고 함. 여기서 가상 DOM이 생성되고 다루어지는듯 하다
// 리액트는 사용자 정의 태그를 만드는 기술이다!?
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
