

// export const DEFAULT_USER_FORMAT = {
//     id: undefined,
//     name: undefined,
//     userMail: undefined
// };

export default class UserStore {

    userArray;
    selected;
    processing;
    autoIncrement;

    constructor(initialArray) {
        this.userArray = initialArray;
        this.selected = undefined;
        this.processing = false;
        this.autoIncrement = 4;
    }

    getUserArray = () => {
        return this.userArray;
    };

    detail = (targetUser) => {
        this.selected = targetUser;
        console.log("this.selelcted", this.selected);
    };

    onSubmit = (value) => {
        if (value.id === undefined) { // create
            if (this.userArray.filter(user => user.userName === value.userName).length > 0) {
                alert('동일한 이름이 이미 존재합니다.');
                return;
            }
            value.id = this.autoIncrement;
            this.userArray.push(value);
            this.autoIncrement += 1;
        } else { // UPdate
            if (this.userArray.filter(user => user.id !== value.id && user.userName === value.userName).length > 0) {
                alert('동일한 이름이 이미 존재합니다.');
                return;
            }
            const updateIdx = this.userArray.findIndex(user => user.id === value.id);
            this.userArray[updateIdx] = value;
        }
    };

    // 내부 상태 업데이트 함수.
    test = () => {
        this.userArray.push({ id: 99, userName: "test", userMail: "a@.com" });
        console.log(this.userArray);
    };

}