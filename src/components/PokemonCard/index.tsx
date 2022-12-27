import { PokemonCardProps } from "./PokemonCardProps"

export const PokemonCard = (props: PokemonCardProps) => {
  const code = '#' + props.id.toString().padStart(3, '0')
  
  return (
    <div
      className="flex flex-col shadow-lg justify-center bg-white w-full rounded-md p-6"
      onClick={() => props.onClick(props.id)}
    >
      <div className="rounded-full bg-green-200 p-8">
        <img
          src={props.image}
          alt={props.name}
        />
      </div>
      <div className="flex flex-col mt-2">
        <span className="text-gray-400">{code}</span>
        <div className="flex justify-between">
          <h4 className="font-bold">{props.name}</h4>
          Icon
        </div>
      </div>
    </div>
  )
}