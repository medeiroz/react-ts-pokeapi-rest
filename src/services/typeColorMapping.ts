import { camelCase } from 'lodash'

const typeColorTranscriber: { [key: string]: string } = {
  bug: 'green',
  dark: 'stone',
  dragon: 'sky',
  electric: 'amber',
  fairy: 'fuchsia',
  fighting: 'red',
  fire: 'orange',
  flying: 'blue',
  ghost: 'indigo',
  grass: 'green',
  ground: 'orange',
  ice: 'cyan',
  normal: 'slate',
  poison: 'purple',
  psychic: 'yellow',
  rock: 'emerald',
  steel: 'stone',
  water: 'blue',
}


export function getColorByType(type: string): string {
  const typeCamelCase = camelCase(type)

  return typeColorTranscriber[typeCamelCase];
}