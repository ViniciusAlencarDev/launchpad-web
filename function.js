const x = 9;
const y = 7;
let audio;

window.onload = () => {
    const container = document.querySelector('#container');
    // audio = document.querySelector('#audio');
    //console.log(audio)
    let result = "";
    for(let i = 0; i < y; i++) {
        result += "<div class='row'>";
        for(let j = 0; j < x; j++) {
            result += "<div id='button-"+i+"-"+j+"' class='button' onmousedown='clicou("+i+", "+j+")' onmouseup='soltouClique()' onmouseleave='soltouClique()'></div>";
        }
        result += "</div>";
    }
    container.innerHTML = result;
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function piscarButton(a, b, color = "red") {
    let button = document.querySelector(`#button-${a}-${b}`);
    button.style = `background: ${color}`;
    //audio.play();
    await sleep(200);
    button.style = "background: white";
}

const colors = [
    "#38a9df",
    "#8038df",
    "#97df38",
    "orange",
]

const context = new AudioContext();
let oscillator = context.createOscillator();

async function clicou(a, b) {

    // let context = new AudioContext(),
    oscillator = context.createOscillator();

    oscillator.type = 'triangle';
    oscillator.connect(context.destination);

    oscillator.frequency.value = ((a + b) + 1) * 50;
    
    oscillator.start();
    await sleep(100);

    let color = colors[Math.floor(Math.random() * colors.length)];

    let menosColuna = a-1;
    let maisColuna = a+1;

    let menosLinha = b-1;
    let maisLinha = b+1;

    piscarButton(a, b, color);

    for(let i = 1; i <= Math.max(x, y); i++) {
        
        await sleep(50);

        if(menosColuna >= 0) {
            piscarButton(menosColuna, b, color);
            menosColuna--;
        }
        if(maisColuna < y) {
            piscarButton(maisColuna, b, color);
            maisColuna++;
        }
        if(menosLinha >= 0) {
            piscarButton(a, menosLinha, color);
            menosLinha--;
        }
        if(maisLinha < x) {
            piscarButton(a, maisLinha, color);
            maisLinha++;
        }
        
    }
}

function soltouClique() {
    oscillator.stop();
}