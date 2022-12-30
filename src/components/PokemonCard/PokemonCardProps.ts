export interface PokemonCardProps {
  id?: number,
  name: string,
  url?: string,
  onClick(name: string): void
}