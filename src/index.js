import snake from './_snake'

(() => {
  console.log('ready')

  snake.init({
    el: '#app',
    width: 10,
    height: 10,
    initialSpeed: 1,
    initilLength: 3
  })

  console.log()

})()
