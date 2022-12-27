import { Modal, Select, TextInput } from "flowbite-react"
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import React, { useState } from "react";
import { PokemonCard } from "../PokemonCard";
import { PokemonDetails } from "../PokemonDetails";

export const PokemonBoard = () => {

  const totalFound = 1154

  const filterOptions = [
    { name: 'Flying' },
    { name: 'Wood' },
  ]

  const [ showDetail, setShowDetail ] = useState<boolean>(true);

  const onClose = () => {
    setShowDetail(false)
  }

  const onOpenDetails = (id: number) => {
    setShowDetail(true)
  }

  const pokemons = [
    {id: 2, name: 'Ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg'}
  ]


  const image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg'
  const name = 'Ivysaur'
  const id = 2
  const height = 10
  const weight = 130
  const abilities = ['Overgrow', 'Chlorophyll']

  const types = [
    'Grass',
    'Poison',
  ]

  const weaknesses = [
    'Flying',
    'Poison',
    'Bug',
    'Fire',
    'Ice',
  ]

  const stats = [
    {
      name: 'HP',
      percentage: 55,
    },
    {
      name: 'Attack',
      percentage: 60,
    },
    {
      name: 'Defense',
      percentage: 65,
    },
    {
      name: 'Sp. Attack',
      percentage: 82,
    },
    {
      name: 'Sp. Defense',
      percentage: 82,
    },
    {
      name: 'Speed',
      percentage: 50,
    },
  ]


  return (
    <React.Fragment>
      <Modal
        show={showDetail}
        onClose={onClose}
        popup={true}
        size="lg"
      >
        <Modal.Header />
        <ModalBody>
          <PokemonDetails
            id={id}
            name={name}
            image={image}
            height={height}
            weight={weight}
            stats={stats}
            types={types}
            weaknesses={weaknesses}
            abilities={abilities}
          />
        </ModalBody>
      </Modal>
      <div className="bg-gray-50 h-full w-100">
        <div className="flex flex-col text-center bg-gray-100 p-10 gap-3">
          <span className="text-2xl font-bold font-montserrat text-gray-600">Select your Pokemon</span>
          <TextInput
            type="search"
            placeholder="Search name or code"
          />
        </div>
        <div className="flex flex-row justify-center text-cente mt-10 gap-3">
          <img src="/icon-poke-red.svg"/>
          <span className="font-inter">{ totalFound } Pokemon{ totalFound > 1 ? 's' : '' }</span>
        </div>
        <div className="flex flex-col justify-center text-center p-10">
          <Select>
            <option>Select</option>
            {
              filterOptions.map((filterOption) => {
                return <option key={ filterOption.name } value={ filterOption.name }>{filterOption.name}</option>
              })
            }
          </Select>
        </div>
        <div className="w-full p-10">
          <div className="w-full grid grid-cols-1 gap-1">
            {
              pokemons.map((pokemon) => {
                return <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  onClick={() => onOpenDetails(pokemon.id)
                }/>
              })
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}