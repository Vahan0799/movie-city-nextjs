import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import store from '@/redux/store';

const persist = persistStore(store);

const StoreProvider = ({children}) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persist}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default StoreProvider;
