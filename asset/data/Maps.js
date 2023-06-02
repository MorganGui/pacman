/** meanings
 * wall: 0,
 * point: 1,
 * playerSpawn: 2,
 * ghostSpawn: 3
 */
const maps = [
  {
    id: '0',
    name: 'classic',
    land: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 3, 3, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 1, 1, 0, 3, 4, 3, 0, 1, 1, 1, 1, 1, 1, 2, 0],
      [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 3, 3, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: '1',
    name: 'small',
    land: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0, 3, 3, 3, 3, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0, 3, 3, 3, 3, 0],
      [0, 1, 0, 1, 1, 1, 0, 1, 0, 3, 3, 3, 3, 0],
      [0, 1, 0, 2, 0, 1, 0, 1, 0, 3, 3, 3, 3, 0],
      [0, 1, 0, 0, 0, 1, 0, 1, 0, 3, 3, 3, 3, 0],
      [0, 1, 1, 1, 1, 1, 0, 1, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 3, 3, 3, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: '2',
    name: 'fast death 1',
    land: [
      [0, 0, 0, 0, 0],
      [0, 2, 1, 3, 0],
      [0, 0, 0, 0, 0]
    ]
  },
  {
    id: '3',
    name: 'fast death 2',
    land: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 3, 0],
      [0, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: '4',
    name: 'line',
    land: [
      [0, 0, 0],
      [0, 2, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0]
    ]
  },
  {
    id: '5',
    name: 'angle',
    land: [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 2, 3, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0]
    ]
  }
]

export default maps
