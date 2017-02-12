class Config {
  constructor() {
    this.photos_ = [
      {
        url: 'photos/000.jpg',
        date: 'May 18, 2013',
      },
      {
        url: 'photos/001.jpg',
        date: 'April 4, 2012',
      },
      {
        url: 'photos/002.jpg',
        date: 'Januar 27, 2016',
      },
      {
        url: 'photos/003.jpg',
        date: 'August 31, 2017',
      },
      {
        url: 'photos/004.jpg',
        date: 'March 9, 2013',
      },
      {
        url: 'photos/005.jpg',
        date: 'June 23, 2017',
      },
      {
        url: 'photos/006.jpg',
        date: 'September 23, 2016',
      },
      {
        url: 'photos/007.jpg',
        date: 'July 11, 2015',
      },
      {
        url: 'photos/008.jpg',
        date: 'October 29, 2011',
      },
    ];
  }

  get photos() {
    return this.photos_;
  }
}

export default Config;
