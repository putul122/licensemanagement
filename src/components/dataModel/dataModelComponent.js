import React from 'react'
import * as d3 from 'd3'
import './dataModelComponent.scss'
import PropTypes from 'prop-types'
import api from '../../constants'
// let colors = d3.scaleOrdinal(d3.schemeCategory10)
console.log('d3', d3)
let width = 1000
let height = 600
let diagramLayout
let simulation
function wrap (text, width) {
    console.log('wr text', text)
    console.log('wr width', width)
    text.each(function () {
        // eslint-disable-next-line
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1, // ems
            x = text.attr('x'),
            y = text.attr('y'),
            dy = 0, // parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append('tspan')
                        .attr('x', x)
                        .attr('y', y)
                        .attr('dy', dy + 'em')
        // eslint-disable-next-line
        while (word = words.pop()) {
            line.push(word)
            tspan.text(line.join(' '))
            if (tspan.node().getComputedTextLength() > width) {
                line.pop()
                tspan.text(line.join(' '))
                line = [word]
                tspan = text.append('tspan')
                            .attr('x', x)
                            .attr('y', y)
                            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                            .text(word)
            }
        }
    })
}

function forceInitialize (graphData) {
    d3.selectAll('svg > *').remove()
    let zoom = d3.zoom().on('zoom', zoomed)
    diagramLayout = d3.select('svg')
      .attr('id', 'diagramLayout') // set id
      .attr('width', width) // set width
      .attr('height', height) // set height
      .call(zoom)
      .attr('display', 'block')
      .append('g')
      .attr('transform', 'translate(' + 20 + ',' + 20 + ')')

    function zoomed () {
        console.log('zooming action', zoom)
        console.log('zooming action', d3.event.transform)
        diagramLayout.attr('transform', d3.event.transform)
    }

    simulation = d3.forceSimulation()
    simulation.force('link', d3.forceLink().id(function (d) {
        return d.id
      }).distance(100).strength(0))
      .force('charge', d3.forceManyBody().distanceMin(10).distanceMax(30))
      // .force('centre', d3.forceCenter(width / 2, height / 2))
      // .force("x", d3.forceX(55))
      // .force("y", d3.forceY(45))
      .force('collide', d3.forceCollide().radius(function (d) {
        return 50
      }).iterations(2))
    simulation.on('end', function () {
      simulation.force('link', d3.forceLink().id(function (d) {
          return d.id
        }).distance(10).strength(0.0).iterations(10))
        .force('x', d3.forceX().strength(0))
        .force('y', d3.forceX().strength(0))
    })

    force(graphData)
}

