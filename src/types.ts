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
