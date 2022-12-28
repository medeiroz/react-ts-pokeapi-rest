import { pokeApi } from "../pokeApi"
import { PokemonListResponseInterface } from "./PokemonListResponseInterface"

export function getPokemonList(page: number = 1, perPage: number = 10): Promise<PokemonListResponseInterface> {
  const params = {
    limit: perPage,
    offset: page-1,
  }

  return pokeApi.get<PokemonListResponseInterface>('/pokemon', { params })
    .then(({ data }) => data)
}