// Force Layout
function force (graphData) {
    var linkEnter = diagramLayout.selectAll('.links')
    linkEnter = linkEnter.data(graphData.links)
      .enter().append('g')
      .attr('class', 'links')

    linkEnter.append('title').text(function (d) { return d.label })
    var link = diagramLayout.selectAll('.edgepath')
        .data(graphData.links)
        .enter()
        .append('path')
        .attr('class', 'edgepath')
        .attr('fill-opacity', 0)
        // .attr('stroke-opacity', 0.6)
        .attr('stroke', '#000')
        .attr('stroke-width', function (d) { return d.strokeWidth })
        .attr('id', function (d, i) { return 'edgepath' + i })
        // .style('pointer-events', 'none')

        var edgelabels = diagramLayout.selectAll('.edgelabel')
            .data(graphData.links)
            .enter()
            .append('text')
            .style('pointer-events', 'none')
            .attr('class', 'edgelabel')
            .attr('id', function (d, i) { return 'edgelabel' + i })
            .attr('font-size', function (d) { return d.fontSize })
            .attr('font-family', function (d) { return d.fontFamily })
            .attr('fill', '#000')

        edgelabels.append('textPath')
            .attr('xlink:href', function (d, i) { return '#edgepath' + i })
            .style('text-anchor', 'middle')
            .style('pointer-events', 'none')
            .attr('startOffset', '50%')
            .text(function (d) { return d.type })

    graphData.links.forEach(function (d) {
      if (d.direction === 'input') {
        diagramLayout.append('svg:defs').selectAll('marker') //
          .data(['start']) // Different link/path types can be defined here
          .enter().append('svg:marker') // This section adds in the arrows
          .attr('id', String)
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', 0)
          .attr('refY', 0)
          .attr('markerWidth', 10)
          .attr('markerHeight', 10)
          .attr('orient', 'auto')
          .attr('stroke', '#000')
          .attr('fill', '#000')
          .append('svg:path')
          .attr('d', 'M0,-5L10,0L0,5')
          .style('stroke-width', '0.1px')
          .attr('transform', 'rotate(180,5, 0)')
      } else if (d.direction === 'output') {
        diagramLayout.append('svg:defs').selectAll('marker') //
          .data(['end']) // Different link/path types can be defined here
          .enter().append('svg:marker') // This section adds in the arrows
          .attr('id', String)
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', 9)
          .attr('refY', 0)
          .attr('markerWidth', 10)
          .attr('markerHeight', 10)
          .attr('orient', 'auto')
          .attr('stroke', '#000')
          .attr('fill', '#000')
          .append('svg:path')
          .attr('d', 'M0,-5L10,0L0,5')
          .style('stroke-width', '0.1px')
      }
    })

    link.attr('marker-end', function (d) {
      if (d.direction === 'input') { return '' } else { return 'url(#end)' }
    })

    link.attr('marker-start', function (d) {
      if (d.direction === 'input') { return 'url(#start)' } else { return '' }
    })

    var node = diagramLayout.selectAll('.node')
    node = node.data(graphData.nodes)

    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')

    nodeEnter.append('rect')
      .attr('x', -20)
      .attr('y', -20)
      .attr('rx', 5)
      .attr('width', function (node, i) { return node.width })
      .attr('height', function (node, i) { return node.height })
      .attr('stroke-width', function (node, i) { return node.strokeWidth })
      //  .attr('stroke-opacity', '0.3')
      .attr('stroke', '#000000')
      .attr('fill', '#FFFFFF')
      // .attr('word-wrap', 'break-word')
      // .style('fill', function (d, i) { return colors(i) })
    nodeEnter.append('image')
      .attr('xlink:href', function (d) { return d.icon })
      .attr('x', '-18')
      .attr('y', '-18')
    //   .attr('width', '24px')
    //   .attr('height', '24px')

    nodeEnter.append('title')
      // .attr('word-wrap', 'break-word')
      .text(function (d) { return d.title })

    nodeEnter.append('text')
        .attr('x', function (node, i) { return ((node.width / 2) - 20) })
        .attr('y', function (node, i) { return ((node.height / 2) - 20) })
        .attr('dy', function (node, i) { return node.dy })
        .attr('text-anchor', function (node, i) { return node.textAnchor })
        .attr('font-size', function (node, i) { return node.fontSize })
        .attr('font-family', function (node, i) { return node.fontFamily })
        .text(function (d) { return d.name })
        .call(wrap, 100)
    // nodeIcon.call(d3.drag()
    //   .on("start", dragstarted)
    //   .on("drag", dragged)
    //   .on("end", dragended));

    simulation
      .nodes(graphData.nodes)
      .on('tick', ticked)

    // setTimeout(function tick() {
    //   simulation.tick();
    //   if (simulation.alpha() >= .005);
    //   setTimeout(tick, 0);
    // }, 0);

    simulation.force('link')
      .links(graphData.links)
    simulation.restart()

    function ticked (e) {
      link.attr('d', function (d) {
        var inter = pointOnRect(d.source.x, d.source.y,
          d.target.x - 20, d.target.y - 20,
          d.target.x + 20, d.target.y + 20)

        return 'M' + d.source.x + ',' + d.source.y + 'L' + inter.x + ',' + inter.y
      })

      nodeEnter.attr('transform', function (d) {
        d.fixed = true
        return 'translate(' + d.x + ',' + d.y + ')'
      })
    }
    // function dragstarted (d) {
    //   if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    //   d.fx = d.x
    //   d.fy = d.y
    // }

    // function dragged (d) {
    //   d.fx = d3.event.x
    //   d.fy = d3.event.y
    // }

    // function dragended (d) {
    //   d3.select(this).classed('fixed', d.fixed = false)
    //   d3.selectAll('.node').fixed = true
    // }

    /**
     * Finds the intersection point between
     *     * the rectangle
     *       with parallel sides to the x and y axes
     *     * the half-line pointing towards (x,y)
     *       originating from the middle of the rectangle
     *
     * Note: the function works given min[XY] <= max[XY],
     *       even though minY may not be the "top" of the rectangle
     *       because the coordinate system is flipped.
     *
     * @param (x,y):Number point to build the line segment from
     * @param minX:Number the "left" side of the rectangle
     * @param minY:Number the "top" side of the rectangle
     * @param maxX:Number the "right" side of the rectangle
     * @param maxY:Number the "bottom" side of the rectangle
     * @param check:boolean (optional) whether to treat point inside the rect as error
     * @return an object with x and y members for the intersection
     * @throws if check == true and (x,y) is inside the rectangle
     * @author TWiStErRob
     * @see <a href="https://stackoverflow.com/a/31254199/253468">source</a>
     * @see <a href="https://stackoverflow.com/a/18292964/253468">based on</a>
     */
    function pointOnRect (x, y, minX, minY, maxX, maxY, check) {
      // assert minX <= maxX;
      // assert minY <= maxY;
      if (check && (minX <= x && x <= maxX) && (minY <= y && y <= maxY)) { throw new Error('Point ' + [x, y] + 'cannot be inside ' + 'the rectangle: ' + [minX, minY] + ' - ' + [maxX, maxY] + '.') }
      var midX = (minX + maxX) / 2
      var midY = (minY + maxY) / 2
      // if (midX - x == 0) -> m == ±Inf -> minYx/maxYx == x (because value / ±Inf = ±0)
      var m = (midY - y) / (midX - x)

      if (x <= midX) { // check "left" side
        var minXy = m * (minX - x) + y
        if (minY <= minXy && minXy <= maxY) {
        return {
                    x: minX,
                    y: minXy
                }
        }
      }

      if (x >= midX) { // check "right" side
        var maxXy = m * (maxX - x) + y
        if (minY <= maxXy && maxXy <= maxY) {
        return {
                    x: maxX,
                    y: maxXy
                }
        }
      }

      if (y <= midY) { // check "top" side
        var minYx = (minY - y) / m + x
        if (minX <= minYx && minYx <= maxX) {
        return {
                    x: minYx,
                    y: minY
                }
        }
      }

      if (y >= midY) { // check "bottom" side
        var maxYx = (maxY - y) / m + x
        if (minX <= maxYx && maxYx <= maxX) {
        return {
                    x: maxYx,
                    y: maxY
                }
        }
      }

      // Should never happen :) If it does, please tell me!
      throw new Error('Cannot find intersection for ' + [x, y] + ' inside rectangle ' + [minX, minY] + ' - ' + [maxX, maxY] + '.')
    }
}

