import { create } from 'zustand'

export type MapFragmentState = {
  id: string
  x: number
  y: number
  rotation: number
  placed: boolean
  locked: boolean
}

type ExpeditionState = {
  mapFragments: MapFragmentState[]

  setMapFragments: (fragments: MapFragmentState[]) => void

  updateMapFragment: (
    id: string,
    updates: Partial<MapFragmentState>,
  ) => void

  resetMapFragments: () => void
}

const initialMapFragments: MapFragmentState[] = [
  {
    id: 'fragment-1',
    x: 80,
    y: 80,
    rotation: 0,
    placed: false,
    locked: false,
  },
]

export const useExpeditionStore = create<ExpeditionState>((set) => ({
  mapFragments: initialMapFragments,

  setMapFragments: (fragments) =>
    set({
      mapFragments: fragments,
    }),

  updateMapFragment: (id, updates) =>
    set((state) => ({
      mapFragments: state.mapFragments.map((fragment) =>
        fragment.id === id
          ? {
              ...fragment,
              ...updates,
            }
          : fragment,
      ),
    })),

  resetMapFragments: () =>
    set({
      mapFragments: initialMapFragments,
    }),
}))