//7일간보이지않기(쿠키)
let currentCookie=document.cookie;
let cookieCheck=currentCookie.indexOf('ballet');
console.log(cookieCheck)


if(cookieCheck>-1){
    document.querySelector('.cookie').style.display="none";
}else{
    document.querySelector('.cookie').style.display="block";
}


document.querySelector('.day_7').addEventListener("click",()=>{
    let date=new Date();
    date.setDate(date.getDate() + 7); //getDate 오늘날짜 뽑아짐
    let setCookie= "CookieName=ballet;";
        setCookie += "expires="+ date.toUTCString();

    document.cookie=setCookie;
})


document.querySelector('.close').addEventListener('click',function(e){
    e.preventDefault();
    console.log(this)
    this.parentElement.style.display="none";
})



//Nav 2차메뉴
$('.cabin li').mouseover(function () {
    $(this).find('.depth').stop().slideDown();
})
$('.cabin li').mouseout(function () {
    $(this).find('.depth').stop().slideUp();
})


//헤더 animate.css 효과
$('.animate').scrolla({
    // default
    mobile: false, // disable animation on mobiles
    once: false, // only once animation play on scroll
    animateCssVersion: 4 // used animate.css version (3 or 4)
});



//menuOpen
$('.menuOpen #mNav').click(function(e){
    e.preventDefault()
    $('.menuOpen .menuWrap').addClass('on')
});
$('.menuWrap .close').click(function(e){
    e.preventDefault()
    $('.menuOpen .menuWrap').removeClass('on')
  });




//메인이미지
let slidIndexRight = 1;
let slidIndexLeft = 1;

slideShowRight(slidIndexRight);
slideShowLeft(slidIndexLeft);

function slideShowRight(n) {
    let switchRight = document.getElementsByClassName('r_slide');

    if (n >= switchRight.length) {
        slidIndexRight = 1;
    }
    if (n < 1) {
        slidIndexRight = switchRight.length;
    }

    for (let i = 0; i < switchRight.length; i++) {
        switchRight[i].style.display = "none";
    }

    switchRight[slidIndexRight - 1].style.display = "block";
}

function slideShowLeft(n) {
    let switchLeft = document.getElementsByClassName('l_slide');

    if (n >= switchLeft.length) {
        slidIndexLeft = 1;
    }
    if (n < 1) {
        slidIndexLeft = switchLeft.length;
    }

    for (let i = 0; i < switchLeft.length; i++) {
        switchLeft[i].style.display = "none";
    }

    switchLeft[slidIndexLeft - 1].style.display = "block";
}



let rightWrap = document.querySelector('.right_wrap');
let leftWrap = document.querySelector('.left_wrap');
let clickButton=document.querySelector('.b_circle');

rightWrap.addEventListener("click", function () {
    slidIndexLeft++;
    slideShowLeft(slidIndexLeft);

    clickButton.style.left="60vw"
});

leftWrap.addEventListener("click", function () {
    slidIndexRight++;
    slideShowRight(slidIndexRight);

    clickButton.style.left= "35vw";
});



//발레단소개 이미지 리플
$(".int_img").ripples({
    resolution: 500, // 렌더링 값이 클수록 잔물결 효과가 느리게 전파
    perturbance: 0.02, // 잔물결 굴절 강도. 0은 굴절 없음
});


//마우스 커서
const introduce = document.querySelector('.introduce');
const intText = document.querySelector('.int_text');
const cursor = document.querySelector('.cursor'); 


introduce.addEventListener('mousemove', function(e) {
    const parentRect = cursor.parentNode.getBoundingClientRect();

    cursor.style.opacity = "1";
    cursor.style.top = `${e.clientY - (parentRect.top - 100)}px`;
    cursor.style.left = `${e.clientX - (parentRect.left - 210)}px`;
});

introduce.addEventListener('mouseleave', function(e) {
    cursor.style.opacity = "0";
});

intText.addEventListener('mouseenter', function(e) {
    cursor.classList.add("active");
});

intText.addEventListener('mouseleave', function(e) {
    cursor.classList.remove("active");
});


