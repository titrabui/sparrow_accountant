require('dotenv').config();

let BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

if (process.env.NODE_ENV === 'production') {
  BACKEND_URI = process.env.REACT_APP_PRODUCTION_BACKEND_URI;
} else if (process.env.NODE_ENV === 'test') {
  BACKEND_URI = process.env.REACT_APP_TEST_BACKEND_URI;
}

export default {
  BACKEND_URI,
};
