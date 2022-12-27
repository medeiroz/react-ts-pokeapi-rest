interface StatInterface {
  name: string,
  percentage: number,
}

export interface PokemonDetailsProps {
  id: number,
  name: string,
  image: string,
  height: number,
  weight: number,
  stats: StatInterface[],
  types: string[],
  weaknesses: string[],
  abilities: string[],
}