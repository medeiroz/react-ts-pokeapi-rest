export interface PokemonListResponseInterface {
  count: number,
  next: string,
  results: Array<{ name: string, url: string }>,
}