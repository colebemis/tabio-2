import Fuse from 'fuse.js';

export default function ({list, filterText, keys}) {
  if (!filterText) {
    return list;
  }

  const options = {
    threshold: 0.4,
    keys
  };

  const fuse = new Fuse(list, options);
  return fuse.search(filterText);
}
