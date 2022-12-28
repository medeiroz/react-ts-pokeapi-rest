import logo from './logo.svg'
import { Carousel } from 'flowbite-react';
import { PokemonBoard } from './components/PokemonBoard';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Fragment } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {

  const queryClient = new QueryClient()

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <div className="h-screen">
          <header className="relative z-10 flex items-center justify-between py-6 px-6">
            <img src={logo} alt="logo" className="max-w-[120px]" />
            <span className="text-white">
              Case Study&nbsp;
              <a
                className="font-bold"
                href="https://github.com/medeiroz"
                target="_blank"
              >
                Medeiroz
              </a>
            </span>
          </header>
          <section className="h-5/6 mt-[-7rem]">
            <Carousel>
              <div className="bg-[url('/bg-blue.svg')] flex flex-col items-center justify-evenly h-full text-white py-20">
                <div className="bg-white mt-10 px-5 py-2 rounded-full">
                  <span className="text-blue-500 text-sm font-bold">Pokedex</span>
                </div>
                <span className="text-4xl font-montserrat font-bold">Catch them all!</span>
                <div className='flex flex-col items-center animate-bounce mt-10'>
                  <img
                    src="/lights.svg"
                    alt='Lights'
                  />
                  <img
                    className='w-1/2'
                    src="/pokeball-blue.png"
                    alt='Pokeball Blue'
                  />
                </div>
              </div>
              <div className="bg-[url('/bg-red.svg')] flex flex-col items-center justify-evenly h-full text-white py-20">
                <div className="bg-white mt-10 px-5 py-2 rounded-full">
                  <span className="text-red-500 text-sm font-bold">Pokedex</span>
                </div>
                <span className="text-xl font-montserrat font-bold px-16">The perfect guide for those who want hunt Pokemons around the wolrd</span>
                <div className='flex flex-col items-center animate-bounce'>
                  <img
                    src="/lights.svg"
                    alt='Lights'
                  />
                  <img
                    className='w-1/2'
                    src="/pokeball-red.png"
                    alt='Pokeball Red'
                  />
                </div>
              </div>
            </Carousel>
          </section>

          <PokemonBoard />
        </div>
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </Fragment>
  );
}

export default App
