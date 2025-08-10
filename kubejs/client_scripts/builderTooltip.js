// priority: 10

ItemEvents.modifyTooltips((event) => {
  for (let item in global.listTooltip) {
    event.add(item, global.listTooltip[item]);
  }
});
