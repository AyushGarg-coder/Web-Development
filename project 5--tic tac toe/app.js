let y = 1;
let arr1 = [0, 0, 0];
let arr2 = [0, 0, 0];
let arr3 = [0, 0, 0];
let result = false;
let count = 0;
let win_x = 0;
let win_0 = 0;
let round = 1;
function my_func(x) {
    document.getElementById('audio1').play()
    if (y % 2 == 0) {
        document.getElementById(x).innerHTML = '0';
        document.getElementById(x).disabled = true
        add_element(x)
        y = y - 1;
    }
    else if (y % 2 != 0) {
        document.getElementById(x).innerHTML = 'X';
        document.getElementById(x).disabled = true;
        add_element(x)
        y = y + 1;
    }
}
function add_element(z) {
    if (z == '1') {
        if (y % 2 === 0) {
            arr1[0] = 2;
        }
        else {
            arr1[0] = 1;
        }
    }
    if (z == '2') {
        if (y % 2 === 0) {
            arr1[1] = 2;
        }
        else {
            arr1[1] = 1;
        }
    }
    if (z == '3') {
        if (y % 2 === 0) {
            arr1[2] = 2;
        }
        else {
            arr1[2] = 1;
        }
    }
    if (z == '4') {
        if (y % 2 === 0) {
            arr2[0] = 2;
        }
        else {
            arr2[0] = 1;
        }
    }
    if (z == '5') {
        if (y % 2 === 0) {
            arr2[1] = 2;
        }
        else {
            arr2[1] = 1;
        }
    }
    if (z == '6') {
        if (y % 2 === 0) {
            arr2[2] = 2;
        }
        else {
            arr2[2] = 1;
        }
    }
    if (z == '7') {
        if (y % 2 === 0) {
            arr3[0] = 2;
        }
        else {
            arr3[0] = 1;
        }
    }
    if (z == '8') {
        if (y % 2 === 0) {
            arr3[1] = 2;
        }
        else {
            arr3[1] = 1;
        }
    }
    if (z == '9') {
        if (y % 2 === 0) {
            arr3[2] = 2;
        }
        else {
            arr3[2] = 1;
        }
    }
    if (z >= '3') {
        check_result()
    }
}
function check_result() {
    // console.log(arr1)
    // console.log(arr2)
    // console.log(arr3)
    //condition 1 row1
    count = count + 1;
    if (arr1[0] === arr1[1] && arr1[1] === arr1[2] && arr1[0] != 0) {
        result = true;
    }
    //condition 2 row 2
    else if (arr2[0] === arr2[1] && arr2[1] === arr2[2] && arr2[0] != 0) {
        result = true;
    }
    //condition 3 row 3
    else if (arr3[0] === arr3[1] && arr3[1] === arr3[2] && arr3[0] != 0) {
        result = true;
    }
    //condtion 4 col 1
    else if (arr1[0] === arr2[0] && arr2[0] === arr3[0] && arr1[0] != 0) {
        result = true;
    }
    //condtion 5 col 2
    else if (arr1[1] === arr2[1] && arr2[1] === arr3[1] && arr1[1] != 0) {
        result = true;
    }
    //condtion 6 col 3
    else if (arr1[2] === arr2[2] && arr2[2] === arr3[2] && arr1[2] != 0) {
        result = true;
    }
    //condtion 7 diagonal 1
    else if (arr1[0] === arr2[1] && arr2[1] === arr3[2] && arr1[0] != 0) {
        result = true;
    }
    //condtion 8 diagonal 2
    else if (arr1[2] === arr2[1] && arr2[1] === arr3[0] && arr1[2] != 0) {
        result = true;
    }
    if (result === false) {
        if (count == 9) {
            console.log('Draw')
            document.getElementById('result').innerHTML = 'Draw'
            document.getElementById('result').className = 'alert alert-warning'
            // prepare_next_round();
        }
    }
    else if(result==true)
        {
            announce_result(y);
        }
}
function announce_result(k) {
    console.log(k)
    if (result === true) {
        if (k === 2) {
            win_0++;
            console.log('0 wins')
            document.getElementById('result').innerHTML = '🎉 Player_2 -- 0 wins 🎉'
            document.getElementById('result').className = 'alert alert-warning'
            document.getElementById('audio1').pause()
            document.getElementById('win_audio').play()
            disable_btn()
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
        }
        else if (k === 1) {
            win_x++;
            console.log('X wins')
            document.getElementById('result').innerHTML = '🎉 Player_1 -- X wins 🎉'
            document.getElementById('result').className = 'alert alert-warning'
            disable_btn()
            document.getElementById('audio1').pause()
            document.getElementById('win_audio').play()
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
        }
        // prepare_next_round();
    }
}
function disable_btn() {
    document.getElementById('1').disabled = true
    document.getElementById('2').disabled = true
    document.getElementById('3').disabled = true
    document.getElementById('4').disabled = true
    document.getElementById('5').disabled = true
    document.getElementById('6').disabled = true
    document.getElementById('7').disabled = true
    document.getElementById('8').disabled = true
    document.getElementById('9').disabled = true
}
