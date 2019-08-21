import './style.scss'
import Snake from './_snake'

(() => {
  const snake = new Snake({
    el: '#app',
    width: 50,
    height: 50,
    initialSpeed: 5,
    initilLength: 3
  })

  // snake.start()

  console.log(snake)
})()
