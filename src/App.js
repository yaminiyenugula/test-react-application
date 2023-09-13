import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { QuestionsComponent } from './components/test/randomQuestions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/test/random.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<QuestionsComponent/>}/>
      </Routes>
      </BrowserRouter>
      <div></div>
    </div>
  );
}

export default App;
