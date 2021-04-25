import React, { Component } from 'react'
import Sketch from 'react-p5'

export default class BackgroundProcessingView extends Component {
  setup = (p5: any, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
    p5.background(0)
    p5.stroke(65)
    for (let y = -300; y <= window.innerHeight; y += 10) {
      p5.noFill()
      p5.beginShape()
      for (let x = -100; x <= window.innerWidth * 1.1; x += 65) {
        const noiseModifier = p5.noise(x / 50 + y / 500)
        p5.curveVertex(x, y + 250 * noiseModifier)
        p5.strokeWeight(1.05 * noiseModifier)
      }
      p5.endShape()
    }
  }

  draw = (p5: any) => {}

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />
  }
}
