import React, { useReducer } from 'react';
import AlertContext from './AlertContext';
import alertReducer from './AlertReducer';
import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = ({ children }) => {
	const initialSate = [];

	const [state, dispatch] = useReducer(alertReducer, initialSate);

	//Set Alert
	const setAlert = (msg, type, timeout = 2000) => {
		const id = uuidv4();
		dispatch({ type: SET_ALERT, payload: { msg, type, id } });

		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert,
			}}
		>
			{' '}
			{children}{' '}
		</AlertContext.Provider>
	);
};

export default AlertState;
