import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  DirectionsResult,
  GoogleMapsMap,
  LatLngLiteral,
  MapMouseEvent,
  MapOptions,
  MarkerType,
} from 'types/googleMaps'
import { defaultCenter, mapOptions } from 'utils/options'

interface MapProviderProps {
  children: ReactNode
}

interface MapContextData {
  center: LatLngLiteral
  currentCenter: LatLngLiteral
  zoom: number
  place: string | null
  options: MapOptions
  currentLocation: LatLngLiteral
  clickedPos: LatLngLiteral | null
  directions: DirectionsResult | null
  selectedMarker: MarkerType | null
  onIdle: () => void
  onUnmount: () => void
  clearLocation: () => void
  onMapLoad: (map: GoogleMapsMap) => void
  handleMapClick: (e: MapMouseEvent) => void
  moveToCurrentLocation: (position: LatLngLiteral) => void
  setDirections: (directions: DirectionsResult | null) => void
  setClickedPos: (position: LatLngLiteral | null) => void
  setSelectedMarker: (marker: MarkerType | null) => void
  setPlace: (place: string | null) => void
  setCenter: (position: LatLngLiteral) => void
}

const MapContext = createContext<MapContextData>({} as MapContextData)

export function MapProvider({ children }: MapProviderProps) {
  const [zoom, setZoom] = useState(14)
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter)
  const [directions, setDirections] = useState<DirectionsResult | null>(null)
  const [clickedPos, setClickedPos] = useState<LatLngLiteral | null>(null)
  const [place, setPlace] = useState<string | null>(null)
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null)
  const [currentLocation, setCurrentLocation] =
    useState<LatLngLiteral>(defaultCenter)
  const [currentCenter, setCurrentCenter] =
    useState<LatLngLiteral>(defaultCenter)

  const mapRef = useRef<GoogleMapsMap>()

  const options = useMemo<MapOptions>(() => mapOptions, [])

  const handleMapClick = ({ latLng }: MapMouseEvent) => {
    const clickedPos = { lat: latLng!.lat(), lng: latLng!.lng() }

    setClickedPos(clickedPos)
    setCenter(clickedPos)
    setDirections(null)
    setPlace(null)
  }

  const clearLocation = useCallback(() => {
    setClickedPos(null)
    setDirections(null)
    setSelectedMarker(null)
    setPlace(null)
  }, [])

  const onIdle = useCallback(() => {
    // console.log('onIdle')

    setZoom(mapRef.current!.getZoom()!)
    setCurrentCenter(mapRef.current!.getCenter()!.toJSON())
  }, [])

  const onMapLoad = useCallback((map: GoogleMapsMap) => {
    mapRef.current = map

    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setCurrentLocation({ lat, lng })
        setCenter({ lat, lng })
      }
    )
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = undefined
  }, [])

  const moveToCurrentLocation = useCallback((position: LatLngLiteral) => {
    if (!mapRef.current) return

    mapRef.current.panTo({ lat: position.lat, lng: position.lng })
    mapRef.current.setZoom(14)
  }, [])

  return (
    <MapContext.Provider
      value={{
        center,
        currentCenter,
        zoom,
        place,
        options,
        currentLocation,
        clickedPos,
        directions,
        selectedMarker,
        onIdle,
        onMapLoad,
        onUnmount,
        moveToCurrentLocation,
        handleMapClick,
        clearLocation,
        setSelectedMarker,
        setClickedPos,
        setPlace,
        setCenter,
        setDirections,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export const useMap = (): MapContextData => useContext(MapContext)
