import { createStore } from 'redux';
import usuarioReducer from './usuarioReducer';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root', 
    storage
}

const reducer = persistReducer(persistConfig, usuarioReducer);

const store = createStore(usuarioReducer);
const persistor = persistStore(store);

export { store, persistor };