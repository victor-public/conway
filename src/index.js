import { Grid } from './modules/Grid'

Grid.init(16, document.querySelector('main'))

const button = document.getElementById('CLEAR')

button.addEventListener('click', () => {
    Grid.reset()
})
