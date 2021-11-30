export interface IMedal {
  country: string;
  total: number;
}

export interface IGpd {
  country: string;
  gpd: number;
}

export interface IPopulation {
  country: string;
  population: number;
}

export interface IGpdByPopulation {
  country: string;
  gpdByPopulation: number;
}

export interface IMedalsAndBudjet {
  country: string;
  medals: number;
  budjet: number;
}

export interface IAthletesByContinent {
  continent: string;
  nbAthlete: number;
}

export interface IGpdsContinentsRaw {
  year: number;
  continent: string;
  gpd: number;
}

export interface IYearGpd {
  year: number;
  gpd: number;
}

export interface IGpdsContinent {
  continent: string;
  values: IYearGpd[];
}
