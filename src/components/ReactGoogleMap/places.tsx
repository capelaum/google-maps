import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import { Location } from 'types/googleMaps'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import styles from './styles.module.scss'

type PlacesProps = {
  setLocation: (location: Location) => void
}

export default function Places({ setLocation }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (address: string) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])

    setLocation({ position: { lat, lng }, description: address })
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className={styles.comboboxInput}
        placeholder="Search office address"
      />
      <ComboboxPopover>
        <ComboboxList className={styles.comboboxList}>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className={styles.comboboxOption}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}
