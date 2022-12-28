import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../api/pokeApi/getPokemon";
import { getColorByType } from "../../services/typeColorMapping";
import { PokemonCardProps } from "./PokemonCardProps"

export const PokemonCard = (props: PokemonCardProps) => {
  const splitedUrl = props.url?.split('/');
  const id = splitedUrl[splitedUrl.length-2]
  const code = '#' + id?.toString().padStart(3, '0')

  const { data, isError, isLoading } = useQuery(['pokemon', props.name], () => getPokemon(props.name))

  const color = getColorByType(data?.types?.[0]?.type?.name || '');

  return (
    <div
      className="flex flex-col shadow-lg justify-center bg-white w-full rounded-md p-6"
      onClick={() => props.onClick(props.name)}
    >
      <div className={`flex justify-center items-center aspect-square rounded-full bg-${color}-200 p-8`}>
        {
          isLoading === false &&
          <img
            className="max-w-[80%] h-auto align-middle"
            src={data?.sprites?.other?.dream_world?.front_default}
            alt={props.name}
          />
        }
        
      </div>
      <div className="flex justify-between mt-2">
        <h4 className="font-bold capitalize">{props.name}</h4>
        <span className="text-gray-400">{code}</span>
      </div>
    </div>
  )
}