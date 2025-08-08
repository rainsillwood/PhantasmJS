// priority: 1

ItemEvents.tags('tooltip', (event) => {
  for (let item in global.listTooltip) {
    event.add(item, global.listTooltip[item]);
  }
});
