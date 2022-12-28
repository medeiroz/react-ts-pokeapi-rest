export interface PokemonCardProps {
  name: string,
  url: string,
  onClick(name: string): void
}