class Game {
    /**
     * 
     * @param {number} duration Dauer in Sekunden
     */
    constructor (duration) {

        this.duration = duration;
        
        this.status = 'init'; // Spielphase (init, playing, paused, done)

        this.points = {
            value: 0,
            element: document.getElementById('points')
        }
        this.countdown = {
            value: 0,
            element: document.getElementById('countdown'),
            interval: null
        }
        this.target = {
            width: 200,
            height: 150,
            element: document.getElementById('target')
        }
        this.playarea = {
            width: 800,
            height: 600,
            element: document.getElementById('playarea')
        }
    }

    /**
     * [init]--start()-->[playing]
     */
    start = () => {
        this.countdown.value = this.duration;
        
        this.countdown.interval = window.setInterval(() => {

            this.countdown.value -= 1;
            this.countdown.element.innerText = this.countdown.value;
            
            if (this.countdown.value <= 0) {
                this.stop();
            }
        }, 1 * 1000);

        const position = getRandomPosition(this.target, this.playarea);
        setPosition(position, this.target.element);

        this.playarea.element.addEventListener('click', (event) => {

            if (this.countdown.value > 0) {
    
                console.log(event.target === this.target.element ? 'Treffer!' : 'Daneben!');
    
                if (event.target === this.target.element) {
                    this.points.value += 1;
                }
                else {
                    this.points.value = (this.points.value > 0) ? this.points.value - 1 : 0;
                }
    
                this.points.element.innerText = this.points.value;
                
                const position = getRandomPosition(this.target, this.playarea);
                setPosition(position, this.target.element);
            }
        });
    }

    /**
     * [playing]--pause()-->[paused]
     */
    pause = () => {}

    /**
     * [paused]--resume()-->[playing]
     */
    resume = () => {}

    /**
     * [playing]--stop()-->[done]
     */
    stop = () => {
        window.clearInterval(this.countdown.interval);
    }
}

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
    
    const game = new Game(30);
    
    document.getElementById('start').addEventListener('click', (event) => {
        game.start();
    });
});