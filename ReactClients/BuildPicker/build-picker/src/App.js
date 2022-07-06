import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';

import MainWindow from './components/MainWindow';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <MainWindow/>
      </div>
    </div>
  );
}

export default App;
