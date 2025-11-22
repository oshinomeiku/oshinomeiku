// pagescript.js

// jQuery를 사용하여 페이지가 완전히 로드된 후 스크립트를 실행합니다.
$(document).ready(function() {

    // ===============================================
    // 1. 유틸리티 함수: URL에서 특정 파라미터 값을 추출
    // ===============================================
    function getUrlParameter(name) {
        // 정규식을 사용하여 URL 쿼리 스트링에서 'tag' 파라미터 값을 찾습니다.
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    
    // ===============================================
    // 2. 핵심 필터링 로직 함수
    // ===============================================
    function applyFilter(selectedTag) {
        // 모든 상품을 숨깁니다.
        $('.product-card').hide(); 

        // 1초 동안 부드럽게 스크롤을 맨 위로 이동
        $('html, body').animate({scrollTop: 0}, 200);

        // 'ALL' 태그나 빈 태그는 모든 상품을 보여줍니다. (필요하다면 추가)
        if (!selectedTag || selectedTag === 'ALL') {
             $('.product-card').show();
             return;
        }

        // 선택된 태그가 포함된 상품만 보여줍니다.
        // data-tags 속성을 찾아 공백으로 분리된 배열 안에 selectedTag가 있는지 확인합니다.
        $('.product-card').each(function() {
            const $productCard = $(this);
            // data-tags 속성 값(문자열)을 가져옵니다.
            const dataTags = $productCard.data('tags'); 
            
            // dataTags가 존재하고, 공백으로 분리한 후 selectedTag가 포함되어 있는지 확인합니다.
            if (dataTags && dataTags.split(' ').includes(selectedTag)) {
                $productCard.show(); 
            }
        });
    }

    // ===============================================
    // 3. 페이지 로드 시 초기화 및 필터링 실행
    // ===============================================
    const initialTag = getUrlParameter('tag');
    
    if (initialTag) {
        // URL에 'tag' 파라미터가 있다면
        
        // 1. 모든 버튼의 'selected' 클래스 제거
        $('#categories button').removeClass('selected');
        
        // 2. 해당 태그와 일치하는 버튼을 찾습니다.
        const $targetButton = $(`#categories button[data-tag="${initialTag}"]`);
        
        if ($targetButton.length) {
            // 3. 버튼을 '선택된 상태'로 표시합니다.
            $targetButton.addClass('selected');
        }
        
        // 4. 추출된 태그로 필터링을 실행합니다.
        applyFilter(initialTag);

    } else {
        // URL에 'tag' 파라미터가 없다면, 기본 필터링을 실행합니다.
        // 예: 첫 번째 카테고리를 기본으로 선택하고 필터링합니다.
        const $firstButton = $('#categories button:first');
        if ($firstButton.length) {
            const defaultTag = $firstButton.data('tag');
            $firstButton.addClass('selected');
            applyFilter(defaultTag);
        }
    }


    // ===============================================
    // 4. 사용자의 버튼 클릭 이벤트 처리
    // ===============================================
    $('#categories button').on('click', function(e) {
        // a 태그가 아니므로 preventDefault는 필요 없지만, 습관적으로 넣을 수 있습니다.
        e.preventDefault(); 
        
        const $clickedButton = $(this);
        const clickedTag = $clickedButton.data('tag');

        // 필터 해제 로직 (이미 선택된 버튼을 다시 클릭했을 경우)
        // (메인에서 넘어왔을 때는 해제되지 않도록 초기화 로직을 분리했습니다.)
        if ($clickedButton.hasClass('selected')) {
            $clickedButton.removeClass('selected');
            // 모든 상품을 다시 보이게 함
            $('.product-card').show();
            return;
        }

        // 새로운 필터 선택 시: 기존 선택 해제 및 클래스 부여
        $('#categories button').removeClass('selected');
        $clickedButton.addClass('selected');

        // 필터링 실행
        applyFilter(clickedTag);
    });
});











// <![CDATA[
var colour="#fff"; // in addition to "random" can be set to any valid colour eg "#f0f" or "red"
var sparkles=50;

/****************************
*  Tinkerbell Magic Sparkle *
*(c)2005-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
****************************/
var x=ox=400;
var y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var tiny=new Array();
var star=new Array();
var starv=new Array();
var starx=new Array();
var stary=new Array();
var tinyx=new Array();
var tinyy=new Array();
var tinyv=new Array();

window.onload=function() { if (document.getElementById) {
  var i, rats, rlef, rdow;
  for (var i=0; i<sparkles; i++) {
    var rats=createDiv(3, 3);
    rats.style.visibility="hidden";
    rats.style.zIndex="999";
    document.body.appendChild(tiny[i]=rats);
    starv[i]=0;
    tinyv[i]=0;
    var rats=createDiv(5, 5);
    rats.style.backgroundColor="transparent";
    rats.style.visibility="hidden";
    rats.style.zIndex="999";
    var rlef=createDiv(1, 5);
    var rdow=createDiv(5, 1);
    rats.appendChild(rlef);
    rats.appendChild(rdow);
    rlef.style.top="2px";
    rlef.style.left="0px";
    rdow.style.top="0px";
    rdow.style.left="2px";
    document.body.appendChild(star[i]=rats);
  }
  set_width();
  sparkle();
}}

function sparkle() {
  var c;
  if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
    ox=x;
    oy=y;
    for (c=0; c<sparkles; c++) if (!starv[c]) {
      star[c].style.left=(starx[c]=x)+"px";
      star[c].style.top=(stary[c]=y+1)+"px";
      star[c].style.clip="rect(0px, 5px, 5px, 0px)";
      star[c].childNodes[0].style.backgroundColor=star[c].childNodes[1].style.backgroundColor=(colour=="random")?newColour():colour;
      star[c].style.visibility="visible";
      starv[c]=50;
      break;
    }
  }
  for (c=0; c<sparkles; c++) {
    if (starv[c]) update_star(c);
    if (tinyv[c]) update_tiny(c);
  }
  setTimeout("sparkle()", 40);
}

