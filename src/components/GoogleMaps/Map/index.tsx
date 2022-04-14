import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
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
}

export const Map = ({
  center,
  zoom,
  onClick,
  onIdle,
  children,
  ...options
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<GoogleMapsMap>()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }))
    }
  }, [ref, map, center, zoom])

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
