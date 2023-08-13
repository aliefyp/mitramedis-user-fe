// Province
export interface ProvinceResponse {
  success: boolean
  message: string
  data: DataProvince
}

export interface DataProvince {
  province: Province[]
}

export interface Province {
  province_code: string
  province_name: string
}

// City
export interface CityResponse {
  success: boolean
  message: string
  data: DataCity
}

export interface DataCity {
  city: City[]
}

export interface City {
  city_code: string
  city_name: string
}

// District
export interface DistrictResponse {
  success: boolean
  message: string
  data: DataDistrict
}

export interface DataDistrict {
  district: District[]
}

export interface District {
  district_code: string
  district_name: string
}

// Village
export interface VillageResponse {
  success: boolean
  message: string
  data: DataVillage
}

export interface DataVillage {
  village: Village[]
}

export interface Village {
  village_code: string
  village_name: string
}