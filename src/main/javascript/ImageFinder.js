(() => {
  class ImageFinder {

    constructor(modules){
      this.modules = modules;
      this.controller = new AbortController();
      this.cancel = () => null;// a no-op to start with
      this.galleryStory = null;
    }

    search(query, moduleId = null, galleryId = null) {
      this.galleryStory = this.galleryStory == null 
      ? galleryId
      : this.galleryStory === galleryId 
        ? this.cancel() : null;

     
      try {
        const searchModule = this._loadModuleSearch(moduleId.toLowerCase());
        if(searchModule == null) throw 'Module not found!';
        return new Promise((resolve, reject) => {
          const id = setTimeout(() => {
            resolve(searchModule.module.search(query));
          }, 100)
          this.cancel =  () => clearTimeout(id);
        }).catch(error => console.log(error));
      } catch(e) {
        console.error(e)
      }

    }

    _loadModuleSearch(moduleId) {
      return this.modules.find(module => module.moduleId === moduleId);
    }

    _resultBuilder(query, result) {
      const formatResult = result.map(item => {
        return {
          id: item.id,
          url: item.url,
          title: item.title
        }});
      return {
        query: query,
        images: formatResult
      }
    }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
  window.cancelRequest = window.cancelRequest || function(){};

})();






