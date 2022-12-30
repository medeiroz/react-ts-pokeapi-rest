import { pokeApi } from "../pokeApi"
import { TypeResponseInterface } from "./TypeResponseInterface"

export function getType(name: string): Promise<TypeResponseInterface> {
  return pokeApi.get(`/type/${name}`)
    .then(({ data }) => data)
}