// priority: 20

//注册新物品
StartupEvents.registry('item', (event) => {
  for (let optionItem of global.listItemBuild) {
    let builderItem;
    if (optionItem.type == 'basic') {
      builderItem = event.create(optionItem.id);
    } else {
      builderItem = event.create(optionItem.id, optionItem.type);
    }
    if (optionItem.maxStackSize > 0) builderItem.maxStackSize(optionItem.maxStackSize); //设置物品的最大堆叠
    if (optionItem.maxDamage > 0) builderItem.maxDamage(optionItem.maxDamage); //设置物品的最大耐久
    if (optionItem.burnTime > 0) builderItem.burnTime(optionItem.burnTime); //设置物品的可燃烧tick
    if (optionItem.fireResistant === true) builderItem.fireResistant(optionItem.fireResistant); //设置物品是否防火
    builderItem.rarity(global.listRarity[Math.min(optionItem.rarity, 3)]); //设置稀有度
    if (optionItem.glow === true) builderItem.glow(true); //设置是否光效
    //color
    builderItem.displayName(optionItem.displayName);
    //textureJson
    //modelJson
    //parentModel
    //texture
    //useAnimation
    //useDuration
    //use
    //finishUsing
    //releaseUsing
    //modifyAttribute
    //containerItem
    //subtypes
    //food
    //tier
    //modifyTier
    //attackDamageBaseline
    //attackDamageBonus
    //speedBaseline
    //speed
  }
});
//修改原有物品
ItemEvents.modification((event) => {
  for (let optionItem of global.listItemModify) {
    event.modify(optionItem.id, (builderItem) => {
      builderItem.displayName(optionItem.displayName);
      if (optionItem.maxDamage > 0) builderItem.maxDamage = optionItem.maxDamage; //设置物品的最大耐久
      if (optionItem.maxStackSize > 0) builderItem.maxStackSize = optionItem.maxStackSize; //设置物品的最大堆叠
      //craftingRemainder:item//合成遗留物
      if (optionItem.fireResistant === true) builderItem.fireResistant = optionItem.fireResistant; //设置物品是否防火
      builderItem.rarity = global.listRarity[Math.max(optionItem.rarity, 3)]; //设置稀有度
      if (optionItem.burnTime > 0) builderItem.burnTime = optionItem.burnTime; //设置物品的可燃烧tick
      //foodProperties
      //digSpeed
      //tier
      //attackDamage
      //attackSpeed
      //armorProtection
      //armorToughness
      //armorKnockbackResistance
    });
  }
});
