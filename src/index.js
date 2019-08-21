import './style.scss'
import Snake from './_snake'

(() => {
  const snake = new Snake({
    el: '#ororo',
    width: 50,
    height: 50,
    initialSpeed: 5,
    initilLength: 9
  })

  snake.start()

  console.log(snake)
})()
