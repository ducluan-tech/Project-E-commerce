import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './Components/headers/Header'
import MainPages from './Components/mainpages/pages'
import Footer from './Components/footers/Footer'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
      <div>
      <Footer />
      </div>
      
    </DataProvider>
      
  );
}

export default App;