class DataModelComponent extends React.Component {
    construct (props) {}
    componentWillMount () {
        console.log('component will mount Component 666 model', this.props)
    }
    componentDidMount () {
        console.log('component did mount Component 666 model', this.props)
    }
    componentWillReceiveProps (nextProps) {
      console.log('Component Model ---------->>', nextProps)
        if (Object.keys(nextProps.startNode).length > 0 && nextProps.startNode.constructor === Object) {
            if (nextProps.relationships && nextProps.relationships !== this.props.relationships) {
                console.log('inside if component model')
                let nodeData = nextProps.relationships
                let leftCordinates = []
                let rightCordinates = []
                let rightColumn = 0
                let leftColumn = 0
                let topCordinates = []
                let downCordinates = []
                var linkArray = []
                var nodeArray = []
                let node = {}
                let graphData = {}
                // Setting first node
                node.id = 0
                node.wrapSize = 150
                node.name = nextProps.startNode.name.trim() || ''
                node.Title = nextProps.startNode.title.trim() || ''
                node.icon = nextProps.startNode.icon ? api.iconURL + nextProps.startNode.icon : ''
                node.width = 150
                node.height = 70
                node.x = 400
                node.y = 450
                node.Attributes = ['']
                node.strokeWidth = 4
                node.textAnchor = 'middle'
                node.fontSize = 12
                node.fontWeight = 900
                node.fontFamily = 'sans-serif'
                node.dy = '0.25em'
                nodeArray.push(node)
                // end
                if (nodeData.length > 0) {
                    nodeData.forEach(function (data, index) {
                        console.log('node data', data)
                        index++
                        node = {}
                        node.id = index
                        node.wrapSize = 90
                        node.name = data.target_component.name
                        node.Title = data.target_component.name
                        node.Attributes = ['']
                        node.width = 90
                        node.height = 45
                        node.strokeWidth = 3
                        node.textAnchor = 'middle'
                        node.fontSize = 10
                        node.fontWeight = 500
                        node.fontFamily = 'sans-serif'
                        node.dy = '0.25em'
                        if (data.target_component.icon === null) {
                            node.icon = api.iconURL + data.target_component.component_type.icon
                        } else {
                            node.icon = api.iconURL + data.target_component.icon
                        }
                        if (data.relationship_type === 'Parent') {
                            let topLength = topCordinates.length
                            if (topLength < 1) {
                            let cor = {
                                x: 200,
                                y: 10
                                }
                            topCordinates.push(cor)
                            node.x = cor.x
                            node.y = cor.y
                            } else {
                                let prevCor = topCordinates[topLength - 1]
                                if (typeof prevCor !== 'undefined') {
                                    let cor = {
                                        x: prevCor.x + 200,
                                        y: 10
                                        }
                                    topCordinates.push(cor)
                                    node.x = cor.x
                                    node.y = cor.y
                                }
                            }
                        } else if (data.relationship_type === 'Child') {
                            let downLength = downCordinates.length
                            if (downLength < 1) {
                            let cor = {
                                x: 200,
                                y: 900
                                }
                            downCordinates.push(cor)
                            node.x = cor.x
                            node.y = cor.y
                            } else {
                                let prevCor = downCordinates[downLength - 1]
                                if (typeof prevCor !== 'undefined') {
                                    let cor = {
                                        x: prevCor.x + 200,
                                        y: 900
                                        }
                                    downCordinates.push(cor)
                                    node.x = cor.x
                                    node.y = cor.y
                                }
                            }
                        } else if (data.relationship_type === 'ConnectTo') {
                            // Left Side Cordinates
                            let leftLength = leftCordinates.length
                            if (leftLength < 1) {
                                let cor = {
                                    x: 10 - (leftColumn * 150),
                                    y: 300
                                    }
                                leftCordinates.push(cor)
                                node.x = cor.x
                                node.y = cor.y
                            } else {
                                leftColumn = Math.floor(leftLength / 5)
                                let prevCor = leftCordinates[leftLength - 1]
                                if (typeof prevCor !== 'undefined') {
                                    let cor = {
                                        x: 10 - (leftColumn * 150),
                                        y: (prevCor.y + 100 < 800) ? prevCor.y + 100 : 300
                                        }
                                    leftCordinates.push(cor)
                                    node.x = cor.x
                                    node.y = cor.y
                                }
                            }
                        } else if (data.relationship_type === 'ConnectFrom') {  // Right
                            // Right Side Cordinates
                            let rightLength = rightCordinates.length
                            if (rightLength < 1) {
                                let cor = {
                                    x: 800 + (rightColumn * 150),
                                    y: 300
                                    }
                                rightCordinates.push(cor)
                                node.x = cor.x
                                node.y = cor.y
                            } else {
                                rightColumn = Math.floor(rightLength / 5)
                                let prevCor = rightCordinates[rightLength - 1]
                                if (typeof prevCor !== 'undefined') {
                                    let cor = {
                                        x: 800 + (rightColumn * 120),
                                        y: (prevCor.y + 100 < 800) ? prevCor.y + 100 : 300
                                    }
                                    rightCordinates.push(cor)
                                    node.x = cor.x
                                    node.y = cor.y
                                }
                            }
                        }
                        nodeArray.push(node)
                        var link = {}
                        link.direction = 'output'
                        link.strokeWidth = 1.2
                        link.fontFamily = 'sans-serif'
                        link.fontSize = 12
                        if (data.relationship_type === 'Parent') {  // down
                            link.type = 'Is Child Of'
                            link.source = 0
                            link.target = index
                            link.direction = 'output'
                        } else if (data.relationship_type === 'Child') {  // up
                            link.type = 'Is Parent Of'
                            link.source = 0
                            link.target = index
                            link.direction = 'output'
                        } else if (data.relationship_type === 'ConnectTo') {  // Left
                            link.type = data.connection.name || 'empty'
                            link.source = index
                            link.target = 0
                        } else if (data.relationship_type === 'ConnectFrom') {  // Right
                            link.type = data.connection.name || 'empty'
                            link.source = 0
                            link.target = index
                        }
                        linkArray.push(link)
                        if (index === nodeData.length) {
                            console.log('linkArray', linkArray)
                            console.log('nodeArray', nodeArray)
                            graphData.nodes = nodeArray
                            graphData.links = linkArray
                            console.log('------------------', JSON.stringify(graphData))
                            forceInitialize(graphData)
                        }
                    })
                } else {
                    graphData.nodes = nodeArray
                    graphData.links = []
                    console.log('------------------else', JSON.stringify(graphData))
                    forceInitialize(graphData)
                    this.forceUpdate()
                }
            }
        }
    }
    render () {
        return (
          <div id='mainScreen1' >
            <svg id='diagramLayout1' />
          </div>
          )
    }

    // props: {
    //     relationships: any,
    //     startNode: any
    // }
}
export default DataModelComponent
DataModelComponent.propTypes = {
    relationships: PropTypes.any,
    startNode: PropTypes.any
}
