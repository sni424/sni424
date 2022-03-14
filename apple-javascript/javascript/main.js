(() => {

    let yOffset = 0;//window.pagey변수
    let prevScrollHeight = 0; //현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 합
    let currentScene = 0; //현재 활성화된 씬

    const sceneInfo = [
        {
            //0
            type:'sticky',
            heightNum:5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values: {
                messageA_opacity:[0,1]
            }
        },
        {
            //1
            type:'normal',
            heightNum:5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            //2
            type:'sticky',
            heightNum:5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            //3
            type:'sticky',
            heightNum:5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        },
    ];

    function setLayout() {
        //각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length;i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height=`${sceneInfo[i].scrollHeight}px`
        }

        let totalScrollheight = 0;

        //현재 스크롤에서 새로고침했을때 작동되게
        for (let i = 0; i < sceneInfo.length; i++){
            totalScrollheight += sceneInfo[i].scrollHeight;
            if (totalScrollheight >= yOffset) {
                currentScene = i
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`)
    }

    function calcValues(values,currentYOffset) {
        let rv;
        let scrollRatio = currentYOffset/ sceneInfo[currentScene].scrollHeight
        //현재 씬에서 스크롤된 범위를 비율로 구하기
        //현재스크롤 높이/현재씬의 스크롤 높이

        rv = scrollRatio * (values[1]-values[0]) +values[0];
        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        //현재 스크롤(yOffset) - 이전 섹션 스크롤합(prevScrollHeight)
        //섹션이 넘어가면 0으로 초기화되고 다시 작동
        switch (currentScene) {
            case 0:
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }

    function scrollLoop() {
        prevScrollHeight = 0; //해당코드 없으면 누적되서 계속 높아짐
        for (let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {//증가
            //현재 스크롤 위치가 이전 스크롤 높이+현재세션 스크롤 높이 보다 높으면
            if(currentScene < sceneInfo.length-1){
                currentScene++;
            }
             //씬증가
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) {
                return
            }
            //현재 스크롤 위치가 이전 스크롤 높이보다 작으면
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset= window.pageYOffset
        scrollLoop(); 
    });

    window.addEventListener('resize', setLayout);
    // window.addEventListener("DOMcontentLoaded", setLayout);
    window.addEventListener("load", setLayout);

})();