export interface PokemonCardProps {
  id: number,
  name: string,
  image: string,
  onClick(id: number): void
}