// 중복체크 결과를 표현하는 상태코드
enum StateCode {
    WAIT_CONFIRM,           // 중복검사 이전 대기상태
    CHECK_OK,               // 중복값이 없는경우
    DUPLICATION_MAIL,       // 이메일중복
    DUPLICATION_NAME,       // 이름중복
    DUPLICATION_ALL         // 둘 다 중복
}

export default StateCode