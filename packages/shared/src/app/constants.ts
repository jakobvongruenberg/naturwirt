import { land_info } from './land_info'

export const DEFAULT_LANGUAGE = 'de'

export const SIDEBAR_WIDTH_PX = 300
export const HEADER_HEIGHT_DESKTOP_PX = 80
export const HEADER_HEIGHT_MOBILE_PX = 48

export const SEARCH_QUERY_PARAM = 'search'

export const SUPPLEMENTS_HEADER_ID = 'supplements'
export const SUGGEST_UPDATES_EMAIL = 'info@naturwirt.org'

export const MEASURE_ID_PREFIX = 'measure-'

export const routes = {
  root: {
    index: '/',
  },
  admin: {
    // requires admind role
    index: '/admin',
    measures: '/admin/measures',
    user: '/admin/users',
    createMeasure: '/admin/measures/create',
    editMeasure: (id: number) => `/admin/measures/edit/${id}`,
  },
  main: {
    // Public
    index: '/main',
    browse: '/main/browse',
    browseIdentifier: (identifier: string) =>
      `/main/browse/${MEASURE_ID_PREFIX}${encodeURIComponent(identifier)}`,
    privacy: '/main/legal/privacy-policy', //TODO: implement
    terms: '/main/legal/terms-of-service', //TODO: implement

    // private
    measures: '/main/measures', // Requires sign in
    planner: '/main/planner', // not yet implemented
    onboarding: '/main/onboarding', // requires sign in
    profile: {
      farm: (id: number) => `/main/profile/farm/${id}`,
      index: '/main/profile',
      details: '/main/profile/profile-details',
      notifications: '/main/profile/notifications',
    },
  },
  auth: {
    signin: '/main', // sign in on the home page
    signout: '/api/auth/signout',
    resetPassword: '/main/reset-password',
    forgotPassword: '/main/forgot-password',
  },
} as const

export enum BreakPoints {
  LG = 1024,
}
const onlyUnique = <T>(value: T, index: number, self: T[]) => {
  return self.indexOf(value) === index
}

export const zip_code_to_land = land_info.reduce(
  (acc, land) => {
    acc[land.postcode.toString()] = land.land
    return acc
  },
  {} as Record<string, string>,
)

export const zip_code_to_kreis = land_info.reduce(
  (acc, land) => {
    acc[land.postcode.toString()] = land.kreis
    return acc
  },
  {} as Record<string, string>,
)

export const kreis_to_land = land_info.reduce(
  (acc, land) => {
    acc[land.kreis] = land.land
    return acc
  },
  {} as Record<string, string>,
)

export const location_to_kreis = (location: string) => {
  for (const place of land_info) {
    if (place.kreis === location || place.postcode === parseInt(location)) {
      return place.kreis
    }
  }
  return null
}

export const location_to_land = (location: string) => {
  for (const place of land_info) {
    if (
      place.land === location ||
      place.kreis === location ||
      place.postcode === parseInt(location)
    ) {
      return place.land
    }
  }
  return null
}

export const zip_codes = Object.keys(zip_code_to_land)

export const kreis = Object.keys(kreis_to_land)

export const land = land_info.map((land) => land.land).filter(onlyUnique)

export const zip_codes_and_kreis = [...zip_codes, ...kreis]

export const landOptions = [...land, ...kreis, ...zip_codes]
