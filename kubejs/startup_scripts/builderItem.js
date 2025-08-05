// priority: 10

StartupEvents.registry('item', (event) => {
  for (let item of global.listItem) {
    let builderItem;
    if (item.type == 'basic') {
      builderItem = event.create(item.id);
    } else {
      builderItem = event.create(item.id, item.type);
    }
    builderItem.displayName(item.displayName);
    if (item.maxDamage > 0) builderItem.maxDamage(item.maxDamage); //设置物品的最大耐久
    if (item.maxStackSize > 0) builderItem.maxStackSize(item.maxStackSize); //设置物品的最大堆叠
    if (item.fireResistant === true) builderItem.fireResistant(item.fireResistant); //设置物品是否防火
    if (item.tooltip) builderItem.tooltip(item.tooltip); //设置物品的tag标签
    if (item.texture) builderItem.texture(item.texture); //设置物品材质路径
    if (item.burnTime > 0) builderItem.burnTime(item.burnTime); //设置物品的可燃烧tick
    if (item.glow === true) builderItem.glow(true); //设置是否光效
  }
});
