    const canvas = document.querySelector("canvas");

    //getContext: canvas에 그릴 수 있는 붓. 
    const ctx = canvas.getContext("2d");
    
    //css가 아니라 js에서만 높이와 길이를 바꿀 수 있게 할 것임
    canvas.width = 800;
    canvas.height = 800;

    //왼쪽 위가 좌표 00임 
    //좌표가 50 50, 가로 100, 세로 200인 직사각형을 그린 것
    // ctx.fillRect(50, 50, 100, 200);

    //선만들고 채우기
    ctx.rect(50,50,100,100);
    ctx.rect(150, 150, 100, 100);
    ctx.fill();
    
    //새로운 선을 만들어서 기존의 선과 분리시키기
    ctx.beginPath();
    ctx.rect(250, 250, 100, 100);
    ctx.rect(350, 350, 100, 100);
    ctx.rect(450,450,100,100);
    ctx.fillStyle="red";
    ctx.fill();
    
    // 선만들고 까망으로 채운다음, 나머지 선들을 만들고 빨강으로 다 채운다는 것을 보여주기 위해 Timeout설정해보기
    // setTimeout(()=>{ctx.fill();},3000)
