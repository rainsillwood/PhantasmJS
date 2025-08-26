// priority: 2147483647

ServerEvents.tags('item', (event) => {
  for (let tagName in global.listTagItem) {
    let listItem = global.listTagItem[tagName];
    for (let item of listItem) {
      event.add(tagName, item);
    }
  }
});
ServerEvents.tags('block', (event) => {
  for (let tagName in global.listTagBlock) {
    let listBlock = global.listTagBlock[tagName];
    for (let item of listBlock) {
      event.add(tagName, item);
    }
  }
});
ServerEvents.tags('fluid', (event) => {
  for (let tagName in global.listTagFluid) {
    let listFluid = global.listTagFluid[tagName];
    for (let item of listFluid) {
      event.add(tagName, item);
    }
  }
});
/*
ServerEvents.tags('entity', (event) => {
  for (let tagName in global.listTagEntity) {
    let listItem = global.listTagEntity[tagName];
    for (let item of listItem) {
      event.add(tagName, item);
    }
  }
});*/
