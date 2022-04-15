import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  DirectionsResult,
  GoogleMapsMap,
  LatLng,
  LatLngLiteral,
  MapMouseEvent,
  MapOptions,
} from 'types/googleMaps'
import styles from './styles.module.scss'

interface MapProps extends MapOptions {
  center: LatLng | LatLngLiteral | null
  zoom: number | null
  onClick?: (e: MapMouseEvent) => void
  onIdle?: (map: GoogleMapsMap) => void
  children: ReactNode
  directions: DirectionsResult | undefined
}

export const Map = ({
  center,
  zoom,
  onClick,
  onIdle,
  children,
  directions,
  ...options
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<GoogleMapsMap>()

  const directionsRenderer = useMemo(
    () => new google.maps.DirectionsRenderer(),
    []
  )

  useEffect(() => {
    if (ref.current && !map) {
      console.log('SET MAP', map)

      setMap(
        new window.google.maps.Map(ref.current, { center, zoom, ...options })
      )
    }
  }, [ref, map, center, zoom, options])

  useEffect(() => {
    if (directions) {
      console.log('SET Directions', directions)

      directionsRenderer.setMap(map!)
      directionsRenderer.setDirections(directions)
    }
  }, [directionsRenderer, directions, map])

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  // useDeepCompareEffectForMaps(() => {
  //   if (map) {
  //     map.setOptions(options)
  //   }
  // }, [map, options])

  useEffect(() => {
    if (map) {
      ;['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      )

      if (onClick) {
        map.addListener('click', onClick)
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map))
      }
    }
  }, [map, onClick, onIdle])

  return (
    <>
      <div ref={ref} className={styles.map} />

      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map })
        }
      })}
    </>
  )
}
