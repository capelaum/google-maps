import { DirectionsResult, LatLngLiteral } from 'types/googleMaps'

export const generateHouses = (position: LatLngLiteral, amount = 100) => {
  const _houses: Array<LatLngLiteral> = []

  for (let i = 0; i < amount; i++) {
    const direction = Math.random() < 0.5 ? -40 : 40

    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    })
  }

  return _houses
}

export const fetchDirections = async (
  origin: LatLngLiteral,
  destination: LatLngLiteral
): Promise<DirectionsResult | undefined> => {
  if (!location) return

  const service = new google.maps.DirectionsService()

  const directionsResult = await service.route(
    {
      origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        return result
      }
    }
  )

  return directionsResult
}
