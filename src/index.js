import { Grid } from './modules/Grid'

Grid.init(16, document.querySelector('main'))

const clearBtn = document.getElementById('CLEAR')

clearBtn.addEventListener('click', () => {
    Grid.clear()
})

const randomizeBtn = document.getElementById('START')

randomizeBtn.addEventListener('click', () => {
    Grid.randomize()
});

(() => {
    Grid.randomize()

    setInterval(() => {
        Grid.step()
    }, 200)
})()
