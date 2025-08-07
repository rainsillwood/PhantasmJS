// priority: 10

for (let optionItem of global.listItem) {
  if (optionItem.modify == 'build') {
    StartupEvents.registry('item', (event) => {
      let builderItem;
      if (optionItem.type == 'basic') {
        builderItem = event.create(optionItem.id);
      } else {
        builderItem = event.create(optionItem.id, optionItem.type);
      }
      builderItem.displayName(optionItem.displayName);
      builderItem.rarity(optionItem.rarity);
      if (optionItem.maxDamage > 0) builderItem.maxDamage(optionItem.maxDamage); //设置物品的最大耐久
      if (optionItem.maxStackSize > 0) builderItem.maxStackSize(optionItem.maxStackSize); //设置物品的最大堆叠
      if (optionItem.fireResistant === true) builderItem.fireResistant(optionItem.fireResistant); //设置物品是否防火
      if (optionItem.tooltip) builderItem.tooltip(optionItem.tooltip); //设置物品的tag标签
      if (optionItem.texture) builderItem.texture(optionItem.texture); //设置物品材质路径
      if (optionItem.burnTime > 0) builderItem.burnTime(optionItem.burnTime); //设置物品的可燃烧tick
      if (optionItem.glow === true) builderItem.glow(true); //设置是否光效
    });
  } else {
    ItemEvents.modification((event) => {
      event.modify(optionItem.id, (builderItem) => {
        builderItem.displayName(optionItem.displayName);
        builderItem.rarity(optionItem.rarity);
        if (optionItem.maxDamage > 0) builderItem.maxDamage(optionItem.maxDamage); //设置物品的最大耐久
        if (optionItem.maxStackSize > 0) builderItem.maxStackSize(optionItem.maxStackSize); //设置物品的最大堆叠
        if (optionItem.fireResistant === true) builderItem.fireResistant(optionItem.fireResistant); //设置物品是否防火
        if (optionItem.tooltip) builderItem.tooltip(optionItem.tooltip); //设置物品的tooltip标签
        //if (optionItem.texture) builderItem.texture(optionItem.texture); //设置物品材质路径
        if (optionItem.burnTime > 0) builderItem.burnTime(optionItem.burnTime); //设置物品的可燃烧tick
        if (optionItem.glow === true) builderItem.glow(true); //设置是否光效
      });
    });
  }
}
