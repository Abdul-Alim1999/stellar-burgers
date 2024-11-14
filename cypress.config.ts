// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
import { defineConfig } from 'cypress';

require('dotenv').config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      config.env = {
        ...process.env,
        ...config.env
      };
      return config;
    }
  }
});
