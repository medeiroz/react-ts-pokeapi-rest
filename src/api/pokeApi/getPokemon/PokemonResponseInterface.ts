import { PokemonAbilityResponseInterface } from "./PokemonAbilityInterface";

export interface PokemonResponseInterface {
  abilities: Array<{ ability: PokemonAbilityResponseInterface }>,
  sprites: {
    other: {
      dream_world: {
        front_default: string,
      }
    }
  },
  types: Array<{type: {name: string}}>
}