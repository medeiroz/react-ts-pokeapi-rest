import { pokeApi } from "../pokeApi"
import { TypeListResponseInterface } from "./TypeListResponseInterface"

export function getTypeList(): Promise<TypeListResponseInterface> {
  return pokeApi.get("/type")
    .then(({ data }) => data)
}