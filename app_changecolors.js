    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = 800;
    canvas.height = 800;

    ctx.lineWidth = 2;

    //색깔 바꾸기
    const colors = [
        "#55efc4",
        "#81ecec",
        "#74b9ff",
        "#a29bfe",
        "#dfe6e9",
        "#ffeaa7",
        "#fab1a0",
        "#ff7675",
        "#fd79a8",
        "#636e72"

    ]
    //처음클릭할 때부터 그림을 그리기 위해서 
    function onClick(event){
        // console.log(event);
        ctx.beginPath();
        ctx.moveTo(0,0);
        const color=colors[Math.floor(Math.random()*colors.length)];
        ctx.strokeStyle = color;
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
    }
    canvas.addEventListener("mousemove",onClick);