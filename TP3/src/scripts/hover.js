/**
 * Sets up an event handler for when the mouse enters and leaves the squares
 * in the heatmap. When the square is hovered, it enters the "selected" state.
 *
 * The tick labels for the year and neighborhood corresponding to the square appear
 * in bold.
 *
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 */
export function setRectHandler (xScale, yScale, rectSelected, rectUnselected, selectTicks, unselectTicks) {
  d3.selectAll('.tile')
    .on('mouseover', function (mouseEvent, data) {
      rectSelected(this, xScale, yScale)
      selectTicks(data.Arrond_Nom, data.Plantation_Year)
    })
    .on('mouseout', function () {
      rectUnselected(this)
      unselectTicks()
    })
}

/**
 * The function to be called when one or many rectangles are in "selected" state,
 * meaning they are being hovered
 *
 * The text representing the number of trees associated to the rectangle
 * is displayed in the center of the rectangle and their opacity is lowered to 75%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 */
export function rectSelected (element, xScale, yScale) {
  d3.select(element.parentNode).append('text').text((d) => d.Comptes)
    .attr('x', data => xScale(data.Plantation_Year))
    .attr('y', data => yScale(data.Arrond_Nom))
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .attr('transform', 'translate(' + element.attributes.width.value * 0.5 + ', ' + element.attributes.height.value * 3 / 4 + ')')
    .attr('pointer-events', 'none')
    .attr('text-anchor', 'middle')
    .attr('fill', (d) => {
      if (d.Comptes > 1000) return 'white'
      else return 'black'
    })
}

/**
 * The function to be called when the rectangle or group
 * of rectangles is no longer in "selected state".
 *
 * The text indicating the number of trees is removed and
 * the opacity returns to 100%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 */
export function rectUnselected (element) {
  d3.select(element.parentNode).select('text').remove()
}

/**
 * Makes the font weight of the ticks texts with the given name and year bold.
 *
 * @param {string} name The name of the neighborhood associated with the tick text to make bold
 * @param {number} year The year associated with the tick text to make bold
 */
export function selectTicks (name, year) {
  d3.select('.xaxis').selectAll('.tick text').filter((d) => d === year).attr('font-weight', 'bold')
  d3.select('.yaxis').selectAll('.tick text').filter((d) => d === name).attr('font-weight', 'bold')
}

/**
 * Returns the font weight of all ticks to normal.
 */
export function unselectTicks () {
  d3.select('.xaxis').selectAll('.tick text').attr('font-weight', 'normal')
  d3.select('.yaxis').selectAll('.tick text').attr('font-weight', 'normal')
}
