// vite.config.js
export default {
    css: {
      // Specify which files should be treated as CSS
      preprocessorOptions: {
        // For example, if you want to skip transforming `.css` files
        // you can specify them here
        css: {
          // Skip transformations for `.css` files
          skip: true,
        },
      },
    },
  };
  