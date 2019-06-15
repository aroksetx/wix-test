(() => {
  class ImageFinder {

    constructor(modules){
      this.modules = modules;
    }

    search(query, moduleId = null) {
      try {
        const searchModule = this._loadModuleSearch(moduleId);
        if(searchModule == null) throw 'Module not found!';
        return new Promise((resolve, reject) => {
          resolve(searchModule.module.search(query))
        }).catch(error => reject(error));
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
})();






