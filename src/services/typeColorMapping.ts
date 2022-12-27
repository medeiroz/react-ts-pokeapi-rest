import { camelCase } from 'lodash'

const typeColorTranscriber: { [key: string]: string } = {
  grass: 'green',
  flying: 'blue',
  poison: 'purple',
  bug: 'green',
  fire: 'orange',
  ice: 'cyan',
}


export function getColorByType(type: string): string {
  const typeCamelCase = camelCase(type)

  return typeColorTranscriber[typeCamelCase];
}