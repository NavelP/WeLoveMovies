// App.js
import './styles.css';  // Import the styles.css file
import React from "react";
import Navbar from "./components/Navbar";
import Movies from "./Movies"; // Import the Movies component

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <h2 className='ttpg'>Welcome to We Love Movies</h2>
        <p className='ttpg'>Your ultimate movie database and reviews platform.</p>
        <Movies /> {/* Render the Movies component */}
      </main>
    </div>
  );
}

export default App;
