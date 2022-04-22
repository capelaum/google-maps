import { GoogleMap, Marker } from '@react-google-maps/api'
import { useMap } from 'contexts/mapContext'
import { FiExternalLink } from 'react-icons/fi'
import { CurrentLocation } from './CurrentLocation'
import { Directions } from './Directions'
import { MarkerInfo, MarkerList } from './Marker'
import { Sidebar } from './Sidebar'
import styles from './styles.module.scss'

export default function Map() {
  const {
    center,
    zoom,
    options,
    currentLocation,
    clickedPos,
    directions,
    selectedMarker,
    onIdle,
    onMapLoad,
    onUnmount,
    handleMapClick,
  } = useMap()

  return (
    <div className={styles.container}>
      <Sidebar />

      <CurrentLocation />

      <GoogleMap
        zoom={zoom}
        center={center}
        options={options}
        onIdle={onIdle}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        mapContainerClassName={styles.mapContainer}
      >
        <Marker
          position={currentLocation}
          icon={{
            url: '/currentMarker.png',
            scaledSize: new window.google.maps.Size(20, 20),
          }}
        />

        {directions && <Directions />}

        {clickedPos && <Marker position={clickedPos} />}

        {clickedPos && <MarkerList />}

        {selectedMarker && (
          <MarkerInfo>
            <p>
              <strong>{selectedMarker.name}</strong>
            </p>
            <p>{selectedMarker.address}</p>
            {selectedMarker.website && (
              <p>
                <a
                  href={selectedMarker.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedMarker.website} <FiExternalLink size={12} />
                </a>
              </p>
            )}
          </MarkerInfo>
        )}
      </GoogleMap>
    </div>
  )
}
