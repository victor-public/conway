import { Board } from './modules/Board'
import { conway } from './modules/Conway';

const root = document.querySelector('main')

Board.init(120, root, conway)

Board.randomize(() => Math.round(Math.random()) === 1)

setInterval(() => {
    Board.play()
}, 100)
