import { pokeApi } from "../pokeApi"
import { PokemonResponseInterface } from "./PokemonResponseInterface"

export function getPokemon(name: string): Promise<PokemonResponseInterface> {
  return pokeApi.get(`/pokemon/${name}`)
    .then(({ data }) => data)
}