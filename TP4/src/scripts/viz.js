/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {
  const OFFSET = 50

  g.select('.x.axis-text')
    .attr('x', width / 2)
    .attr('y', height + OFFSET)

  g.select('.y.axis-text')
    .attr('y', height / 2)
    .attr('x', -OFFSET)
}

/**
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param {*} colorScale The scale for the circles' color
 */
export function drawCircles (data, rScale, colorScale) {
  d3.select('#graph-g')
    .selectAll('.circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr('r', d => rScale(d.Population))
    .attr('fill', d => colorScale(d.Continent))
    .attr('fill-opacity', 0.7)
}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setCircleHoverHandler (tip) {
  // the tooltip should be above the circle
  d3.selectAll('.circle')
    .on('mouseover', function (_event, d) {
      d3.select(this)
        .attr('fill-opacity', 1)
      tip.show(d)
    }
    )
    .on('mouseout', function () {
      d3.select(this)
        .attr('fill-opacity', 0.7)
      tip.hide()
    }
    )
}

/**
 * Updates the position of the circles based on their bound data. The position
 * transitions gradually.
 *
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 * @param {number} transitionDuration The duration of the transition
 */
export function moveCircles (xScale, yScale, transitionDuration) {
  d3.selectAll('.circle')
    .transition()
    .duration(transitionDuration)
    .attr('cx', d => xScale(d.GDP))
    .attr('cy', d => yScale(d.CO2))
}

/**
 * Update the title of the graph.
 *
 * @param {number} year The currently displayed year
 */
export function setTitleText (year) {
  d3.select('.title')
    .text('Data for year : ' + year)
}
