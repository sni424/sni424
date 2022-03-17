(() => {

    let yOffset = 0;//window.pagey변수
    let prevScrollHeight = 0; //현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 합
    let currentScene = 0; //현재 활성화된 씬\
    let enterNewScene = false//씬이 바뀔대

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
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                //start: 0.1, end: 0.2해당코드는 전체 스크롤이 아닌 해당씬 스크롤의 % 10~20%일때 나타나라는 뜻
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        {
            //1
            type:'normal',
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
				container: document.querySelector('#scroll-section-2'),
				messageA: document.querySelector('#scroll-section-2 .main-message.a'),
				messageB: document.querySelector('#scroll-section-2 .desc-message.b'),
				messageC: document.querySelector('#scroll-section-2 .desc-message.c'),
				pinB: document.querySelector('#scroll-section-2 .b .pin'),
				pinC: document.querySelector('#scroll-section-2 .c .pin'),
			},
			values: {
				messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
				messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
				messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
				messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
				messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
				messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
				messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
				pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
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
        for (let i = 0; i < sceneInfo.length; i++){
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight + window.innerHeight * 0.5;
            }
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
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        //현재 씬에서 스크롤된 범위를 비율로 구하기
        //현재스크롤 높이/현재씬의 스크롤 높이

        if (values.length === 3) {
            //start ~end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            }
            else if (currentYOffset < partScrollStart) {
                //스크롤이 시작점 전이면
                rv = values[0];
            } else if (currentYOffset > partScrollStart) {
                //스크롤이 끝나는 지점 이후면
                rv = values[1];
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        //현재 스크롤(yOffset) - 이전 섹션 스크롤합(prevScrollHeight)
        //섹션이 넘어가면 0으로 초기화되고 다시 작동
        const scrollHeight = sceneInfo[currentScene].scrollHeight //현재 씬의 스크롤 높이
        const scrollRatio = (currentYOffset) / scrollHeight  // 현재스크롤 빼기 이전 씬 스크롤 나누기 현재씬의 스크롤 높이
        switch (currentScene) {
            case 0:
                if (scrollRatio<=0.22) {
                    //in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);;
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
                } else {
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);;
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
                }
                if (scrollRatio <= 0.42) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.62) {
					// in
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.82) {
					// in
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
				}
                break;
            case 2:     
				if (scrollRatio <= 0.25) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.57) {
					// in
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				}

				if (scrollRatio <= 0.83) {
					// in
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				}
                break;
            case 3:
                break;
        }
    }

    function scrollLoop() {
        enterNewScene = false//true로 바뀌면 함수 작동 안되게 해서 rv값이 마이너스가 안되게 
        prevScrollHeight = 0; //해당코드 없으면 누적되서 계속 높아짐
        for (let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {//증가
            //현재 스크롤 위치가 이전 스크롤 높이+현재세션 스크롤 높이 보다 높으면
            if(currentScene < sceneInfo.length-1){
                enterNewScene = true;
                currentScene++;
            }
             //씬증가
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) {//브라우저 효과로 마이너스 방지
                return
            }
            //현재 스크롤 위치가 이전 스크롤 높이보다 작으면
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        
        if (enterNewScene) return;

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