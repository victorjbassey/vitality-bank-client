import React from 'react';
import SignUpForm from './components/SignUp/SignUp';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="welcome-img">
      </div>
      <main className="main">
        <div>
          <SignUpForm />
        </div>
      </main>
    </div>
    
  );
}

export default App;
