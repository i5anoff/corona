function getColor6(v:number):string {
    let c = (v).toString(16).split('');
    while (c.length < 3) c.unshift('0');
    // console.log(c.join(""));
    return '#' + c.join("");
}

function getColor12(v:number):string {
    let c = (v).toString(16);
    while (c.length < 6) c = '0' + c;
    return '#' + c;
}

function getColor10(v:number):string {
    const r = ((v >> 14) & 63) * (255/63);
    const g = (v >> 6) & 255;
    const b = (v & 63) * (255/63);
    return `rgb(${r}, ${g}, ${b})`;
}

function getColor11(v:number):string {
    const r = ((v >> 14) & 255);
    const g = ((v >> 6) & 255);
    const b = (v & 63) * (255/63);
    return `rgb(${r}, ${g}, ${b})`;
}

function getGray(power:number, v:number):string {
    const c = Math.floor(255 * (v / (4**power)));
    return `rgb(${c}, ${c}, ${c})`;
}

const getGrayC = (power:number) => (v:number) => getGray(power, v);

function drawString(array:number[], getColor:((v:number) => string), canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D) {
    const animSide = 37; //Math.max(1, Math.round(array.length/11 * (0.5 + 0.5 * Math.sin(Date.now() / 2000))));

    canvas.width = 4 * animSide;
    canvas.height = 4 * Math.ceil(array.length / animSide);
    let x = 0, y = 0, dir = 1;
    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = getColor(array[i]);
        ctx.fillRect(x * 4, y * 4, 4, 3);
        // x++;
        // if (i % animSide === animSide - 1) {
        //     x = 0;
        //     y++;
        // }
        x += dir;
        if (x === animSide || x === -1) {
            x -= dir;
            ctx.fillRect(x * 4, y * 4, 4, 4);
            dir = -dir;
            y++;
        }
    }
    array.unshift(array.pop()!);
}


async function init() {
    const corona6 = await (await fetch('corona6.json')).json();
    const corona10 = await (await fetch('corona10.json')).json();
    const corona11 = await (await fetch('corona11.json')).json();
    const corona12 = await (await fetch('corona12.json')).json();

    const canvas6 = document.createElement('canvas');
    document.body.append(canvas6);
    const ctx6 = canvas6.getContext('2d')!;

    const canvas10 = document.createElement('canvas');
    document.body.append(canvas10);
    const ctx10 = canvas10.getContext('2d')!;

    const canvas11 = document.createElement('canvas');
    document.body.append(canvas11);
    const ctx11 = canvas11.getContext('2d')!;

    const canvas12 = document.createElement('canvas');
    document.body.append(canvas12);
    const ctx12 = canvas12.getContext('2d')!;

    function tick() {
        drawString(corona6, getColor6, canvas6, ctx6);
        drawString(corona10, getColor10, canvas10, ctx10);
        drawString(corona11, getColor11, canvas11, ctx11);
        drawString(corona12, getColor12, canvas12, ctx12);
        requestAnimationFrame(tick);
    }
    tick();
}

init();