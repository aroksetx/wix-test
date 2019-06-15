(() => {
    class FlieckerSearchModule extends window.classes.ImageFinder {
      
      constructor(){
        super();
        this.url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b394136d5dde8d9d0d4f8fc6685386e2&tformat=json&tags=cat&format=json&nojsoncallback=1&ags=';
        this.controller = new AbortController();
      }
        
      async search(query) {
        return new Promise((resolve, reject) => {
            this._getData(query).then(({photos}) => {
                const {photo} = photos;
                resolve(this._resultBuilder(query, photo));
            }).catch(e => reject(e));
        })
      }


    _getData(query){
        return fetch(this.url + query, {
            method: 'get',
            signal: this.controller.signal, 
        }).then(response => response.json());
    }


    }
  
    window.classes = window.classes || {};
    window.classes.FlieckerSearchModule = FlieckerSearchModule;
  })();
  
  
  
  
  
  
  