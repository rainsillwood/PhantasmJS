// priority: 20

const _Item_Properties = Java.loadClass('net.minecraft.world.item.Item$Properties');
const _BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem');
//注册新物品
StartupEvents.registry('item', (event) => {
  global.listItemBuild.forEach((optionItem) => {
    let builderItem;
    if (optionItem.type == 'custom') {
      let item;
      let propertyItem = optionItem.specialItem;
      switch (propertyItem.type) {
        case 'blockItem': {
          item = new _BlockItem(propertyItem.block.get(), new _Item_Properties());
          break;
        }
        default: {
          break;
        }
      }
      /*let provider = Utils.lazy(() => item);
      builderItem = event['createCustom(dev.latvian.mods.kubejs.util.KubeResourceLocation,java.util.function.Supplier)'](optionItem.id, provider);
      */
      builderItem = event.createCustom(optionItem.id, () => item);
    } else {
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
      global.listLanguageTable.push({ 'type': 'item', 'id': optionItem.id, 'displayName': optionItem.displayName });
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
  global.listItemModify.forEach((optionItem) => {
    global.listLanguageTable.push({ 'type': 'item', 'id': optionItem.id, 'displayName': optionItem.displayName });
    event.modify(optionItem.id, (builderItem) => {
      if (optionItem.maxDamage > 0) builderItem.setMaxDamage(optionItem.maxDamage); //设置物品的最大耐久
      if (optionItem.maxStackSize > 0) builderItem.setMaxStackSize(optionItem.maxStackSize); //设置物品的最大堆叠
      //craftingRemainder:item//合成遗留物
      if (optionItem.fireResistant === true) builderItem.setFireResistant(optionItem.fireResistant); //设置物品是否防火
      builderItem.setRarity(global.listRarity[Math.min(optionItem.rarity, global.listRarity.length - 1)]); //设置稀有度
      if (optionItem.burnTime > 0) builderItem.setBurnTime(optionItem.burnTime); //设置物品的可燃烧tick
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
