import axios from 'axios'
import { MarkerType } from 'types/googleMaps'

const PLACE_RADIUS = 25000
const TYPE = 'school'
const LANGUAGE = 'br'

const options = {
  params: {
    language: LANGUAGE,
    radius: PLACE_RADIUS,
    type: TYPE,
  },
  headers: {
    'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
  },
}

export const fetchNearbyPlaces = async (
  latitude: number,
  longitude: number
): Promise<MarkerType[] | null> => {
  const { data } = await axios.get(
    'https://trueway-places.p.rapidapi.com/FindPlacesNearby',
    {
      ...options,
      params: {
        ...options.params,
        location: `${latitude},${longitude}`,
      },
    }
  )

  return data.results
}
