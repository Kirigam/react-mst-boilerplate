import React from 'react';
import { Provider } from 'mobx-react';

import createStore from './stores/stores';

function App() {
  const store = createStore();

  return (
    <Provider {...store}>
      <div className="App">Hi</div>
    </Provider>
  );
}

export default App;
