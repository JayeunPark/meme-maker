const canvas = document.querySelector("canvas");

//getContext: canvas에 그릴 수 있는 붓. 
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

// //0,0에서 시작하는 붓을 움직이는 함수. 
// ctx.moveTo(50,50);
// //라인을 그리는 것
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.stroke();
// ctx.fill();


//집만들기
ctx.fillRect(200,200,50,200);
ctx.fillRect(400,200,50,200);
ctx.lineWidth = 2;
ctx.fillRect(300,300,50,100);
ctx.fillRect(200, 200, 200, 20);

ctx.moveTo(200,200);
ctx.lineTo(325,100);
ctx.lineTo(450,200);
ctx.fill();


//사람만들기
ctx.beginPath();
ctx.fillRect(500,200,15,100);
ctx.fillRect(560,200,60,200);
ctx.fillRect(665,200,15,100);
//대가리
//시작좌표x,y, 시작앵글, 마치는 앵글.
//0는 3시 점. 0.5PI는 6시 1은 9시 1.5는 12시 2는 한바퀴라는 의미
ctx.arc(590,130,50,0,2 * Math.PI);
ctx.fill();
ctx.beginPath();
//새로운 색을 칠하려면 새로운 path가 필요한게 아닌지 고민해야함 반드시
ctx.fillStyle = "white";
ctx.arc(570,125,8,Math.PI,2 * Math.PI);
ctx.arc(610,125,8,Math.PI,2 * Math.PI);
ctx.fill();
