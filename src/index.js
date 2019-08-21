import './style.scss'
import Snake from './_snake'

(() => {
  const snake = new Snake({
    el: '#app',
    width: 50,
    height: 50,
    speed: 1,
    initilLength: 3
  })
})()
