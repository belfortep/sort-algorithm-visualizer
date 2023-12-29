const graphic = document.getElementById("graphic")
const sorting = document.getElementById("sorting")
let elements_to_order = []
const ammount = 50
var sleepSetTimeout_ctrl;
let algorithm = "bubble"


function sleep(ms) {
        clearInterval(sleepSetTimeout_ctrl);
        return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

async function bubble() {
        const length = elements_to_order.length;
        for (let i = 0; i < length - 1; i++) {
                for (let j = 0; j < length - i - 1; j++) {
                        if (elements_to_order[j] > elements_to_order[j + 1]) {
                                const temp = elements_to_order[j];
                                elements_to_order[j] = elements_to_order[j + 1];
                                elements_to_order[j + 1] = temp;
                                await sleep(20)
                                update()
                        }
                }
        }
}

async function insertion() {

        let n = elements_to_order.length
        let i, key, j;
        for (i = 1; i < n; i++) {
                key = elements_to_order[i];
                j = i - 1;

                while (j >= 0 && elements_to_order[j] > key) {
                        elements_to_order[j + 1] = elements_to_order[j];
                        j = j - 1;
                        await sleep(20)
                        update()
                }
                elements_to_order[j + 1] = key;
        }
}


const sorts = {
        "bubble": bubble,
        "insertion": insertion
}

function update() {
        while (graphic.firstChild)
                graphic.removeChild(graphic.firstChild)

        for (let i = 0; i < ammount; i++) {
                const bar = document.createElement("div")
                bar.style.height = elements_to_order[i] * 100 + "%";
                bar.classList.add("bar")
                graphic.appendChild(bar)
        }
}

function run() {
        algorithm = sorting.value
        sorts[algorithm]()
}

function new_state() {
        for (let i = 0; i < ammount; i++) {
                elements_to_order[i] = Math.random()
        }
        update()
}




