import fuseFilter from '../utilities/fuse-filter';

export const orderedTabGroups = ({tabGroups}) => {
  // make copy of tabGroups array
  const orderedTabGroups = tabGroups.slice();
  // find index of focused tabGroup
  const focusedIndex = tabGroups.findIndex(tabGroup => tabGroup.focused);
  // remove focused tabGroup from orderedTabGroups and save
  const focusedTabGroup = orderedTabGroups.splice(focusedIndex, 1)[0];
  // add focused tabGroup to front of orderedTabGroups
  orderedTabGroups.unshift(focusedTabGroup);

  return orderedTabGroups;
};

export const filteredTabGroups = ({filterText}, {orderedTabGroups}) => {
  return orderedTabGroups.map(tabGroup => {
    const filteredTabs = {
      tabs: fuseFilter({
        list: tabGroup.tabs,
        filterText,
        keys: ['title', 'url']
      })
    };

    return Object.assign({}, tabGroup, filteredTabs);
  }).filter(tabGroup => tabGroup.tabs.length > 0);
};
