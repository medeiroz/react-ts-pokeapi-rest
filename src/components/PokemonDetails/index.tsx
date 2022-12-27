import { Button, Progress, Tooltip } from "flowbite-react"
import { PokemonBadge } from "../PokemonBadge"
import { PokemonDetailsProps } from "./PokemonDetailsProps"

export const PokemonDetails = (props: PokemonDetailsProps) => {

  const code = '#' + props.id.toString().padStart(3, '0')
  const height = props.height / 10 + 'm'
  const weight = props.weight / 100 + 'kg'

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img
        className="w-40"
        src={ props.image }
        alt={ props.name }
      />
      <div className="flex flex-row mt-4 justify-center">
        <span className="font-bold">{ props.name }</span>
        <span className="text-gray-400 ml-2">{ code }</span>
      </div>
      <div className="flex flex-wrap mt-4 gap-2">
        {
          props.types.map((type) => {
            return <PokemonBadge key={type} type={type} />
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
          <span>{ props.abilities[0] }</span>
          {
            props.abilities.length > 1 && (
              <Tooltip content={ props.abilities.join(', ') } placement="bottom">
                <Button size="xs" label="+1">
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
          props.weaknesses.map((weakness) => {
            return <PokemonBadge key={weakness} type={weakness} />
          })
        }
      </div>

      <div className="flex flex-col w-full mt-8 gap-2">
        <span className="text-center">Stats</span> 
        {
          props.stats.map((stat) => {
            return (
              <div key={stat.name} className="w-full">
                <Progress progress={stat.percentage} color="red" label={stat.name} labelPosition="outside" />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}