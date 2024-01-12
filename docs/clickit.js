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

        document.body.classList.remove('init');
        document.body.classList.add('playing');

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

        this.playarea.element.addEventListener('mouseleave', this.pause);
        this.playarea.element.addEventListener('mouseenter', this.resume);
    }

    /**
     * [playing]--pause()-->[paused]
     */
    pause = () => {
        document.body.classList.remove('playing');
        document.body.classList.add('paused');
        
        window.clearInterval(this.countdown.interval);
    }

    /**
     * [paused]--resume()-->[playing]
     */
    resume = () => {
        document.body.classList.remove('paused');
        document.body.classList.add('playing');
        
        this.countdown.interval = window.setInterval(() => {

            this.countdown.value -= 1;
            this.countdown.element.innerText = this.countdown.value;
            
            if (this.countdown.value <= 0) {
                this.stop();
            }
        }, 1 * 1000);
    }

    /**
     * [playing]--stop()-->[done]
     */
    stop = () => {
        document.body.classList.remove('playing');
        document.body.classList.add('gameover');

        this.playarea.element.removeEventListener('mouseleave', this.pause);
        this.playarea.element.removeEventListener('mouseenter', this.resume);
        
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
    
    const game = new Game(10);
    
    document.getElementById('start').addEventListener('click', (event) => {
        game.start();
    });

    window.addEventListener('resize', (event) => {
        console.log(window.innerWidth, window.innerHeight);
    })
});