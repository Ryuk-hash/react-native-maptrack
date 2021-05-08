import createDataContext from './createDataContext';
import axios from '../api/tracks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const initialState = {
  token: null,
  errorMessage: '',
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'AUTH_SUCCESS':
      return { errorMessage: '', token: payload };

    case 'AUTH_ERROR':
      return { ...state, errorMessage: payload };

    case 'AUTH_LOGOUT':
      return { errorMessage: '', token: null };

    case 'CLEAR_ERROR':
      console.log('clear func called');
      return { ...state, errorMessage: '' };

    default:
      return state;
  }
};

const localSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    dispatch({ type: 'AUTH_SUCCESS', token });
    navigate('TrackList');
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERROR' });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    console.log(email, password);
    const { data } = await axios.post('/signup', { email, password });

    const { success, message, token } = data;

    if (success === false) dispatch({ type: 'AUTH_ERROR', payload: message });
    else {
      await AsyncStorage.setItem('token', token);
      dispatch({ type: 'AUTH_SUCCESS', payload: token });
      navigate('TrackList');
    }
  } catch (err) {
    console.log(err.message);
    dispatch({ type: 'AUTH_ERROR', payload: 'Something went wrong with sign-up!' });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    console.log(email, password);
    const { data } = await axios.post('/signin', { email, password });

    const { success, message, token } = data;

    if (success === false) dispatch({ type: 'AUTH_ERROR', payload: message });
    else {
      await AsyncStorage.setItem('token', token);
      dispatch({ type: 'AUTH_SUCCESS', payload: token });
      navigate('TrackList');
    }
  } catch (err) {
    console.log(err.message);
    dispatch({ type: 'AUTH_ERROR', payload: 'Something went wrong with sign-in!' });
  }
};

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'AUTH_LOGOUT' });
    navigate('loginFlow');
  } catch (err) {
    console.log(err.message);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, localSignIn },
  initialState
);