//background color 변경
$(window).scroll(function(){
    let scrollTop=$(this).scrollTop();
    console.log(scrollTop)
    let offset=$('.introduce').offset().top - 600;

    
    if(scrollTop>offset){
        $('body').addClass('on')
    }else{
        $('body').removeClass('on')
    }
});


/* 라인일러스트 */
const line = document.querySelector('.line');
const path1 = document.querySelector('.path1');
const path1Length = path1.getTotalLength();

path1.style.strokeDasharray = path1Length + ' ' + path1Length
path1.style.strokeDashoffset = path1Length
path1.style.strokeDashoffset = calcDashoffset(window.innerHeight * 0.8, line, path1Length)


function calcDashoffset(scrollY, line, length) {
    const ratio = (scrollY - line.offsetTop) / line.offsetHeight;
    const value = length - (length * ratio);
    console.log(ratio)
    return value < 0 ? 0 : value > length ? length : value
}

function scrollHandler() {
    const scrollY = window.scrollY - (window.innerHeight * 1.1);
    path1.style.strokeDashoffset = calcDashoffset(scrollY, line, path1Length)
}

window.addEventListener('scroll', scrollHandler);



/* academy 이미지 전환 */

initComparisons();

function initComparisons() {
    let x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    console.log(x.length) //1
    for (i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }

    function compareImages(img) {
        let slider, clicked = 0,
            w, h;

        w = img.offsetWidth;
        h = img.offsetHeight;

        img.style.width = (w / 2) + "px";


        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");

        img.parentElement.insertBefore(slider, img);

        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

        slider.addEventListener("mousedown", slideReady);
        slider.addEventListener("mouseup", slideFinish);

        function slideReady(e) {
            e.preventDefault();
            clicked = 1;
            window.addEventListener("mousemove", slideMove); //클릭한 상태로 움직임
        }

        function slideFinish() {
            /*the slider is no longer clicked:*/
            clicked = 0;
        }


        function slideMove(e) {
            console.log("실행")
            var pos;
            if (clicked == 0) return false;
            pos = getCursorPos(e);

            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }


        function getCursorPos(e) {
            let a, x = 0;
            //changedTouches-->	이 터치와 이전 터치 사이에 상태가 변경된 터치 개체 목록
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset; //화면을 좁히면 깨지기 때문
            return x;


        }

        function slide(x) {
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }

}


//submit_popup
$('.submit a').click(function(e){
    e.preventDefault();
    window.open("popup.html", "pop-up", "width=650,height=500,left=550,top=220");
})


//공연정보 slick
$('.perfo_slide').slick({
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus:true
});

//beforeChange : 슬라이드가 전환될 때마다 자동재생 다시 시작
$('.perfo_slide').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    if (nextSlide !== currentSlide) {
        slick.play();
    }
});


// 공연정보 하트 클릭
let slides = document.querySelectorAll('.perfo_slide .slide');

slides.forEach(function(slide) {
    let heart = slide.querySelector('.text_tit span');

    heart.addEventListener('click', function(event) {
        event.stopPropagation(); //이벤트 전파 막음
        this.classList.toggle('active');
    });
});



//공지사항 아코디언
let accordions = document.getElementsByClassName('accordion');

function toggleAccordion() {
    let panel = this.nextElementSibling;
    let title = this.querySelector('.aco_left');

    this.classList.toggle('active');

    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        title.style.color = '#4d4d4d';
        title.style.fontWeight = 400;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px"; //원래가지고 있는 높이값
        title.style.color = '#ff771d';
        title.style.fontWeight = 600;
    }
}

for (let i = 0; i < accordions.length; i++) {
    let accordion = accordions[i];
    accordion.addEventListener('click', toggleAccordion);
}



//텍스트 애니
let pTag1=document.querySelector('.first-parallel');
let pTag2=document.querySelector('.second-parallel');

let textArr1='KNB Talk Show! 🤍 Korea National Ballet 🤍'.split(' ');
let textArr2='KNB Talk Show! 🤍 Korea National Ballet 🤍'.split(' ');

let count1 = 0;
let count2 = 0;

initTexts(pTag1,textArr1)
initTexts(pTag2,textArr2)


