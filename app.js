const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const eraseBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
//Array로 감싸지 않으면 foreach를 쓸 수 없음
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
    );
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH= 800;
const CANVAS_HEIGHT= 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

//붓을 옮기는 것
// ctx.moveTo(200,200);
// ctx.lineTo(400,400);
// ctx.stroke();

function onMove(event){
    //페인팅을 할것이라면 라인을 그려주고, 페인팅을 하지 않을 것이라면 좌표만 움직여줌
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }

    ctx.moveTo(event.offsetX,event.offsetY);
}

//그림을 그리고 싶은지 확인하는 것
function onMouseDown(){
    isPainting = true;
}

function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event){    
    ctx.lineWidth = event.target.value;
}

function onColorChage(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    // console.dir(event.target)
    // console.log(event.target.dataset.color);
    const colorValue = event.target.dataset.color; 
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue; 
}

function onModeclick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill"
    }else{
        isFilling = true;
        modeBtn.innerText = "Draw"
    }
}
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill"
}
//브라우저는 자바스크립트가 문서들을 읽게할 수 없음
//파일들은 유저가 파일을 선택했을 때만 보이게 됨. 브라우저의 메모리에 있게되기 때문. 
//URL로 파일에 접근하고 싶은 것임.

function onFIleChange(event){
    //브라우저를 위한 url을 가져오는 법.
    //브라우저가 자신의 메모리에 있는 파일을 드러내는 방식임. 시크릿모드나 다른 브라우저로보면 없음. 
    //console.dir(event.target);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    // console.log(url);
    //<img src=""/>와 아래 코드가 같은 것임
    const image = new Image();
    image.src = url;
    image.onload=function(){
        //이미지,위치,캔버스크기
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        fileInput.value=null;
    }
}

function onDoubleClick(event){
    const text = textInput.value;

    if(text !== "")
    {
    //모든걸 저장함.
    ctx.save();
    //마우스가 클릭한 canvas 내부좌표.
    // console.log(event.offsetX,event.offsetY);
    const text = textInput.value;
    //1로  설정하지 않으면 너무 굵어져서 안보임..
    ctx.lineWidth=1;
    ctx.font="68px serif";
    //filltext하면 글씨가 채워진 채로 나타남
    ctx.strokeText(text,event.offsetX,event.offsetY);
    //바뀌었던 모든걸 되돌림. save했던 시점으로.
    ctx.restore();
    }
}
function onSaveClick(){
    //사용자가 그린 이미지를 base64로 인코딩한 URL로 가져오기
    const url = canvas.toDataURL();
    //a태그 만들어주고 속성으로 url과 다운로드 넣어주기
    const a = document.createElement("a");
    a.href = url;
    a.download="myDreawing.png";
    a.click();
}

 

//글씨쓰면 드러나게 하기 
//mousedown, mouseup이 매우 빠르게 일어날 때 발생하는 이벤트임. 
canvas.addEventListener("dblclick",onDoubleClick);
//그림그리기
// 이것과 아래가 같음canvas.onmousemove = function (){}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown",onMouseDown);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting);
canvas.addEventListener("click",onCanvasClick);
//라인두께바꾸기
lineWidth.addEventListener("change", onLineWidthChange);
//색깔바꾸기
color.addEventListener("change",onColorChage);
//컬러팔레트클릭 할 때마다 색깔 바꾸기
colorOptions.forEach(color=> color.addEventListener("click",
onColorClick));
//모드바꾸기 (선인지 페인트인지) 
modeBtn.addEventListener("click",onModeclick);
//초기화버튼 만들기
destroyBtn.addEventListener("click",onDestroyClick);
//지우기버튼 (strokestyle을 white로 만들기) 
eraseBtn.addEventListener("click", onEraserClick);
//이미지 파일 올리기 버튼
fileInput.addEventListener("change",onFIleChange);
saveBtn.addEventListener("click",onSaveClick);