import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let Api:String = "https://api.giphy.com/v1/gifs/random?api_key=8NotAnqZix8DEeXvlRrUcsuj5LyrP5xw&tag=test&rating=g";

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p>Edit <code>src/App.tsx</code> and save to reload.</p>
          <p>Api => {Api}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
