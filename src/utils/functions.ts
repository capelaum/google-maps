import { LatLngLiteral } from 'types/googleMaps'

export const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = []

  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -20 : 20

    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    })
  }

  return _houses
}
