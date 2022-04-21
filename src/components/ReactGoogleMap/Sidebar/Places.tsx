import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import { ChangeEvent } from 'react'
import { LatLngLiteral } from 'types/googleMaps'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { defaultCenter } from 'utils/options'
import styles from './styles.module.scss'

type PlacesProps = {
  handleSetClickedPos: (pos: LatLngLiteral) => void
  setPlace: (place: string) => void
}

export function Places({ handleSetClickedPos, setPlace }: PlacesProps) {
  const defaultBounds = {
    north: defaultCenter.lat + 0.1,
    south: defaultCenter.lat - 0.1,
    east: defaultCenter.lng + 0.1,
    west: defaultCenter.lng - 0.1,
  }

  const requestOptions = {
    types: ['university', 'school'],
    componentRestrictions: { country: 'br' },
    bounds: defaultBounds,
    fields: ['address_components', 'geometry', 'icon', 'name'],
  }

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions,
  })

  const handleSelect = async (address: string) => {
    setValue(address, false)
    setPlace(address)

    clearSuggestions()

    const results = await getGeocode({ address })
    const position = await getLatLng(results[0])

    handleSetClickedPos(position)
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        disabled={!ready}
        onChange={handleInput}
        className={styles.comboboxInput}
        placeholder="Buscar localização"
      />
      <ComboboxPopover>
        <ComboboxList className={styles.comboboxList}>
          {status === 'OK' &&
            data.map(
              ({
                place_id,
                description,
                structured_formatting: { main_text, secondary_text },
              }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                  className={styles.comboboxOption}
                >
                  <strong>{main_text}</strong> <small>{secondary_text}</small>
                </ComboboxOption>
              )
            )}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}
