import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Modal, TextInput } from "flowbite-react"
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { kebabCase } from "lodash";
import React, { useEffect, useState } from "react";
import { getPokemonList } from "../../api/pokeApi/getPokemonList";
import { PokemonCard } from "../PokemonCard";
import { PokemonDetails } from "../PokemonDetails";



export const PokemonBoard = () => {
  const [search, setSearch] = useState<string|null>(null)
  const [selectedPokemon, setSelectedPokemon] = useState<string|null>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: ({ pageParam = 1 }) => getPokemonList(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop - 100 <= clientHeight * 1.2) {
        fetching = true
        if (hasNextPage) {
          await fetchNextPage()
        }
        fetching = false
      }
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage])

  const totalFound = data?.pages?.[0].count || 0

  const [ showDetail, setShowDetail ] = useState<boolean>(false);

  const onClose = () => {
    setShowDetail(false)
  }

  const onSearch = () => {
    onOpenDetails(kebabCase(search || ''))
  }

  const onOpenDetails = (name: string) => {
    setSelectedPokemon(name)
    setShowDetail(true)
  }

  return (
    <div>
      <Modal
        show={showDetail}
        onClose={onClose}
        popup={true}
        size="lg"
      >
        <Modal.Header />
        <ModalBody>
          {
            showDetail && selectedPokemon &&
            <PokemonDetails name={selectedPokemon} />
          }
        </ModalBody>
      </Modal>
      <div className="bg-gray-50 h-full w-100">
        <div className="flex flex-col text-center bg-gray-100 p-10 gap-3">
          <span className="text-2xl font-bold font-montserrat text-gray-600">Select your Pokemon</span>
          <div className="flex justify-center gap-4">
            <TextInput
              type="search"
              placeholder="Search name or code"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button gradientMonochrome="purple" onClick={onSearch}>
              Search
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-center text-cente mt-10 mb-10 gap-3">
          <img src="/icon-poke-red.svg"/>
          <span className="font-inter">{ totalFound } Pokemon{ totalFound > 1 ? 's' : '' }</span>
        </div>
        <div className="w-full px-10">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {data?.pages?.map((page, i) => (
              <React.Fragment key={i}>
                {page?.results.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon?.url}
                    onClick={() => onOpenDetails(pokemon.name)}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}