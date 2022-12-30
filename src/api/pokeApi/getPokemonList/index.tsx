import { PokemonResponseInterface } from "../getPokemon/PokemonResponseInterface";
import { pokeApi } from "../pokeApi"
import { PokemonListResponseInterface } from "./PokemonListResponseInterface"

export function getPokemonList(page: number = 1, perPage: number = 12) {
  const params = {
    limit: perPage,
    offset: (page - 1) * perPage,
  }

  return pokeApi.get<PokemonListResponseInterface>('/pokemon', { params })
    .then(({ data }) => {
      const nextPage = data.next ? page + 1 : null
      return { ...data, page, nextPage }
    })
}