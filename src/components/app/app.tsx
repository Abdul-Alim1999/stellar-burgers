import { Provider } from 'react-redux';
import '../../index.css';
import styles from './app.module.css';

import { AppContent, AppHeader } from '@components';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './../../services/store';

const App = () => (
  <Router>
    <div className={styles.app}>
      <Provider store={store}>
        <AppHeader />
        <AppContent />
      </Provider>
    </div>
  </Router>
);

export default App;
