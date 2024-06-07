let dice = Number(document.getElementById('dice_roll').value)
let score1 = Number(document.getElementById('p1_score').innerHTML)
let score2 = Number(document.getElementById('p2_score').innerHTML)
let z = 0
let temp = 1
function roll_dice() {
    let audio2 = document.getElementById('audio2').play()
    let audio = document.getElementById('audio1').play()
    let num = Number(Math.floor(Math.random(0, 1) * 6 + 1))
    if (num === 1) {
        document.getElementById('image1').src = 'https://etc.usf.edu/clipart/42100/42158/die_01_42158_lg.gif'
    }
    else if (num == 2) {
        document.getElementById('image1').src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiHqHTT5iY-iCRi-4TYWi0OwQFbNmFnalTlWuyjvDsuKOnhOQFOPs8TAibaU_NqOumzI&usqp=CAU'
    }
    else if (num == 3) {
        document.getElementById('image1').src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dX3m0ZKBBa_gOYESWba7HiaSOM1-e2hOtASek7BTKHhEQPjpW-up9FbnZoNluvAc8Ls&usqp=CAU'
    }
    else if (num == 4) {
        document.getElementById('image1').src = 'https://etc.usf.edu/clipart/42100/42161/die_04_42161_sm.gif'
    }
    else if (num == 5) {
        document.getElementById('image1').src = 'https://etc.usf.edu/clipart/42100/42162/die_05_42162_lg.gif'
    }
    else {
        document.getElementById('image1').src = 'https://etc.usf.edu/clipart/42100/42164/die_06_42164_lg.gif'
    }
    document.getElementById('dice_roll').innerHTML = num
    if (temp % 2 === 0) {
        score2 = score2 + num
        console.log(score2)
        document.getElementById('p2_score').innerHTML = score2
        temp = temp - 1
        if (score2 >= 50) {
            z = 1
        }
    }
    else {
        score1 = score1 + num
        console.log(score1)
        document.getElementById('p1_score').innerHTML = score1
        temp = temp + 1
        if (score1 >= 50) {
            z = 1
        }
    }
    if (z === 1) {
        document.getElementById('audio2').pause()
        document.getElementById('audio1').src = "win.mp3"
        document.getElementById('audio1').play()
        document.getElementById('btn1').disabled = true
        if (score1 > score2) {
            document.getElementById('result').innerHTML = "Captain America Won"
            document.getElementById('result').className = "alert alert-dark mt-2"
            //confetti start
            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const duration = 15 * 1000,
                animationEnd = Date.now() + duration,
                defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // since particles fall down, start a bit higher than random
                confetti(
                    Object.assign({}, defaults, {
                        particleCount,
                        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    })
                );
                confetti(
                    Object.assign({}, defaults, {
                        particleCount,
                        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    })
                );
            }, 250);
            //confetti end
            //border set
            document.getElementById('border1').style.border = '2px solid red';
            document.getElementById('border1').style.boxShadow = '0 0 10px #ff0078'
        }
        if (score1 < score2) {
            document.getElementById('result').innerHTML = "Spider Man Won"
            document.getElementById('result').className = "alert alert-dark mt-2"
            //confetti start
            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const duration = 15 * 1000,
                animationEnd = Date.now() + duration,
                defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // since particles fall down, start a bit higher than random
                confetti(
                    Object.assign({}, defaults, {
                        particleCount,
                        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    })
                );
                confetti(
                    Object.assign({}, defaults, {
                        particleCount,
                        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    })
                );
            }, 250);
            //confetti end
            document.getElementById('border2').style.border = '2px solid red';
            document.getElementById('border2').style.boxShadow = '0 0 10px #ff0078';
        }
    }
}
