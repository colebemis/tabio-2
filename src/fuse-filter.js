import Fuse from 'fuse.js';

export default function ({list, filterText, keys}) {
  if (!filterText) {
    return list;
  }

  const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    keys
  };

  const fuse = new Fuse(list, options);
  return fuse.search(filterText);
}
