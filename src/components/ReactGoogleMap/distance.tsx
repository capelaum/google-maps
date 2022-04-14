import { DirectionsLeg } from 'types/googleMaps'

const commutesPerYear = 260 * 2
const litresPerKM = 10 / 100
const gasLitreCost = 1.5
const litreCostKM = litresPerKM * gasLitreCost
const secondsPerDay = 60 * 60 * 24

type DistanceProps = {
  leg: DirectionsLeg
}

export default function Distance({ leg }: DistanceProps) {
  return <div>Distance</div>
}
