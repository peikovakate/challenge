import { IntensityLevel, RestLevel } from './data'

export const getIntensity = (level: IntensityLevel) => {
  switch (level) {
    case 1:
      return 'Easy'
    case 2:
      return 'Intense'
    case 3:
      return 'Extreme'
  }
}

export const getRest = (level: RestLevel) => {
  switch (level) {
    case 1:
      return 'Depleted'
    case 2:
      return 'Ok'
    case 3:
      return 'Top fit'
  }
}
