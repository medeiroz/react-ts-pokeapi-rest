import logo from './logo.svg'
import { BsHandbag } from 'react-icons/bs'

function App() {

  return (
    <div className="w-full h-full">
      <div className='bg-[url("/bg-blue.svg")]'>
        <header className="flex items-center justify-between py-6 px-6">
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
        <section className="flex flex-col items-center justify-center">
          <div className="flex items-center bg-white px-3 py-1 rounded-full">
            <div className='bg-blue-200 p-1 rounded-full'>
              <BsHandbag />
            </div>
            <span className="text-blue-700 ml-1 text-sm">pokedex</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App
