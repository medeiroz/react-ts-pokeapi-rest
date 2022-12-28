import { camelCase } from 'lodash'

const typeColorTranscriber: { [key: string]: string } = {
  bug: 'green',
  dark: '',
  dragon: '',
  electric: '',
  fairy: '',
  fighting: '',
  fire: 'orange',
  flying: 'blue',
  ghost: '',
  grass: 'green',
  ground: '',
  ice: 'cyan',
  normal: '',
  poison: 'purple',
  psychic: '',
  rock: '',
  steel: '',
  water: '',
}


export function getColorByType(type: string): string {
  const typeCamelCase = camelCase(type)

  return typeColorTranscriber[typeCamelCase];
}