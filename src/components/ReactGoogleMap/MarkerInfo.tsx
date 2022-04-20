import { OverlayView } from '@react-google-maps/api'
import { ReactNode } from 'react'
import { LatLngLiteral } from 'types/googleMaps'

interface MarkerInfoProps {
  position: LatLngLiteral
  description: string
  showOverlay: boolean
  children: ReactNode
}

export function MarkerInfo({
  position,
  description,
  showOverlay,
  children,
}: MarkerInfoProps) {
  return (
    <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE}>
      {children}
    </OverlayView>
  )
}
