// priority: 1000

let part;
let rarity = 0;
for (let material of global.materials) {
  switch (material.type) {
    case 'metal': {
      part = 'ingot';
      break;
    }
    case 'alloy': {
      part = 'ingot';
      break;
    }
    case 'gem': {
      part = 'gem';
      break;
    }
  }
  if (material.ingot.build === true) {
    let itemSetting = {
      'id': `minecraft:${material.id}_${part}`,
      'type': 'basic',
      'displayName': `${global.lang[global.displayLanguage][part].replace('${material}', global.lang[global.displayLanguage][material.id])}`,
    };
    //宝石特例无后缀
    if (part == 'gem') itemSetting.id = `${global.namespace}:${material.id}`;
    if (material.usage.fuel > 0) itemSetting.burnTime = material.usage.fuel;
    if (material.rarity > 0) itemSetting.rarity = material.rarity + rarity;
    if (material.enchanted === true) itemSetting.glow = true;
    global.listItem.push(itemSetting);
    //初始化tag
    let itemTags = [
      `c:${part}s/${material.id}`, //基础tag
      `c:${part}s`, //基础tag
    ];
    //信标tag
    if (material.usage.bacon === true) itemTags.push('minecraft:beacon_payment_items');
    //锻造材料tag
    if (material.usage.trim === true) itemTags.push('minecraft:trim_materials');
    //其他模组金属相关tag
    //if (material.type == 'metal' || material.type == 'alloy') itemTags.push('minecolonies:blacksmith_product', 'ae2:metal_ingots'); //殖民地:铁匠产物;ae2:金属锭
    for (let tag of itemTags) {
      if (!global.listTagItem[tag]) global.listTagItem[tag] = [];
      global.listTagItem[tag].push(itemSetting.id);
    }
    //初始化itemGroup
    if (!global.listCreativeTab['minecraft:ingredients']) global.listCreativeTab['minecraft:ingredients'] = [];
    global.listCreativeTab['minecraft:ingredients'].push({ 'item': itemSetting.id, 'before': 'minecraft:stick' });
    global.listCreativeTabRemove.push(itemSetting.id);
  }
}
