/**
 * Builds the header for the webpage, including a title and welcome message.
 *
 */
export function updateHeader () {
  document.getElementsByTagName('header')[0].innerHTML = ''
  document.getElementsByTagName('header')[0].innerHTML = '<h1>TP1</h1><div>Bienvenue au cours INF8808 : Visualisation de données.</div>'
}

/**
 *   Generates random data to be displayed in the scatter plot.
 *   The data must be a 2 X m array of randomly generated (x, y) coordinates, with :
 *      - x : an integer in [1, 99],
 *      - y : an integer in [1, 99],
 *
 *   and where m is a random number in [1, 10]. Each coordinate is represented
 *   as an object with keys 'x' and 'y'. Each coordinate object is contained in the
 *   resulting array.
 *
 *   For example, the coordinates could be :
 *
 *             x  |  y
 *           ----------
 *             99 | 4
 *             27 | 89
 *             17 | 42
 *
 *   @returns {object[]} The generated data
 */
export function generateData () {
  const data = []
  const m = Math.floor(Math.random() * 10 + 1)

  for (let i = 1; i <= m; i++) {
    const element = { x: Math.floor(Math.random() * 98 + 1), y: Math.floor(Math.random() * 98 + 1) }
    data.push(element)
  }

  return data
}

/**
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @returns {number} The current number of circles displayed in the scatter plot.
 */
export function getDotCount (g) {
  if (g) return g.selectAll('.dot').size()
  return 0
}

/**
 * Updates the text in the info panel below the graph so it displays the current circle count,
 * with the number displayed in bold.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function updateInfoPanel (g) {
  document.getElementsByClassName('dot-count')[0].innerHTML = ''
  document.getElementsByClassName('dot-count')[0].innerHTML = getDotCount(g).toString()

  document.getElementsByClassName('dot-label')[0].innerHTML = ''
  getDotCount(g) === 1
    ? document.getElementsByClassName('dot-label')[0].innerHTML = ' point'
    : document.getElementsByClassName('dot-label')[0].innerHTML = ' points'
}

/**
 * Selects all the SVG circles and sets their visual appearance.
 * Sets their radius to 5 and their fill color to #07BEB8.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function styleCircles (g) {
  g.selectAll('.dot')
    .attr('fill', '#07BEB8')
    .attr('r', 5)
}
