import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../api/pokeApi/getPokemon";
import { PokemonCardProps } from "./PokemonCardProps"

export const PokemonCard = (props: PokemonCardProps) => {
  const id = props.url?.split('/').pop();
  const code = '#' + id?.toString().padStart(3, '0')

  const { data, isError, isLoading } = useQuery(['pokemon', props.name], () => getPokemon(props.name))

  return (
    <div
      className="flex flex-col shadow-lg justify-center bg-white w-full rounded-md p-6"
      onClick={() => props.onClick(props.name)}
    >
      <div className="rounded-full bg-green-200 p-8">
        {
          isLoading === false && <img
            src={data?.sprites?.other?.dream_world?.front_default}
            alt={props.name}
          />
        }
        
      </div>
      <div className="flex justify-between mt-2">
        <h4 className="font-bold">{props.name}</h4>
        <span className="text-gray-400">{code}</span>
      </div>
    </div>
  )
}