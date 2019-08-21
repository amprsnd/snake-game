export default class Snake {
  constructor(params) {
    this.options.el = params.el || this.options.el
    this.options.width = params.width || this.options.width
    this.options.height = params.height || this.options.height
    this.options.speed = params.speed || this.options.speed
    this.options.initilLength = params.initilLength || this.options.initilLength

    this._fillField(this.options.width, this.options.height, this._container)
    this._fillSnake(this.options.width, this.options.height, this.options.initilLength)
    this._drawSnake()
    this._drawScorepoint()
    this._addEvents()
  }

  options = {
    el: '#app',
    width: 50,
    height: 50,
    speed: 1,
    initilLength: 3
  }

  _field = []
  _snake = []
  _scorePoint = {}
  _direction = 'right'
  _container = document.querySelector(this.options.el)

  _tick = null
  _scores = 0
  _gameOver = false

  get scores () {
    return this._scores
  }

  start () {
    this._tick = setInterval(this._move, 500 / this.options.speed)
  }

  pause () {
    clearInterval(this._tick)
  }

  _speedUp () {
    this.pause()
    this.start()
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
      for (let i = 0; i < row.length; i++) {
        row[i] = 0
      }
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
    this._drawCell('scorepoint', this._scorePoint, 2)
  }

  _drawCell (className, coordinates, value) {
    this._field[coordinates.y][coordinates.x] = value

    let row = this._container.querySelectorAll('.row')[coordinates.y]
    let cell = row.querySelectorAll('.cell')[coordinates.x]
    cell.classList.add(className)
  }

  _move = () => {
    let snakeStep
    let snakeHead = this._snake[0]

    // direct snake
    if (this._direction === 'left') {
      snakeStep = { x: snakeHead.x - 1, y: snakeHead.y}
    }
    if (this._direction === 'top') {
      snakeStep = { x: snakeHead.x, y: snakeHead.y - 1 }
    }
    if (this._direction === 'right') {
      snakeStep = { x: snakeHead.x + 1, y: snakeHead.y }
    }
    if (this._direction === 'bottom') {
      snakeStep = { x: snakeHead.x, y: snakeHead.y + 1 }
    }
    this._snake.unshift(snakeStep)
    this._snake.pop()

    // check barriers
    if (
      snakeStep.x < 0 || snakeStep.x > this.options.width ||
      snakeStep.y < 0 || snakeStep.y > this.options.height ||
      this._field[snakeStep.y][snakeStep.x] === 1
    ) {
      clearInterval(this._tick)
      this._gameOver = true
    }

    // add scorepoint
    if (this._field[snakeStep.y][snakeStep.x] === 2) {
      this._snake.push({ x: snakeStep.x, y: snakeStep.y })
      this._field[snakeStep.y][snakeStep.x] = 0
      this._scores ++
      this.options.speed++
      this._drawScorepoint()
      this._speedUp()
    }

    if (!this._gameOver) {
      this._drawField()
      this._drawCell('scorepoint', this._scorePoint, 2)
      this._drawSnake()
    }
  }

  _addEvents () {
    document.addEventListener('keydown', (e) => {
      // direct snake
      if ((e.keyCode === 37 || e.keyCode === 100) && this._direction !== 'right') this._snakeDirect('left')
      if ((e.keyCode === 38 || e.keyCode === 104) && this._direction !== 'bottom') this._snakeDirect('top')
      if ((e.keyCode === 39 || e.keyCode === 102) && this._direction !== 'left') this._snakeDirect('right')
      if ((e.keyCode === 40 || e.keyCode === 98)  && this._direction !== 'top') this._snakeDirect('bottom')

      // start
      if (e.keyCode === 32) this.start()
      // pause
      if (e.keyCode === 27) this.pause()
    })
  }

  _snakeDirect(direction) {
    this._direction = direction
  }

  _random (min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

}
