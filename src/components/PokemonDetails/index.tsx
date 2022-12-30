import { useQuery } from "@tanstack/react-query"
import { Button, Progress, Tooltip } from "flowbite-react"
import { startCase } from "lodash"
import { getPokemon } from "../../api/pokeApi/getPokemon"
import { getType } from "../../api/pokeApi/getType"
import { PokemonBadge } from "../PokemonBadge"
import { PokemonDetailsProps } from "./PokemonDetailsProps"

export const PokemonDetails = (props: PokemonDetailsProps) => {

  const pokemonQuery = useQuery({
    queryKey: ['pokemon', props.name],
    queryFn: () => getPokemon(props.name),
    retry: false
  })

  const firstType = pokemonQuery?.data?.types[0].type.name || ''

  const typeQuery = useQuery({
    queryKey: ['type', firstType],
    queryFn: () => getType(firstType),
    enabled: !!firstType,
    retry: false
  })

  if (pokemonQuery.isError || typeQuery.isError) {
    return <span>Not Found</span>
  }

  if (pokemonQuery.isLoading || typeQuery.isLoading) {
    return <span>Loading</span>
  }

  const pokemon = pokemonQuery.data
  const type = typeQuery.data


  const code = '#' + pokemon.id.toString().padStart(3, '0')
  const height = pokemon.height / 10 + 'm'
  const weight = pokemon.weight / 100 + 'kg'

  const abilities = pokemon.abilities.map(ability => ability.ability.name)
  const weaknesses = type.damage_relations.double_damage_from.map(power => power.name)

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img
        className="w-40"
        src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default}
        alt={ props.name }
      />
      <div className="flex flex-row mt-4 justify-center">
        <span className="font-bold">{ startCase(props.name) }</span>
        <span className="text-gray-400 ml-2">{ code }</span>
      </div>
      <div className="flex flex-wrap mt-4 gap-2">
        {
          pokemon.types.map((type) => {
            return <PokemonBadge key={type.type.name} type={type.type.name} />
          })
        }
      </div>
      <div className="w-full flex justify-between mt-4">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300">Height</span>
          <span>{ height }</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300">Weight</span>
          <span>{ weight }</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300">Abilities</span>
          <span>{ startCase(abilities[0]) }</span>
          {
            abilities.length > 1 && (
              <Tooltip content={ startCase(abilities.join(', ')) } placement="bottom">
                <Button size="xs" label={'+' + (abilities.length - 1)}>
                  More
                </Button>
              </Tooltip>
            )
          }
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <span>Weaknesses</span>
      </div>

      <div className="flex flex-wrap mt-4 gap-2">
        {
          weaknesses.map((weakness) => {
            return <PokemonBadge key={weakness} type={weakness} />
          })
        }
      </div>

      <div className="flex flex-col w-full mt-8 gap-2">
        <span className="text-center">Stats</span> 
        {
          pokemon.stats.map((stat) => {
            return (
              <div key={stat.stat.name} className="w-full">
                <Progress progress={stat.base_stat} color="red" label={startCase(stat.stat.name)} labelPosition="outside" />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}