/**
 * Sets the domain of the color scale. Each type of site should have its own corresponding color.
 *
 * @param {*} color The color scale to be used
 * @param {object[]} data The data to be displayed
 */
export function colorDomain (color, data) {
  data.features.forEach((feature) => {
    color.domain(feature.properties.TYPE_SITE_INTERVENTION)
  })
}

/**
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
export function mapBackground (data, path, showMapLabel) {
  d3.selectAll('#map-g')
    .data(data.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', '#ccc')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1)
    .on('mouseover', showMapLabel)
    .on('mouseout', () => {
      d3.select('map-g').style('visibility', 'hidden')
    })
}

/**
 * When a neighborhood is hovered, displays its name. The center of its
 * name is positioned at the centroid of the shape representing the neighborhood
 * on the map. Called when the neighborhood is hovered.
 *
 * @param {object[]} d The data to be displayed
 * @param {*} path The path used to draw the map elements
 */
export function showMapLabel (d, path) {
  // TODO : Show the map label at the center of the neighborhood
  // by calculating the centroid for its polygon
  d3.selectAll('#map-g')
    .append('text')
    .attr('id', 'map-g')
    .attr('x', d => path.centroid(d)[0])
    .attr('y', d => path.centroid(d)[1])
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .attr('font-family', 'Open Sans Condensed')
    .attr('fill', '#000')
    .text(d.properties.NOM)
}

/**
 * Displays the markers for each street on the map.
 *
 * @param {object[]} data The street data to be displayed
 * @param {*} color The color scaled used to determine the color of the circles
 * @param {*} panel The display panel, which should be dislayed when a circle is clicked
 */
export function mapMarkers (data, color, panel) {
  // TODO : Display the map markers.
  // Their color corresponds to the type of site and their outline is white.
  // Their radius is 5 and goes up to 6 while hovered by the cursor.
  // When clicked, the panel is displayed.
  d3.selectAll('#map-g')
    .data(data.features)
    .enter()
    .append('circle')
    .attr('cx', d => d.geometry.coordinates[0])
    .attr('cy', d => d.geometry.coordinates[1])
    .attr('r', 5)
    .attr('fill', d => color(d.properties.TYPE_SITE_INTERVENTION))
    .attr('stroke', '#fff')
    .attr('stroke-width', 1)
    .on('mouseover', () => {
      d3.select(this)
        .attr('r', 6)
    })
    .on('mouseout', () => {
      d3.select(this)
        .attr('r', 5)
    })
    .on('click', () => {
      panel.style('visibility', 'visible')
    })
}
