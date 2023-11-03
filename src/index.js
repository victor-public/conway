import { Grid } from './modules/Grid'

const root = document.querySelector('main')

Grid.init(100, root);

(() => {
    Grid.randomize()

    setInterval(() => {
        Grid.step()
    }, 200)
})()
