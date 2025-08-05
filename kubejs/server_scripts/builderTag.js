// priority: 1

ServerEvents.tags('item', (event) => {
  for (let tagName in global.listTagItem) {
    let listItem = global.listTagItem[tagName];
    for (let item of listItem) {
      event.add(tagName, item);
    }
  }
});
