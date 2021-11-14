//const loginForm = document.getElementById("login-form")
//const loginInput = loginForm.querySelector("input");
//const loginButton = loginForm.querySelector("button");
//위의 방법은 loginForm이라는 변수를 사용해서 가져 오는 방법이고
//아래방법은 변수를 사용하지않고 바로 document에서 가져오는 방법이다.

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";//string으로만 포함된 변수는 대문자로 표기
const USERNAME_KEY = "username";


function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);//이름을  입력하면, 해당부분 숨기기.
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username)//localStorage.setItem브라우저에 데이터 저장 USERNAME_KEY는 저장될 이름의 key이고 두번째가 저장할 변수명이다.
    // greeting.innerHTML = `Hello  ${username}`; //"Hello" + username와 똑같다.
    //`Hello  ${username}` 규칙 1 변수와 string을 결합하고 싶거나 변수를 string 안에 넣고 싶다면 ${변수명}
    //규칙2 ``백틱기호를쓴다 1옆에있는 것 ''작은따옴표와는 다름
    // greeting.classList.remove(HIDDEN_CLASSNAME);
    paintGreeting(username);
};

function paintGreeting(username) {//여기서 username은 위와 같은 username이 아니라 함수 파라미터 변수 명으로 다르게 적어도 된다. 파라미터 변수는 함수 내부에서만 작동하는 local variable이다.
    greeting.innerHTML = `Hello ${saveUsername}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
};

//데이터베이스에 username이 있는지 확인하는방법
const saveUsername = localStorage.getItem(USERNAME_KEY);

if (saveUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreeting(saveUsername);
}

// function onLoginSubmit(event){
//     event.preventDefault(); // 브라우저가 기본 동작을 실행하지 못하게 막기 // event object는 preventDefault함수를 기본적으로 갖고 있음
//     console.log(event);
//     }

    // loginForm.addEventListener("submit", onLoginSubmit); // submit 이벤트가 발생한다면, onLoginSubmit함수를 실행시킨다는 의미 // JS는 onLoginSubmit함수 호출시 인자를 담아서 호출함. 해당 인자는 event object를 담은 정보들

    // ★ 중요 ★
    // form을 submit하면 브라우저는 기본적으로 페이지를 새로고침 하도록 되어있다. << 우리가 원하는 것이 아님!
    // preventDefault() 함수를 추가함으로써 브라우저의 기본 동작을 막을 수 있다!!

    // 이 preventDefault 함수는 EventListener 함수의 '첫 번째 argument' 안에 있는 함수이다. 첫 arument는 지금 막 벌어진 event들에 대한 정보를 갖고 있다.
    // JS는(기본적으로)argument를 담아서 함수를 호출하는데, 이 argument가 기본 정보들을 제공하고 있다. ex) 누가 submit주체인지, 몇 시에 submit을 했는지 등등 콘솔에 출력해보면 알 수 있음
    // 여기서 event라는 매개변수는 submit의 관련 정보 및 기능을 담는 통이라 생각하면 편하다(event 정보를 담는 object)


//아래는 form대신 div를 사용했을때 div대신 form을사용하면 브라우저 기능을 사용할 수 있다.
//const loginButton = document.querySelector("#login-form button");

// function onLoginBtnClick() {
//     const username = loginInput.value;

//      if (username === "") {
//          alert("이름 를 입력해주세요");
//      }
//      else if (username.length > 15) {
//          alert("이름이 너무 깁니다.");
//      }
// };

//아래코드는 form대신 div를 썼을때 버튼 눌렀을때 상호작용을 위해
//loginButton.addEventListener("click", onLoginBtnClick);