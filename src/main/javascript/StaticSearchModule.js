(() => {
    class StaticSearchModule extends window.classes.ImageFinder {
      
      constructor(){
        super();
      }

      search(query) {
        return new Promise((resolve, reject) => {
          const result = window.data.staticImagesData
        .filter(item => item.title.includes(query));
        resolve(this._resultBuilder(query, result));
        })
      }
    }
  
    window.classes = window.classes || {};
    window.classes.StaticSearchModule = StaticSearchModule;
  })();
  
  
  
  
  
  
  