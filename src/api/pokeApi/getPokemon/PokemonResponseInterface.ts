import { PokemonAbilityResponseInterface } from "./PokemonAbilityInterface";

export interface PokemonResponseInterface {
  id: number,
  name: string,
  url: string,
  abilities: Array<{ ability: PokemonAbilityResponseInterface }>,
  height: number,
  weight: number,
  stats: Array<{base_stat: number, stat: {name: string}}>
  sprites: {
    front_default: string,
    other: {
      dream_world: {
        front_default: string|null,
      }
    }
  },
  types: Array<{type: {name: string}}>
}