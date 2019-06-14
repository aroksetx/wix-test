(() => {
  class ImageFinder {
    search(query) {
      const result = window.data.staticImagesData
      .filter(item => item.title.includes(query))
      .map(item => {
        return {
          id: item.id,
          url: item.url,
          title: item.title
        }
      });
      
      return {
        query: query,
        images: result
      };
    }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
})();

