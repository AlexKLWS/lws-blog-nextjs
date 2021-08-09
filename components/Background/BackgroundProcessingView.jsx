import React, { useRef, useEffect } from 'react'
import debounce from 'lodash/debounce'

// Credit: https://joeiddon.github.io/projects/javascript/perlin.html
const perlin = {
  rand_vect: function () {
    let theta = Math.random() * 2 * Math.PI
    return { x: Math.cos(theta), y: Math.sin(theta) }
  },
  dot_prod_grid: function (x, y, vx, vy) {
    let g_vect
    let d_vect = { x: x - vx, y: y - vy }
    if (this.gradients[[vx, vy]]) {
      g_vect = this.gradients[[vx, vy]]
    } else {
      g_vect = this.rand_vect()
      this.gradients[[vx, vy]] = g_vect
    }
    return d_vect.x * g_vect.x + d_vect.y * g_vect.y
  },
  smootherstep: function (x) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3
  },
  interp: function (x, a, b) {
    return a + this.smootherstep(x) * (b - a)
  },
  seed: function () {
    this.gradients = {}
    this.memory = {}
  },
  get: function (x, y) {
    if (this.memory.hasOwnProperty([x, y])) return this.memory[[x, y]]
    let xf = Math.floor(x)
    let yf = Math.floor(y)
    //interpolate
    let tl = this.dot_prod_grid(x, y, xf, yf)
    let tr = this.dot_prod_grid(x, y, xf + 1, yf)
    let bl = this.dot_prod_grid(x, y, xf, yf + 1)
    let br = this.dot_prod_grid(x, y, xf + 1, yf + 1)
    let xt = this.interp(x - xf, tl, tr)
    let xb = this.interp(x - xf, bl, br)
    let v = this.interp(y - yf, xt, xb)
    this.memory[[x, y]] = v
    return v
  },
}

const BackgroundProcessingView = () => {
  const canvasRef = useRef(null)

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    perlin.seed()

    function gradient(a, b) {
      return (b.y - a.y) / (b.x - a.x)
    }

    function bzCurve(points, f, t) {
      if (typeof f == 'undefined') f = 0.3
      if (typeof t == 'undefined') t = 0.6

      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)

      let m = 0
      let dx1 = 0
      let dx2
      let dy1 = 0
      let dy2

      let previousPoint = points[0]
      let nextPoint
      for (let i = 1; i < points.length; i++) {
        let currentPoint = points[i]
        nextPoint = points[i + 1]
        if (nextPoint) {
          m = gradient(previousPoint, nextPoint)
          dx2 = (nextPoint.x - currentPoint.x) * -f
          dy2 = dx2 * m * t
        } else {
          dx2 = 0
          dy2 = 0
        }

        ctx.bezierCurveTo(
          previousPoint.x - dx1,
          previousPoint.y - dy1,
          currentPoint.x + dx2,
          currentPoint.y + dy2,
          currentPoint.x,
          currentPoint.y,
        )

        dx1 = dx2
        dy1 = dy2
        previousPoint = currentPoint
      }
      ctx.stroke()
    }

    const stepX = 65 // control the width of X.
    const stepY = 13
    for (let y = -50; y < 150; y++) {
      // Generate random data
      const lines = []
      let pointX = 0
      let pointY = 0
      let point = { x: pointX, y: pointY }
      for (let x = 0; x < ctx.canvas.width; x += stepX) {
        const noiseModifier = perlin.get(x / 225, y / 125) * 250
        pointY = noiseModifier * 2 + y * stepY
        point = { x: pointX, y: pointY }
        lines.push(point)
        pointX = pointX + stepX
        ctx.lineWidth = Math.min(Math.max(0.2 + Math.abs(noiseModifier) / 150, 0.2), 0.45)
      }

      // Draw smooth line
      ctx.strokeStyle = '#FFF'
      bzCurve(lines, 0.3, 1)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    draw(ctx)
    const handleResize = () => {
      draw(ctx)
    }

    window.addEventListener('resize', debounce(handleResize, 400))

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [draw, canvasRef])

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight + 200} />
}

export default BackgroundProcessingView
