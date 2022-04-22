import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import { useMap } from 'contexts/mapContext'
import { ChangeEvent } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { requestOptions } from 'utils/options'
import styles from './styles.module.scss'

export function Places() {
  const { setPlace, setClickedPos, setDirections, moveToCurrentLocation } =
    useMap()

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

    setClickedPos(position)
    setDirections(null)
    moveToCurrentLocation(position)
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const clearPlace = () => {
    setValue('')
    setPlace(null)
  }

  return (
    <Combobox onSelect={handleSelect}>
      <div className={styles.placesInputContainer}>
        <ComboboxInput
          value={value}
          disabled={!ready}
          onChange={handleInput}
          className={styles.comboboxInput}
          placeholder="Buscar localização"
        />
        <MdOutlineCancel color="#f231a5" onClick={clearPlace} />
      </div>
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
