import '@reach/combobox/styles.css'
import { LatLngLiteral } from 'types/googleMaps'

type PlacesProps = {
  setOffice: (position: LatLngLiteral) => void
}

export default function Places({ setOffice }: PlacesProps) {
  return <div>Places</div>
}
