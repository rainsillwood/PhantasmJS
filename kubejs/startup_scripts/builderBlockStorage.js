// priority: 9999

let part = 'storage_block';
let creativeTab = 'parts';
let rarity = 1;
for (let material of global.listMaterial) {
  let optionPart = material[part];
  if (!optionPart) continue;
  //基本设定
  let id = `${material.id}_block`;
  let optionItem = {
    'type': 'basic',
    'id': `minecraft:${id}`,
    'rarity': material.rarity + rarity,
  };
  let optionBlock = {
    'type': 'basic',
    'id': optionItem.id,
  };
  //方块属性设定
  let blockstate = optionPart.blockstate;
  if (blockstate) {
    optionBlock.hardness = blockstate.hardness; //硬度设定
    optionBlock.resistance = blockstate.resistance; //爆炸抗性设定
    optionBlock.lightLevel = blockstate.lightLevel; //亮度设定
    optionBlock.requiresTool = optionBlock.requiresTool;
  }
  //名称设定
  if (!optionPart.displayName) {
    optionItem.displayName = global.listLanguage.part[part].replace('${material}', global.listLanguage.material[material.id]);
  } else {
    optionItem.displayName = global.listLanguage.item[optionPart.displayName];
  }
  optionBlock.displayName = optionItem.displayName;
  //Tooltip设定
  if (optionPart.tooltip) optionItem.tooltip = optionPart.tooltip;
  //附魔光效设定
  if (material.enchanted === true) optionItem.glow = true;
  //燃料设定
  if (material.usage.fuel > 0) optionItem.burnTime = material.usage.fuel * 8;
  /*推入任务队列*/
  if (optionPart.build === false) {
    continue;
  } else if (optionPart.build === true) {
    global.listBlockBuild.push(optionBlock);
  } else {
    optionBlock.id = optionPart.build;
    global.listBlockModify.push(optionBlock);
  }
  global.listItemModify.push(optionItem);
  /*材质相关*/
  global.listTexture.push({
    'location': `minecraft:block/${id}`,
    'layers': [
      {
        'path': `minecraft:parts/block_${material.type}${material.subtype}`,
        'color': material.color,
      },
    ],
  });
  /*tag相关*/
  //初始化tag
  let itemTags = [
    `c:${part}s/${material.id}`, //基础tag
    `c:${part}s`, //基础tag
  ];
  let blockTags = [
    `c:${part}s/${material.id}`, //基础tag
    `c:${part}s`, //基础tag
    'minecraft:mineable/pickaxe',
  ];
  //挖掘等级
  if (blockstate) {
    for (let tag of global.listToolLevel[blockstate.level]) {
      blockTags.push(tag);
    }
  }
  //信标基座tag
  if (material.usage.bacon) blockTags.push('minecraft:beacon_base_blocks');
  //其他模组金属相关tag
  //if (material.type == 'metal' || material.type == 'alloy') itemTags.push('minecolonies:blacksmith_product', 'ae2:metal_ingots'); //殖民地:铁匠产物;ae2:金属锭
  for (let tag of itemTags) {
    if (!global.listTagItem[tag]) global.listTagItem[tag] = [];
    global.listTagItem[tag].push(optionItem.id);
  }
  for (let tag of blockTags) {
    if (!global.listTagBlock[tag]) global.listTagBlock[tag] = [];
    global.listTagBlock[tag].push(optionBlock.id);
  }
  /*creativetab相关*/
  //初始化itemGroup
  if (!global.listCreativeTabAdd[creativeTab]) global.listCreativeTabAdd[creativeTab] = [];
  //加入指定列表
  global.listCreativeTabAdd[creativeTab].push(optionItem.id);
  //从默认列表删除
  if (optionPart.build === true) global.listCreativeTabRemove.push(optionItem.id);
  /*tooltip相关*/
  if (optionPart.tooltop) global.listTooltip[optionItem.id] = optionPart.tooltop;
}
