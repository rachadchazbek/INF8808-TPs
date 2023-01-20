/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale (scale, data, width) {
  // Set the domain and range of the graph's x scale
  scale
    .domain(data.map(d => d.Act))
    .range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
  // Set the domain and range of the graph's y scale
  scale
    .domain([0, d3.max(data, d => d3.max(d.Players, d => d.Count))])
    .range([height, 0])
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups (data, x) {
  //  Create the groups
  const graph = d3.select('#graph-g')
  graph.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', d => `translate(${x(d.Act)}, 0)`)
    .append('g')
    .attr('transform', d => `translate(${x(d.Act)}, 1)`)
    .append('g')
    .attr('transform', d => `translate(${x(d.Act)}, 2)`)
    .append('g')
    .attr('transform', d => `translate(${x(d.Act)}, 3)`)
    .append('g')
    .attr('transform', d => `translate(${x(d.Act)}, 4)`)
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 * @param data
 */
export function drawBars (y, xSubgroup, players, height, color, tip, data) {
  // TODO : Draw the bar
  d3.select('#graph-g')
    .selectAll('g')
    .data(data.map(data => players.map(player => ({ player, value: data.Players[player] }))))
    .enter()
    .append('rect')
    .attr('x', d => xSubgroup(d.Player))
    .attr('y', d => y(d.Count))
    .attr('width', xSubgroup.bandwidth())
    .attr('height', d => height - y(d.Count))
    .attr('fill', d => color(d.Player))
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}
