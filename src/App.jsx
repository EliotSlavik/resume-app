import React from 'react';
import './App.css';
import Header from './components/Header';
import Skills from './components/Skills';
import Experience from './components/Experience';
import CodeExamples from './components/CodeExamples'; 
import Eduaction from './components/Education';

function App() {
  return (
    <div className="App">
      <Header />
      <Skills />
      <Eduaction />
      <Experience />
      <CodeExamples />
    </div>
  );
}

export default App;
