import { useQuery } from "@tanstack/react-query";
import { Modal, Select, TextInput } from "flowbite-react"
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import React, { useState } from "react";
import { getPokemonList } from "../../api/pokeApi/getPokemonList";
import { PokemonCard } from "../PokemonCard";
import { PokemonDetails } from "../PokemonDetails";

export const PokemonBoard = () => {

  const { data, isError, isLoading } = useQuery(['pokemonList'], () => getPokemonList(1, 100))


  const totalFound = 1154

  const filterOptions = [
    { name: 'Flying' },
    { name: 'Wood' },
  ]

  const [ showDetail, setShowDetail ] = useState<boolean>(false);

  const onClose = () => {
    setShowDetail(false)
  }

  const onOpenDetails = (name: string) => {
    setShowDetail(true)
  }

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
        <div className="w-full px-10">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {
              data?.results?.map((pokemon) => {
                return <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                  onClick={onOpenDetails}
                />
              })
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}