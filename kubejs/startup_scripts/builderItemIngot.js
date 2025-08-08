// priority: 1000

let type = 'ingot';
let rarity = 0;
for (let material of global.listMaterial) {
  let part = 'ingot';
  //基本设定
  let optionItem = {
    'id': `minecraft:${material.id}_${part}`,
    'type': 'basic',
    'name': `${global.listLanguage.part[part].replace('${material}', global.listLanguage.material[material.id])}`,
    'rarity': global.listRarity[Math.max(material.rarity + rarity, 3)],
  };
  //针对设定
  switch (material.type) {
    case 'metal': {
      break;
    }
    case 'alloy': {
      break;
    }
    case 'brick': {
      break;
    }
    case 'gem': {
      optionItem.id = `minecraft:${material.id}`;
      part = 'gem';
      break;
    }
    default: {
      break;
    }
  }
  //名称设定
  if (material[type].name) optionItem.name = global.listLanguage.item[material[type].displayName];
  //Tooltip设定
  if (material[type].tooltip) optionItem.tooltip = material[type].tooltip;
  //附魔光效设定
  if (material.enchanted === true) optionItem.glow = true;
  //燃料设定
  if (material.usage.fuel > 0) optionItem.burnTime = material.usage.fuel;
  /*推入任务队列*/
  if (material[type].build === false) {
    continue;
  } else if (material[type].build === true) {
    optionItem.modify = 'build';
  } else {
    optionItem.modify = 'modify';
  }
  global.listItem.push(optionItem);
  /*tag相关*/
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
    global.listTagItem[tag].push(optionItem.id);
  }
  /*creativetab相关*/
  //初始化itemGroup
  if (!global.listCreativeTab['minecraft:ingredients']) global.listCreativeTab['minecraft:ingredients'] = [];
  global.listCreativeTab['minecraft:ingredients'].push({ 'item': optionItem.id, 'before': 'minecraft:stick' });
  global.listCreativeTabRemove.push(optionItem.id);
  global.listCreativeTabAdd.push({ 'tab': '', 'id': optionItem.id });
  /*tooltip相关*/
  if (material[type].tooltop) global.listTooltip[optionItem.id] = material[type].tooltop;
}
