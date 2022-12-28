import { pokeApi } from "../pokeApi"
import { TypeResponseInterface } from "./TypeResponseInterface"

export function getType(id: number): Promise<TypeResponseInterface> {
  return pokeApi.get(`/type/${id}`)
    .then(({ data }) => data)
}