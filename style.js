const colorpicker = document.getElementById("cp");
const bg_color = document.getElementById("bg");
const f_s = document.getElementById("fontsize");
const canvas = document.getElementById("mycanvas");
const clear = document.getElementById("myclear");
const save = document.getElementById("mysave");
const prev = document.getElementById("myprev");
const cts = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

colorpicker.addEventListener('change', (e) => {
    cts.strokeStyle = e.target.value;
    cts.fillStyle = e.target.value;
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        cts.beginPath();
        cts.moveTo(lastX, lastY);
        cts.lineTo(e.offsetX, e.offsetY);
        cts.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});
clear.addEventListener('click', () => {
    cts.clearRect(0, 0, canvas.width, canvas.height);
});
bg_color.addEventListener('change',(e)=>{
    cts.fillStyle=e.target.value;
    cts.fillRect(0,0,800,800)
})
f_s.addEventListener('change',(e)=>{
    cts.lineWidth=e.target.value;
})
save.addEventListener('click',()=>{
    localStorage.setItem('canvas_contents',canvas.toDataURL());

    let link=document.createElement('a');
    link.download='mycanvas.png'
    link.href=canvas.toDataURL();
    link.click();
})
prev.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvas_contents');
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            cts.drawImage(img, 0, 0);
        };
    }
});
