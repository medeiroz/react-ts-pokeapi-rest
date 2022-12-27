import { getColorByType } from "../../services/typeColorMapping"
import { PokemonBadgeProps } from "./PokemonBadgeProps"

export const PokemonBadge = (props: PokemonBadgeProps) => {

  const color = getColorByType(props.type)

  return (
    <div className={`bg-${color}-100 px-2 py-0.5 rounded-md`}>
      <span className={`text-${color}-600`}>{ props.type }</span>
    </div>
  )
}