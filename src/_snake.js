export default class Snake {
  constructor(params) {
    this.options.el = params.el || this.options.el
    this.options.width = params.width || this.options.width
    this.options.height = params.height || this.options.height
    this.options.initialSpeed = params.initialSpeed || this.options.initialSpeed
    this.options.initilLength = params.initilLength || this.options.initilLength

    this._fillField(this.options.width, this.options.height, this._container)
    this._fillSnake(this.options.width, this.options.height, this.options.initilLength)
    this._drawSnake()
    this._drawScorepoint()
    this._addEvents()
  }

  options = {
    el: '#app',
    width: 10,
    height: 10,
    initialSpeed: 1,
    initilLength: 3
  }

  _field = []
  _snake = []
  _scorePoint = {}
  _direction = 'right'
  _container = document.querySelector(this.options.el)

  _scores = 0

  _tick = null

  get scores () {
    return this._scores
  }

  start () {
    this._tick = setInterval(this._move, 1200 / this.options.initialSpeed)
    console.log('start')
  }

  pause () {
    clearInterval(this._tick)
    console.log('pause')
  }

  restart () {
    console.log('restart')
  }

  _fillField (w, h) {
    this._field = []
    this._container.innerHTML = ''

    // fill array rows
    for (let i = 0; i < h; i++) {
      this._field.push([])
    }

    // fill array columns
    this._field.forEach((row) => {
      for (let i = 0; i < w; i++) {
        row.push(0)
      }
    })

    // draw HTML
    this._field.forEach((row) => {
      let rowNode = document.createElement('DIV')
      rowNode.classList.add('row')

      row.forEach((cell) => {
        let cellNode = document.createElement('DIV')
        cellNode.classList.add('cell')
        rowNode.appendChild(cellNode)
      })

      this._container.appendChild(rowNode)
    })
  }

  _drawField () {
    this._field.forEach(row => {
      row.forEach(cell => {
        cell = 0
      })
    })
    document.querySelectorAll('.cell').forEach(cell => {
      cell.className = ''
      cell.classList.add('cell')
    })
  }

  _fillSnake (w, h, length) {
    const x = Math.ceil(w / 2)
    const y = Math.ceil(h / 2)

    for (let i = 0; i < length; i++) {
      this._snake.push({ x: x - i, y: y })
    }
  }

  _drawSnake () {
    this._snake.forEach((position) => {

      // TODO: DRY refactor
      // this._field[position.y][position.x] = 1

      // let row = this._container.querySelectorAll('.row')[position.y]
      // let cell = row.querySelectorAll('.cell')[position.x]
      // cell.classList.add('snake')
      // console.log(row, cell)

      this._drawCell('snake', position, 1)
    })
  }

  _drawScorepoint () {
    this._scorePoint.x = this._random(0, this.options.width)
    this._scorePoint.y = this._random(0, this.options.height)

    let scorepointPosition = this._field[this._scorePoint.y][this._scorePoint.x]

    if (scorepointPosition !== 0) {
      this._drawScorepoint()
      return
    }

    // TODO: DRY refactor
    // this._field[this._scorePoint.y][this._scorePoint.x] = 2

    // let row = this._container.querySelectorAll('.row')[this._scorePoint.y]
    // let cell = row.querySelectorAll('.cell')[this._scorePoint.x]
    // cell.classList.add('scorepoint')
    // console.log(row, cell)

    this._drawCell('scorepoint', this._scorePoint, 2)

  }

  _drawCell (className, coordinates, value) {
    this._field[coordinates.y][coordinates.x] = value

    let row = this._container.querySelectorAll('.row')[coordinates.y]
    let cell = row.querySelectorAll('.cell')[coordinates.x]
    cell.classList.add(className)
    console.log(row, cell)
  }

  _move = () => {
    console.log(this._snake)
    let snakeHead = this._snake[0]

    // add scorepoint
    if (this._field[snakeHead.y][snakeHead.x] === 2) {
      this._snake.unshift({ x: snakeHead.x, y: snakeHead.y })
      this._drawScorepoint()
      return
    }

    // direct snake
    if (this._direction === 'left') {
      this._snake.unshift({ x: snakeHead.x - 1, y: snakeHead.y})
      this._snake.pop()
    }
    if (this._direction === 'top') {
      this._snake.unshift({ x: snakeHead.x, y: snakeHead.y - 1 })
      this._snake.pop()
    }
    if (this._direction === 'right') {
      this._snake.unshift({ x: snakeHead.x + 1, y: snakeHead.y })
      this._snake.pop()
    }
    if (this._direction === 'bottom') {
      this._snake.unshift({ x: snakeHead.x, y: snakeHead.y + 1 })
      this._snake.pop()
    }

    // check barriers
    if (
      snakeHead.x < 0 || snakeHead.x > this.options.width ||
      snakeHead.y < 0 || snakeHead.y > this.options.height ||
      this._field[snakeHead.y][snakeHead.x] === 1
    ) {
      // alert('Game over')
    }

    this._drawField()
    this._drawCell('scorepoint', this._scorePoint, 2)
    this._drawSnake()
  }

  _addEvents () {
    document.addEventListener('keydown', (e) => {
      // direct snake
      if (e.keyCode === 37 || e.keyCode === 100 && this.direction !== 'right') this._snakeDirect('left')
      if (e.keyCode === 38 || e.keyCode === 104 && this.direction !== 'bottom') this._snakeDirect('top')
      if (e.keyCode === 39 || e.keyCode === 102 && this.direction !== 'left') this._snakeDirect('right')
      if (e.keyCode === 40 || e.keyCode === 98  && this.direction !== 'top') this._snakeDirect('bottom')

      // start
      if (e.keyCode === 32) this.start()
      // pause
      if (e.keyCode === 27) this.pause()
    })
  }

  _snakeDirect(direction) {
    this._direction = direction
    console.log(this._direction)
  }

  _random (min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

}