function initTexts (element,textArry){
    textArry.push(...textArry) //동일한 배열을 복사하여 배열뒤에 붙여넣음
    for(let i=0; i<textArry.length; i++){
        element.innerHTML += `${textArry[i]}\u00A0\u00A0\u00A0`; // \u00A0 : 띄워쓰기
    }
}

// --글자입력
function animate(){
count1++;
count2++;

count1=marqueeText(count1,pTag1,-1); //pTag1을 움직이고 -1방향
count2=marqueeText(count2,pTag2,1); // 1 방향

window.requestAnimationFrame(animate) //animate함수를 다시 실행
}

function marqueeText(count, element, direction){ 
if(count>element.scrollWidth / 2){
count=0; // 0값을 줘야 빈틈안생김
element.style.transform=`translate(0,0px)` //translate(0,0)는 초기값
}

element.style.transform=`translate(${count * direction}px,0)` // direction : 반대방향
return count;
}


function scrollHandler (){
count1 += 25; //스크롤움질일 때 더 빨리
count2 += 25;
}

animate();

window.addEventListener("scroll",scrollHandler)



//파노라마
let panoWrap=document.querySelector('.sj_panorama .pano_wrap');
let listWrap=panoWrap.querySelector('.list');
let item=listWrap.children;
console.log(item)
let listClone=null;
let itemWidth=item[0].offsetWidth; //이미지 하나의 넓이값
let itemLength=item.length; //10개
let listWidth=itemWidth * itemLength;
let move=0;
//let controls=document.querySelector('.sj_panorama .controls'); -> 아래랑 같음
let controls=panoWrap.parentElement.querySelector('.controls');
let timer;

var init=function(){
    panoWrap.style.width=listWidth*2 + "px";
    listWrap.style.width=listWidth + "px";
    panoWrap.appendChild(listWrap.cloneNode(true)) // listWrap의 자식까지 복사
    listClone=panoWrap.children;
    //console.log(listClone)
    render();
    add();
    event();
}

let render=function(){
    move +=1;
    //유사배열을 배열로 바꾸기
    //console.log(Array.from(listClone))
    Array.from(listClone).forEach(function(clone){
        clone.style.transform=`translateX(${-move}px)`;
    })

    timer=window.requestAnimationFrame(render);
}

let add=function(){
    setInterval(function(){
        panoWrap.appendChild(listWrap.cloneNode(true));
        listClone=panoWrap.children;
    },10000);
}

//재생버튼 모양바꾸기
let event=function(){
    controls.querySelector('.play_on').addEventListener('click',function(e){
        e.preventDefault();
        console.log(this)

        if(this.classList.contains('active')){
            this.classList.remove('active')
            window.cancelAnimationFrame(timer) //멈추게 설정
        }else{
            this.classList.add('active')
            render(); //다시 재생하도록 설정
        }
    })

}

window.addEventListener('load',function(){
    init()
})




//구독버튼
let subButton = document.querySelector('.circle_txt');
let subForm = document.querySelector('.sub_application');

subButton.addEventListener('click', function(e) {
    e.preventDefault();

    if (subForm.style.opacity === '1') {
        subForm.style.opacity = 0;
        subForm.style.visibility = 'hidden';
        subForm.style.transform = 'translateX(120px)';
        subButton.style.transform = 'translateX(34px)';
    } else {
        subForm.style.opacity = 1;
        subForm.style.visibility = 'visible';
        subForm.style.transform = 'translateX(28px)';
        subButton.style.transform = 'translateX(-250px)';
    }

    subButton.style.transition = 'transform 0.3s ease';
});



// 레이어 팝업
$('.sub_button').click(function(event){
    event.preventDefault();
    $('#layer').fadeIn();
});
$('#layer .close').click(function(event){
    event.preventDefault();
    $('#layer').fadeOut();
});



// ✔ 배경테마 변경 (배경색 변경)
let themaButton = document.getElementById('thema-button');
let darkThema = "dark-thema";
let iconThema = "ri-sun-line";
let people = document.getElementsByClassName('people')


let getCurrentThema=()=>{
    let result=document.body.classList.contains(darkThema)?'dark':'light';
    return result;
};
//아이콘 (달모양?:해모양?)
let getCurrentIcon=()=>{
    let result=themaButton.classList.contains(iconThema)?'ri-moon-clear-line':'ri-sun-line';
    return result;
};


