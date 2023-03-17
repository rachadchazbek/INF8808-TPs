import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  // TODO : Draw the legend using d3Legend
  // For help, see : https://d3-legend.susielu.com/
  const legend = d3Legend.legendColor()
    .shape('circle')
    .scale(colorScale)

  g.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width + 10}, 0)`)
    .call(legend)
}
