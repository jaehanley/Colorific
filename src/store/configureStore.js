import devStore from './devStore';
import prodStore from './prodStore';

let output;
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  output = devStore;
} else {
  output = prodStore;
}

export default output;
