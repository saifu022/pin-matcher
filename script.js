function clearLastValue(pinLocal) {
    pinLocal = pinLocal.slice(0, (pinLocal.length - 1));
    return pinLocal;
}
function clearDisplay() {
    document.getElementById('pin-display').value = '';
    document.getElementById('pin-typed').value = '';
    pinLocal = '';
}
function showLayerOne(val) {
    halfWidth = document.getElementsByClassName('half-width');
    for (let i = 0; i < halfWidth.length; i++) {
        const blocks = halfWidth[i];
        blocks.style.display = val;

    }
}

//generate pin
let pin = '';
document.getElementById('generate-btn').addEventListener('click', function () {
    const rand = Math.random();
    pin = Math.ceil(rand * 10000);
    document.getElementById('pin-display').value = pin;
    document.getElementById('pin-display').style.textAlign = 'center';
})
//read keypress
const buttonGroup = document.getElementsByClassName('button');
let pinLocal = '';
for (let i = 0; i < buttonGroup.length; i++) {
    const button = buttonGroup[i];
    const buttonID = button.innerText;
    if (buttonID == "<" || buttonID == 'C') {
        //clear and backspace
        if (buttonID == "<") {
            button.addEventListener('click', function () {
                pinLocal = clearLastValue(pinLocal);
                document.getElementById('pin-typed').value = pinLocal;
            })
        }
        else if (buttonId = "C") {
            button.addEventListener('click', function () {
                pinLocal = '';
                document.getElementById('pin-typed').value = pinLocal;
            })

        }
    }
    else {
        //read keypress, form pinLocal and show display
        button.addEventListener('click', function () {
            pinLocal = pinLocal + buttonID;
            document.getElementById('pin-typed').value = pinLocal;
            document.getElementById('pin-typed').style.textAlign = 'center';
            document.getElementById('generate-pin-warning').style.display = 'none';
        })
    }
}
let chance = 3;
document.getElementById('submit-btn').addEventListener('click', function () {
    if (chance > 0) {
        if ((pin == '' && pinLocal == '')||
            (pin == '' && pinLocal.length > 0)) {
            document.getElementById('generate-pin-warning').style.display = 'block';
            clearDisplay();
            chance--;
        }
        else if (pin == pinLocal) {
            document.getElementById('pin-matched').style.display = 'block';
            clearDisplay();
            showLayerOne('none');
        }
        else {
            if (chance == 1){
                document.getElementById('pin-didnt-match').innerHTML = '❌ Failed authentication. Please reload the page and try agin later';
            }
            document.getElementById('pin-didnt-match').style.display = 'block';
            clearDisplay();
            showLayerOne('none');
            chance--;
            
        }
        document.getElementById('chanceLeft').innerText = chance;
    }
    else {
        showLayerOne('none');
        document.getElementById('pin-didnt-match').style.display = 'block';
    }
})
document.getElementById('pin-didnt-match').addEventListener('click', function () {
    if (chance > 0) {
        showLayerOne('block');
        document.getElementById('pin-didnt-match').style.display = 'none';
    }
    else{
        document.getElementById('pin-didnt-match').innerHTML = '❌ Failed authentication. Please reload the page and try agin later'
    }
})