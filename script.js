const lines = document.querySelectorAll(".line")
const fail = document.querySelector(".fail")
const score = document.querySelector(".score")
const playerName = document.querySelector(".player-name")
const timeEnd = document.querySelector(".timer-end")
const scoreEnd = document.querySelector(".score-end")
const playerNameEnd = document.querySelector(".player-name-end")
const time = document.querySelector(".timer ")
const confirmInstruction = document.querySelector(".confirm-instruction")
const username = document.querySelector(".username")
const pauseSection = document.querySelector(".pause")
const restart = document.querySelector(".restart")
const continueBtn = document.querySelector(".continue")
const banner = document.querySelector(".banner")
const gameOver = document.querySelector(".game-over")
const shootArea = document.querySelector(".shoot-area")

let minute = 00
let second = 00

let paused = false
let interVal
const interValFunc = () => {
    const randLine = Math.floor(Math.random() * lines.length)
    lines[randLine].append(makeEnemy())
    if (second == 60) {
        second = 0
        minute += 1
    } else {
        second += 1
    }
    time.innerHTML = `${minute}:${second}`
}

function end() {
    gameOver.style.display = "flex"
    document.querySelectorAll(".enemy")
        .forEach(en => {
            en.remove()
        })
    document.querySelectorAll(".bullet")
        .forEach(bull => {
            bull.remove()
        })

    playerNameEnd.innerHTML = playerName.innerHTML
    timeEnd.innerHTML = time.innerHTML
    scoreEnd.innerHTML = score.innerHTML
    clearInterval(interVal)
}
function play() {
    let i = 2
    let haha = setInterval(() => {
        banner.style.display = "flex"
        banner.innerHTML = i
        if (i < 1) {
            banner.style.display = "none"
            clearInterval(haha)
        }
        i--
    }, 1000);
    setTimeout(() => {
        interVal = setInterval(interValFunc, 1000)
    }, 3000)
}
// play()
function makeEnemy() {
    const div = document.createElement("div")
    div.classList.add("enemy")
    return div
}
function makeBullet() {
    const div = document.createElement("div")
    div.classList.add("bullet")
    return div

}
function clearEnemy() {
    document.querySelectorAll(".enemy")
        ?.forEach(en => {
            const enRect = en.getBoundingClientRect()
            const border = document.elementsFromPoint(enRect.x, enRect.y)
            // console.log(border[1]?.classList.contains("border"));
            if (border[1]?.classList.contains("border")) {
                en.remove()
                updateFail()
            }
        })
}
function clearBullet() {
    document.querySelectorAll(".bullet")
        ?.forEach(bul => {
            const bulRect = bul.getBoundingClientRect()
            if (bulRect.top < 0) {
                // console.log("bullet deleted");
                bul.remove()

            }
        })
}
continueBtn.addEventListener("click", function () {
    pause()
})
restart.addEventListener("click", function () {
    window.location.href = window.location.href
})
function pause() {
    if (!paused) {
        paused = !paused
        document.querySelectorAll(".enemy")
            ?.forEach(en => {
                en.style.animationPlayState = "paused"
            })
        document.querySelectorAll(".bullet")
            ?.forEach(bull => {
                bull.style.animationPlayState = "paused"
            })
        pauseSection.classList.toggle("show")
        clearInterval(interVal)
    } else {
        paused = !paused
        play()
        setTimeout(() => {
            document.querySelectorAll(".enemy")
                ?.forEach(en => {
                    en.style.animationPlayState = "running"
                })
            document.querySelectorAll(".bullet")
                ?.forEach(bull => {
                    bull.style.animationPlayState = "running"
                })
        }, 3000)
        pauseSection.classList.toggle("show")
    }
}
confirmInstruction.addEventListener("click", function (event) {
    const username = this.previousElementSibling
    if (username.value.length != 0) {
        this.parentElement.remove()
        playerName.innerHTML = username.value
        play()
    } else {
        alert("nama harus diisi")
    }
})

window.addEventListener("keyup", event => {
    // console.log(event.key);
    switch (event.key) {
        case "d":
            lines[0].append(makeBullet())
            break;
        case "f":
            lines[1].append(makeBullet())
            break;
        case "j":
            lines[2].append(makeBullet())
            break;
        case "k":
            lines[3].append(makeBullet())
            break;
        case "Escape":
            pause()
            break;
    }
})

function isCollide() {
    document.querySelectorAll(".bullet")
        ?.forEach(bul => {
            const bulRect = bul.getBoundingClientRect()
            const target = document.elementsFromPoint(bulRect.x, bulRect.y)
            // const shootAreaRect = shootArea.getBoundingClientRect()

            if (target[0].classList.contains("enemy")) {
                // console.log("shooted");
                // console.log(targetRect.top);
                const targetRect = target[0].getBoundingClientRect()
                if (targetRect.top > 300) {

                    bul.remove()
                    target[0].remove()
                    updateScore()
                }

            }
        })

}

function updateScore() {
    score.innerHTML = parseInt(score.innerHTML) + 1
}

function updateFail() {
    // console.log(parseInt(fail.innerHTML));
    if (parseInt(fail.innerHTML) > 3) {
        // console.log("end");
        end()
    } else {
        fail.innerHTML = parseInt(fail.innerHTML) + 1
    }
}

function loop() {
    clearEnemy()
    clearBullet()
    isCollide()
    window.requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)