(() => {
    class StaticSearchModule extends window.classes.ImageFinder {
      
      constructor(){
        super();
      }

      search(query) {
        const result = window.data.staticImagesData
        .filter(item => item.title.includes(query));
        return this._resultBuilder(query, result);
      }
    }
  
    window.classes = window.classes || {};
    window.classes.StaticSearchModule = StaticSearchModule;
  })();
  
  
  
  
  
  
  