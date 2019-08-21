export default class Snake {
  constructor(params) {
    this.options.el = params.el || this.options.el
    this.options.width = params.width || this.options.width
    this.options.height = params.height || this.options.height
    this.options.initialSpeed = params.initialSpeed || this.options.initialSpeed
    this.options.initilLength = params.initilLength || this.options.initilLength

    this._drawField(this.options.width, this.options.height, this._container)
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
  _direction = 'right'
  _container = document.querySelector(this.options.el)

  start() {
    console.log('start')
  }

  pause() {
    console.log('pause')
  }

  _drawField (w, h) {
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

  _tick () {
    console.log('tick')
  }

  _addEvents () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 37 || e.keyCode === 100) this._moveLeft()
      if (e.keyCode === 38 || e.keyCode === 104) this._moveTop()
      if (e.keyCode === 39 || e.keyCode === 102) this._moveRight()
      if (e.keyCode === 40 || e.keyCode === 98)  this._moveBottom()
    })
  }

  _moveTop () {
    this._direction = 'top'
    console.log(this._direction)
  }

  _moveRight () {
    this._direction = 'right'
    console.log(this._direction)
  }

  _moveBottom () {
    this._direction = 'bottom'
    console.log(this._direction)
  }

  _moveLeft () {
    this._direction = 'left'
    console.log(this._direction)
  }

}
