class Config {
  constructor() {
    this.photos_ = [
      {url: 'photos/000.jpg'},
      {url: 'photos/001.jpg'},
      {url: 'photos/002.jpg'},
      {url: 'photos/003.jpg'},
      {url: 'photos/004.jpg'},
      {url: 'photos/005.jpg'},
      {url: 'photos/006.jpg'},
      {url: 'photos/007.jpg'},
    ];
  }

  get photos() {
    return this.photos_;
  }
}

export default Config;
