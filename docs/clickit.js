const getRandomPosition = (target, playarea) => {

    const top = Math.random() * (playarea.height - target.height);
    const left = Math.random() * (playarea.width - target.width);
    
    return { top: top, left: left }
}
const setPosition = (position, elem) => {

    elem.style.top = `${position.top}px`;
    elem.style.left = `${position.left}px`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Hello World!');

    const e_target = document.getElementById('target');
    const e_playarea = document.getElementById('playarea');
    const e_points = document.getElementById('points');
    const e_countdown = document.getElementById('countdown');

    const target = {
        width: 200,
        height: 150
    }
    const playarea = {
        width: 800,
        height: 600
    }
    let points = 0;
    let timer = 30;

    const position = getRandomPosition(target, playarea);
    setPosition(position, e_target);

    /* Countdown */

    // wiederhole 1 Mal pro Sekunde
    const countdown = window.setInterval(() => {
        timer = timer - 1;
        e_countdown.innerText = timer;
    }, 1 * 1000);

    // warte 30 Sekunden
    window.setTimeout(() => {
        window.clearInterval(countdown);
    }, 30 * 1000);

    e_playarea.addEventListener('click', (event) => {

        if (timer > 0) {

            console.log(event.target === e_target ? 'Treffer!' : 'Daneben!');

            if (event.target === e_target) {
                points += 1;
            }
            else {
                // Wähle das größere aus 0 oder points - 1
                // points = Math.max(0, points - 1);

                // points = (points <= 0) ? 0 : points - 1;
                points = (points > 0) ? points - 1 : 0;
            }

            e_points.innerText = points;
            
            const position = getRandomPosition(target, playarea);
            setPosition(position, e_target);
        }
    });
});