// priority: 20

//注册新物品
StartupEvents.registry('item', (event) => {
  global.listItemBuild.forEach((option) => {
    let builder;
    let resourceLocation = `${option.namespace}:${option.id}`;
    if (option.type == 'custom') {
      let item;
      let property = option.specialItem;
      switch (property.type) {
        case 'blockItem': {
          item = new $BlockItem(property.block.get(), new $Item_Properties());
          break;
        }
        default: {
          break;
        }
      }
      builder = event.createCustom(resourceLocation, () => item);
    } else {
      if (option.type == 'basic') {
        builder = event.create(resourceLocation);
      } else {
        builder = event.create(resourceLocation, option.type);
      }
      if (option.maxStackSize > 0) builder.maxStackSize(option.maxStackSize); //设置物品的最大堆叠
      if (option.maxDamage > 0) builder.maxDamage(option.maxDamage); //设置物品的最大耐久
      if (option.burnTime > 0) builder.burnTime(option.burnTime); //设置物品的可燃烧tick
      if (option.fireResistant === true) builder.fireResistant(option.fireResistant); //设置物品是否防火
      builder.rarity(global.listRarity[Math.min(option.rarity, 3)]); //设置稀有度
      if (option.glow === true) builder.glow(true); //设置是否光效
      //color
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
});
//修改原有物品
ItemEvents.modification((event) => {
  global.listItemModify.forEach((option) => {
    let resourceLocation = `${option.namespace}:${option.id}`;
    event.modify(resourceLocation, (builder) => {
      if (option.maxDamage > 0) builder.setMaxDamage(option.maxDamage); //设置物品的最大耐久
      if (option.maxStackSize > 0) builder.setMaxStackSize(option.maxStackSize); //设置物品的最大堆叠
      //craftingRemainder:item//合成遗留物
      if (option.fireResistant === true) builder.setFireResistant(option.fireResistant); //设置物品是否防火
      builder.setRarity(global.listRarity[Math.min(option.rarity, global.listRarity.length - 1)]); //设置稀有度
      if (option.burnTime > 0) builder.setBurnTime(option.burnTime); //设置物品的可燃烧tick
      //foodProperties
      //digSpeed
      //tier
      //attackDamage
      //attackSpeed
      //armorProtection
      //armorToughness
      //armorKnockbackResistance
    });
  });
});
