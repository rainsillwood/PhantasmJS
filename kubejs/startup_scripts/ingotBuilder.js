// priority: 1000

let part;
let rarity = 0;
for (let material of global.materials) {
  switch (material.type) {
    case 'metal': {
      part = 'ingot';
    }
    case 'alloy': {
      part = 'ingot';
    }
    case 'gem': {
      part = 'gem';
    }
  }
  if (material?.[part].build === true) {
    let itemSetting = {
      'id': `${global.namespace}:${material.id}_${part}`,
      'type': 'basic',
      'displayName': `${global.lang?.[global.displayLanguage][material.id]}${global.lang?.[global.displayLanguage][part]}`,
    };
    //宝石特例无后缀
    if (part == 'gem') itemSetting.id = `${global.namespace}:${material.id}`;
    if (material.usage.fuel > 0) itemSetting.burnTime = material.usage.fuel;
    if (material.rarity > 0) itemSetting.rarity = material.rarity + rarity;
    if (material.enchanted === true) itemSetting.glow = true;
    global.listItem.push(itemSetting);
    let itemTags = [
      `c:${part}s/${material.id}`, //基础tag
      `c:${part}s`, //基础tag
    ];
    //信标tag
    if (material.usage.bacon === true) itemTags.push('minecraft:beacon_payment_items');
    //金属相关tag
    if (material.type == 'metal' || material.type == 'alloy') itemTags.push('minecolonies:blacksmith_product', 'ae2:metal_ingots'); //殖民地:铁匠产物;ae2:金属锭
    for (let tag of itemTags) {
      if (!global.listTag[tag]) global.listTag[tag] = [];
      global.listTag[tag].push(itemSetting.id);
    }
  }
}
