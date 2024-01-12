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

    const target = {
        width: 200,
        height: 150
    }
    const playarea = {
        width: 800,
        height: 600
    }
    let points = 0;

    const position = getRandomPosition(target, playarea);
    setPosition(position, e_target);

    e_playarea.addEventListener('click', (event) => {

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
        console.log(points);
        
        const position = getRandomPosition(target, playarea);
        setPosition(position, e_target);
    });
});