themaButton.addEventListener("click",()=>{
    document.body.classList.toggle(darkThema);
    themaButton.classList.toggle(iconThema);


// 웹의 스토어에 값 세팅 (개발자모드 - application - local starage 확인)
localStorage.setItem('selected-thema',getCurrentThema());
localStorage.setItem('selected-icon',getCurrentIcon());

});


let selectedThema=localStorage.getItem('selected-thema');
let selectedIcon=localStorage.getItem('selected-icon');
console.log(selectedThema);
console.log(selectedIcon);

if(selectedThema){
    if(selectedThema == 'dark'){
        document.body.classList.add(darkThema);
    }else{
        document.body.classList.remove(darkThema);
    }

    if(selectedIcon == 'ri-moon-clear-line'){
        themaButton.classList.add(iconThema);
    }else{
        themaButton.classList.remove(iconThema);
    }
}





//수석무용수

(function(){
    //마우스 커서 이미지에 위치
window.addEventListener('mousemove',function(e){
    document.querySelector('#slidePhoto').style.top=`${e.clientY}px`;
    document.querySelector('#slidePhoto').style.left=`${e.clientX}px`;
    document.querySelector('#slidePhoto').style.transform=`translate(${-e.clientX * 0.8}px, ${-e.clientY * 0.9}px)`;
})


document.querySelector('#chainn').addEventListener('mousemove',function(){
    document.querySelector('#slidePhotos').style.marginTop="0%";
    document.querySelector('#chainn h3').style.color="#c0f21d"; //마우스 올리면 색깔 바뀜
})
document.querySelector('#chainn').addEventListener('mouseleave',function(){
    document.querySelector('#chainn h3').style.color="#ff771d"; // 마우스 떠나면 원래색상으로
})


document.querySelector('#aty').addEventListener('mousemove',function(){
    document.querySelector('#slidePhotos').style.marginTop="-120%";
    document.querySelector('#aty h3').style.color="#c0f21d";
})
document.querySelector('#aty').addEventListener('mouseleave',function(){
    document.querySelector('#aty h3').style.color="#ff771d";
})

document.querySelector('#mic').addEventListener('mousemove',function(){
    document.querySelector('#slidePhotos').style.marginTop="-240%";
    document.querySelector('#mic h3').style.color="#c0f21d";
})
document.querySelector('#mic').addEventListener('mouseleave',function(){
    document.querySelector('#mic h3').style.color="#ff771d";
})


document.querySelector('#tapso').addEventListener('mousemove',function(){
    document.querySelector('#slidePhotos').style.marginTop="-360%";
    document.querySelector('#tapso h3').style.color="#c0f21d";
})
document.querySelector('#mic').addEventListener('mouseleave',function(){
    document.querySelector('#tapso h3').style.color="#ff771d";
})



document.querySelector('#eff').addEventListener('mousemove',function(){
    document.querySelector('#slidePhoto').style.display="initial";
    document.querySelector('#slidePhoto').style.opacity="1";
})
document.querySelector('#eff').addEventListener('mouseleave',function(){
    document.querySelector('#slidePhoto').style.display="none";
    document.querySelector('#slidePhoto').style.opacity="0";
})
})()



//발레단소개 탭
function member(mem, elem, color){
    let tabcontent = document.getElementsByClassName('tabcontent');
    for(let i=0; i<tabcontent.length; i++){
        tabcontent[i].style.display="none";
        //console.log(tabcontent[i])
    }

    let tablinks = document.getElementsByClassName('tablink');
    for(let i=0; i<tablinks.length; i++){
        tablinks[i].style.backgroundColor="";
        //빈 문자열 할당시 bgc 속성은 기본값으로 초기화
    }
    elem.style.backgroundColor=color;
    document.getElementById(mem).style.display="block";
    //mem은 매개변수로 첫번째 인자값을 받아왔으므로 ''를 안넣어도 됨

}

document.getElementById('defaultOpen').click();




