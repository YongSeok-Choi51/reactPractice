# 목차
 1. React이용한 사용자정보 생성 및 갱신
 2. Git을 이용한 2개 이상의 Branch merge 수행 시 complict시나리오 및 해결

## 1. React이용한 사용자정보 생성 및 갱신

### issues
  1. 컴포넌트의 state가 원시 자료형이 아닌, reference type일 때의 갱신 문제
  2. 특정 컴포넌트에서 데이터를 처리하고 호출되는 시점에 매개변수로 넘어온 props를 반대로 호출하는 문제
  3. list의 input 필드에 직접 접근하는 문제
  4. 기능의 종류를 구분지을 방법에 대한 문제 (컴포넌트? 단순 if?)

### 요구사항
  1. 간단한 사용자 정보 (이름, 이메일)를 등록하고 리스트 형태로 확인할 수 있어야 한다
  2. 중복된 이름은 등록할 수 없다 _**(미완성)**_
  3. 특정 사용자의 정보를 읽어와서, 수정할 수 있어야 한다.

<hr>

### 구현 화면 (시간이 괜찮으시다면, clone이후 -> npm start 명령어를 통해 작동해보시길 권장합니다!)

초기 화면

<img width="246" alt="스크린샷 2022-03-31 오후 11 22 18" src="https://user-images.githubusercontent.com/102504879/161082459-40766b15-ddf1-42d6-a277-5ccef9b879e1.png">


등록하기 링크를 통한 상호작용

<img width="278" alt="스크린샷 2022-03-31 오후 11 22 25" src="https://user-images.githubusercontent.com/102504879/161080726-4d47907b-ebc0-440a-a2ee-0d80b787b25b.png">

등록 화면 (new user 최용석 등록)

<img width="270" alt="스크린샷 2022-03-31 오후 11 22 45" src="https://user-images.githubusercontent.com/102504879/161080811-f325a711-ded3-4ba5-8c2a-ebe83c403717.png">



수정 화면 (3. 홍길자 -> 홍길자45)

<img width="249" alt="스크린샷 2022-03-31 오후 11 23 08" src="https://user-images.githubusercontent.com/102504879/161080910-76f13269-b514-4ba0-beab-d6ae227feef7.png">

<hr>


## 2. Git을 이용한 2개 이상의 Branch merge 수행 시 complict시나리오 및 해결

<img width="978" alt="스크린샷 2022-04-01 오전 12 22 24" src="https://user-images.githubusercontent.com/102504879/161091274-6a4b1c04-eb76-4bbb-bca0-9f39bd8a6e53.png">


### merge이전에 주의깊게 봐야할 것들은 무엇일까?

  - 그림에서의 개발자 A를 기준으로, local에서 작업이 완료된 B_a브랜치를 main에 merge하기 이전에 로컬의 main브랜치가 최신인지(github의 main branch와 같은 형상인지) 확인해야 합니다. 그렇지 않으면 자신의 기능이 추가되고, 다른 개발자가 작업을 하고 난 뒤의 코드와 뒤섞이면서 큰 혼란이 발생할 수 있습니다. 
  - 충돌이 발생했을 경우엔, 하나의 코드를 선택하거나 프로그램 실행 로직에 문제가 발생하지 않고 같은영역의 기능이 추가된 경우라면 both accept할 수 있습니다.

<hr>

### 잘못 add, commit, push 하였을 때 rollback하는 명령어

  - add 취소 : git reset HEAD [file] 명령어를 통해 git add를 취소할 수 있다.
  - commit 취소 : git reset --[soft || mixed || hard] HEAD^ 
   > (soft: index보존, mixed: index취소(디렉터리 파일 보존), hard: index취소(디렉터리 파일 삭제. 즉 모두취소))
  - push 취소: git reset HEAD^ || [commit id] 
   > {자신의 local의 내용을 remote에 강제로 덮어쓰기때문에 주의 필요, 돌아간 커밋 이후의 모든 정보가 사라진다.}


