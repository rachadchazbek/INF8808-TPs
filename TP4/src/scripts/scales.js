/**
 * Defines the scale to use for the circle markers' radius.
 *
 * The radius of the circle is linearly proportinal to the population of the given country.
 *
 * The radius is a value defined in the interval [5, 20].
 *
 * @param {object} data The data to be displayed
 * @returns {*} The linear scale used to determine the radius
 */
export function setRadiusScale (data) {
  data = Object.values(data).flatMap(year => year)
  return d3.scaleLinear().domain([d3.min(data, d => d.Population), d3.max(data, d => d.Population)]).range([5, 20])
}

/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeSet1.
 *
 * @param {object} data The data to be displayed
 * @returns {*} The ordinal scale used to determine the color
 */
export function setColorScale (data) {
  data = Object.values(data).flatMap(year => year)
  return d3.scaleOrdinal().domain(data.map(d => d.Continent)).range(d3.schemeSet1)
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, data) {
  data = Object.values(data).flatMap(year => year)
  return d3.scaleLog().domain([d3.min(data, d => d.GDP), d3.max(data, d => d.GDP)]).range([0, width])
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  data = Object.values(data).flatMap(year => year)
  console.log(data)
  return d3.scaleLog().domain([d3.min(data, d => d.CO2), d3.max(data, d => d.CO2)]).range([height, 0])
}
