import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Modal, TextInput } from "flowbite-react"
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { debounce, kebabCase, toNumber } from "lodash";
import { useEffect, useState } from "react";
import { getPokemonList } from "../../api/pokeApi/getPokemonList";
import { PokemonListResponseInterface } from "../../api/pokeApi/getPokemonList/PokemonListResponseInterface";
import { PokemonCard } from "../PokemonCard";
import { PokemonDetails } from "../PokemonDetails";

export const PokemonBoard = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [search, setSearch] = useState<string|null>(null)
  const [selectedPokemon, setSelectedPokemon] = useState<string|null>(null)
  const [perPage, setPerPage] = useState<number>(12);

  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemonList', perPage],
    queryFn: ({ pageParam = 1 }) => getPokemonList(pageParam, perPage),
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

  useEffect(() => {
    if (search) {
      setPerPage(1500)
    }
  }, [search])

  const totalFound = data?.pages?.[0].count || 0
  const pokemonList: PokemonListResponseInterface['results'] = [];

  data?.pages?.forEach(page => {
    pokemonList.push(...page.results)
  })

  const pokemonListFiltered = pokemonList.filter((pokemon) => {
    if (!search) {
      return true;
    }

    const kebabName = kebabCase(pokemon.name)
    const kebabSearch = kebabCase(search)

    if (kebabName.includes(kebabSearch)) {
      return true;
    }

    const splitedUrl = pokemon?.url?.split('/');
    const id = pokemon?.id || splitedUrl && splitedUrl[splitedUrl.length - 2]

    return (toNumber(kebabSearch) == id)
  })

  const onClose = () => {
    setShowDetail(false)
  }

  const onOpenDetails = (name: string) => {
    setSelectedPokemon(name)
    setShowDetail(true)
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    debounceSearch(event.target.value);
  }

  const debounceSearch = debounce(criteria => {
    setSearch(criteria)
  }, 300)

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
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center text-cente mt-10 mb-10 gap-3">
          <img src="/icon-poke-red.svg"/>
          <span className="font-inter">{ totalFound } Pokemon{ totalFound > 1 ? 's' : '' }</span>
        </div>
        <div className="w-full px-10">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {pokemonListFiltered.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon?.url}
                onClick={() => onOpenDetails(pokemon.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}