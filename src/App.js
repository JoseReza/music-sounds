import { Navbar } from './components/navbar';
import { Sounds } from './components/sounds';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [navbarSearchValue, setNavbarSearchValue] = useState("");
  const [soundsCounter, setSoundsCounter] = useState(0);

  const onChangeSearchValue = (value)=>{
    setNavbarSearchValue(value);
  }

  const onChangeCounter = (value)=>{
    setSoundsCounter(value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Navbar onChangeSearchValue={onChangeSearchValue} soundsCounter={soundsCounter}></Navbar>
        <Sounds navbarSearchValue={navbarSearchValue} onChangeCounter={onChangeCounter}></Sounds>
      </header>
    </div>
  );
}

export default App;
