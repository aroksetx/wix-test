(() => {
    class FlieckerSearchModule extends window.classes.ImageFinder {
      
      constructor(){
        super();
        this.url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b394136d5dde8d9d0d4f8fc6685386e2&tformat=json&format=json&nojsoncallback=1&extras=url_o&tags=cat';
      }
        
      async search(query) {
       

        return new Promise((resolve, reject) => {
            this._getData(query).then(({photos}) => {
                let {photo} = photos;
                photo = photo.map(item => { return {...item, url: item.url_o}})
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
  
  
  
  
  
  
  