//스티키영역
let scrollBody = document.querySelector('.fix_motion'),
    scrollHeight, //스크롤의 높이값
    sectionOffsetTop, //영역(top_box)의 높이값 = fix_motion 머리가 닿는 지점
    sectionScrollTop,
    scrollRealHeight, //실제로 스크롤 해야할 높이
    winScrollTop, //스크롤바의 높이를 담을 변수
    scrollPercent, //스크롤 백분율값
    percent;


let inMobile;
function scrollFuc(){
    setProperty();

    if(inMobile){
        contentInMobile();
    }else{
        contentIn();
    }
}


function setProperty(){
    inMobile=window.innerWidth<=1024?true:false;

    scrollHeight=scrollBody.offsetHeight; //.fix_motion의 높이값 
    sectionOffsetTop=scrollBody.offsetTop; //문서에서 .fix_motion 위까지의 높이값
    scrollRealHeight=scrollHeight - window.innerHeight;
    winScrollTop=pageYOffset;
    sectionScrollTop=winScrollTop - sectionOffsetTop; //내 영역안에서 스크롤 얼마나 내렸는지 확인값
    scrollPercent=sectionScrollTop/scrollRealHeight;
    percent=scrollPercent*100;
    console.log(percent)

    contentIn();
}


function contentIn(){
    let deviceImg=document.querySelectorAll('.slide figure');
    let imgWidth=deviceImg[0].offsetWidth; // figure 하나의 넓이값


    if(percent>=11 && percent<37){
        document.querySelector('.text_box .text01').classList.add('active')
        imgChange(imgWidth*0)
    }
    if(percent>=37 && percent<62){
        document.querySelector('.text_box .text02').classList.add('active')
        imgChange(imgWidth*1)
    }
    if(percent>=62 && percent<87){
        document.querySelector('.text_box .text03').classList.add('active')
        imgChange(imgWidth*2)
    }
    if(percent>=87){
        document.querySelector('.text_box .text04').classList.add('active')
        imgChange(imgWidth*3)
    }

    if(percent<12){
        document.querySelector('.text_box .text01').classList.remove('active')
        document.querySelector('.text_box .text02').classList.remove('active')
        document.querySelector('.text_box .text03').classList.remove('active')
        document.querySelector('.text_box .text04').classList.remove('active')
    }
}

function contentInMobile(){
    let deviceImg=document.querySelectorAll('.slide figure');
    let imgWidth=deviceImg[0].offsetWidth; // figure 하나의 넓이값


    if(percent>=11 && percent<37){
        document.querySelector('.text_box .text01').classList.add('active')
        document.querySelector('.text_box .text02').classList.remove('active')
        document.querySelector('.text_box .text03').classList.remove('active')
        document.querySelector('.text_box .text04').classList.remove('active')
        imgChange(imgWidth*0)
    }
    if(percent>=37 && percent<62){
        document.querySelector('.text_box .text02').classList.add('active')
        document.querySelector('.text_box .text01').classList.remove('active')
        document.querySelector('.text_box .text03').classList.remove('active')
        document.querySelector('.text_box .text04').classList.remove('active')
        imgChange(imgWidth*1)
    }
    if(percent>=62 && percent<87){
        document.querySelector('.text_box .text03').classList.add('active')
        document.querySelector('.text_box .text01').classList.remove('active')
        document.querySelector('.text_box .text02').classList.remove('active')
        document.querySelector('.text_box .text04').classList.remove('active')
        imgChange(imgWidth*2)
    }
    if(percent>=87){
        document.querySelector('.text_box .text04').classList.add('active')
        document.querySelector('.text_box .text01').classList.remove('active')
        document.querySelector('.text_box .text02').classList.remove('active')
        document.querySelector('.text_box .text03').classList.remove('active')
        imgChange(imgWidth*3)
    }

}


function imgChange(moveX){
    let img=document.querySelector('.watch_img .slide');
    img.style.transform=`translateX(${-moveX + 5}px)`
}



window.addEventListener('scroll',function(){
    scrollFuc();
})
window.addEventListener('resize',function(){
    scrollFuc();
})

scrollFuc();



// 리뷰
var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
});



//scroll-up

let scrollup=()=>{
    let scrollup=document.getElementById('scrollup');
    pageYOffset>=2500?scrollup.classList.add('show-scroll'):scrollup.classList.remove('show-scroll');
}
window.addEventListener("scroll",scrollup)