function update_star(i) {
  if (--starv[i]==25) star[i].style.clip="rect(1px, 4px, 4px, 1px)";
  if (starv[i]) {
    stary[i]+=1+Math.random()*3;
    starx[i]+=(i%5-2)/5;
    if (stary[i]<shigh+sdown) {
      star[i].style.top=stary[i]+"px";
      star[i].style.left=starx[i]+"px";
    }
    else {
      star[i].style.visibility="hidden";
      starv[i]=0;
      return;
    }
  }
  else {
    tinyv[i]=50;
    tiny[i].style.top=(tinyy[i]=stary[i])+"px";
    tiny[i].style.left=(tinyx[i]=starx[i])+"px";
    tiny[i].style.width="2px";
    tiny[i].style.height="2px";
    tiny[i].style.backgroundColor=star[i].childNodes[0].style.backgroundColor;
    star[i].style.visibility="hidden";
    tiny[i].style.visibility="visible"
  }
}

function update_tiny(i) {
  if (--tinyv[i]==25) {
    tiny[i].style.width="1px";
    tiny[i].style.height="1px";
  }
  if (tinyv[i]) {
    tinyy[i]+=1+Math.random()*3;
    tinyx[i]+=(i%5-2)/5;
    if (tinyy[i]<shigh+sdown) {
      tiny[i].style.top=tinyy[i]+"px";
      tiny[i].style.left=tinyx[i]+"px";
    }
    else {
      tiny[i].style.visibility="hidden";
      tinyv[i]=0;
      return;
    }
  }
  else tiny[i].style.visibility="hidden";
}

document.onmousemove=mouse;
function mouse(e) {
  if (e) {
    y=e.pageY;
    x=e.pageX;
  }
  else {
    set_scroll();
    y=event.y+sdown;
    x=event.x+sleft;
  }
}

window.onscroll=set_scroll;
function set_scroll() {
  if (typeof(self.pageYOffset)=='number') {
    sdown=self.pageYOffset;
    sleft=self.pageXOffset;
  }
  else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
    sdown=document.body.scrollTop;
    sleft=document.body.scrollLeft;
  }
  else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    sleft=document.documentElement.scrollLeft;
    sdown=document.documentElement.scrollTop;
  }
  else {
    sdown=0;
    sleft=0;
  }
}

window.onresize=set_width;
function set_width() {
  var sw_min=999999;
  var sh_min=999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==999999 || sh_min==999999) {
    sw_min=800;
    sh_min=600;
  }
  swide=sw_min;
  shigh=sh_min;
}

function createDiv(height, width) {
  var div=document.createElement("div");
  div.style.position="absolute";
  div.style.height=height+"px";
  div.style.width=width+"px";
  div.style.overflow="hidden";
  return (div);
}

function newColour() {
  var c=new Array();
  c[0]=255;
  c[1]=Math.floor(Math.random()*256);
  c[2]=Math.floor(Math.random()*(256-c[1]/2));
  c.sort(function(){return (0.5 - Math.random());});
  return ("rgb("+c[0]+", "+c[1]+", "+c[2]+")");
}
// ]]>




$(document).ready(function() {
    var $modal = $('#popup');

    // ===========================================
    // 1. 팝업 자동 실행 로직
    // ===========================================
    
    // 페이지 로드 후, 팝업을 바로 부드럽게 보이게 합니다.
    // 팝업이 바로 나타나길 원하면 fadeIn() 대신 .show()를 사용해도 됩니다.
    $modal.fadeIn(500); // 500ms(0.5초) 동안 부드럽게 나타나게 설정

    // ===========================================
    // 2. 팝업 닫기 로직 (이전과 동일)
    // ===========================================

    // "닫기" 버튼 클릭 시
    $('.close-btn').on('click', function() {
        $modal.fadeOut(300);
    });
    
    // 배경 영역 클릭 시 팝업 닫기
    $modal.on('click', function(e) {
        if (e.target.id === 'popup') {
            $modal.fadeOut(300);
        }
    });

    // ESC 키 입력 시 팝업 닫기
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $modal.is(':visible')) {
            $modal.fadeOut(300);
        }
    });
});