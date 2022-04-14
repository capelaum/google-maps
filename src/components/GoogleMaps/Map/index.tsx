import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { GoogleMapsMap, MapMouseEvent, MapOptions } from 'types/googleMaps'
import { useDeepCompareEffectForMaps } from '../utils/deepCompare'
import styles from './styles.module.scss'

interface MapProps extends MapOptions {
  onClick?: (e: MapMouseEvent) => void
  onIdle?: (map: GoogleMapsMap) => void
  children: ReactNode
}

export const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<GoogleMapsMap>()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}))
    }
  }, [ref, map])

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options)
    }
  }, [map, options])

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
