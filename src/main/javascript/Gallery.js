(() => {
  const createNode = (tagName, className) => {
    const node = document.createElement(tagName);

    if (className) {
      node.classList.add(className);
    }

    return node;
  };

  class Gallery {
    constructor(imageFinder) {
      this._imageFinder = imageFinder;
      this.galleryId = null;
      this._retgistrateGalleryId();  
      this._createInterface();
      this._setFunctionality();    
    }

    _retgistrateGalleryId(){
      const counter = window.classes.Gallery.counter;
      this.galleryId = `galleryId_${counter.length + 1}`;
      counter.push(this.galleryId);
      window.classes.Gallery.counter = counter;
    }

    _createInterface() {
      this._viewNode = createNode('div', 'gallery');
      this._resultsNode = createNode('div', 'galleryItems');
      this._controlsNode = createNode('div', 'galleryControls');
      this._queryInputNode = createNode('input');
      this._searchBtnNode = createNode('button', 'search');
      this._searchBtnNode.innerText = 'Search';

      this._querySelectInputNode = createNode('select');
      let moduleStatic = createNode("option");
      moduleStatic.text = "Static";
      let moduleFlicker = createNode("option");
      moduleFlicker.text = "Flickr";
      this._querySelectInputNode.add(moduleStatic);
      this._querySelectInputNode.add(moduleFlicker);


      this._viewNode.appendChild(this._controlsNode);
      this._controlsNode.appendChild(this._queryInputNode);
      this._controlsNode.appendChild(this._querySelectInputNode);
      this._controlsNode.appendChild(this._searchBtnNode);
      this._viewNode.appendChild(this._resultsNode);
    }

    _setFunctionality() {
      this._searchBtnNode.addEventListener('click', () => this._onSearchButtonClick());
    }

    _onSearchButtonClick() {
      this.doSearch(this._queryInputNode.value);
    };

    _onSearchResultReady({ images }) {
      this._resultsNode.innerHTML = '';
      const fragmentWithResults = images.reduce((fragment, image) => {
        const imgNode = createNode('img');
        imgNode.setAttribute('src', image.url);
        fragment.appendChild(imgNode);
        return fragment;
      }, document.createDocumentFragment());

      this._resultsNode.appendChild(fragmentWithResults);
    }

    doSearch(query, moduleId) {      
      const module = moduleId != null ? moduleId : this._querySelectInputNode.value;
      this._imageFinder.search(query, module, this.galleryId).then(searchResults => {
        this._onSearchResultReady(searchResults);
      })
    }

    addToNode(node) {
      node.appendChild(this._viewNode);
    }
  }

  window.classes = window.classes || {};
  window.classes.Gallery = Gallery;
  window.classes.Gallery.counter =  window.classes.Gallery.counter || [];
})();
