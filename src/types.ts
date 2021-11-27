export interface IMedal {
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  none: number;
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

export interface IGpdEurope {
  year: number;
  country: string;
  gpd: number;
}
