/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
export function draw (data, color) {
  // TODO : Generate the legend in the div with class "legend". Each SVG rectangle
  // should have a width and height set to 15.
  // Tip : Append one div per legend element using class "legend-element".

  const container = d3.select('.legend')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'legend-element')

  container
    .append('svg')
    .attr('height', 15)
    .attr('width', 15)
    .append('rect')
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', d => color(d))

  container
    .append('div')
    .attr('class', 'legend-text')
    .text(d => d)
}
