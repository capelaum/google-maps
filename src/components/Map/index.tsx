import GoogleMapReact, { Coords } from 'google-map-react'

interface MapProps {
  center?: Coords
  zoom?: number
}

export function Map({ center, zoom }: MapProps) {
  const defaultProps = {
    center: {
      lat: 42.3265,
      lng: -122.8756,
    },
    zoom: 6,
  }

  const centerCoords = center ?? defaultProps.center
  const zoomInitial = zoom ?? defaultProps.zoom

  // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        }}
        defaultCenter={centerCoords}
        defaultZoom={zoomInitial}
      ></GoogleMapReact>
    </div>
  )
}
