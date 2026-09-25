export type MapFragmentDefinition = {
  id: string
  label: string
  startPosition: {
    x: number
    y: number
  }
  startRotation: number
  correctRotation: number
}

export const mapFragmentDefinitions: MapFragmentDefinition[] = [
  {
    id: 'fragment-1',
    label: 'Western Ridge',

    startPosition: {
      x: 80,
      y: 80,
    },

    startRotation: 0,
    correctRotation: 0,
  },
]