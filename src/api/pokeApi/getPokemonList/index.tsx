import { pokeApi } from "../pokeApi"
import { PokemonListResponseInterface } from "./PokemonListResponseInterface"

export function getPokemonList(perPage: number = 10, page: number = 1): Promise<PokemonListResponseInterface> {
  const params = {
    limit: perPage,
    offset: page-1,
  }

  return pokeApi.get<PokemonListResponseInterface>('/pokemon', { data: params })
    .then(({ data }) => data)
}