// priority: 9997

let part = 'storage_block';
let creativeTab = 'parts';
let rarity = 0;
for (let material of global.listMaterial) {
  let optionPart = material[part];
  //基本设定
  let optionItem = {
    'type': 'basic',
    'rarity': material.rarity + rarity,
  };
  let optionBlock = {
    'type': 'basic',
  };
  optionBlock.id = `minecraft:${material.id}_block`;
  optionItem.id = optionBlock.id;
  //针对设定
  //名称设定
  if (optionPart.displayName) {
    optionItem.displayName = global.listLanguage.item[optionPart.displayName];
  } else {
    optionItem.displayName = global.listLanguage.part[part].replace('${material}', global.listLanguage.material[material.id]);
  }
  optionBlock.displayName = optionItem.displayName;
  //硬度设定
  if (optionPart.blockstate.hardness) optionBlock.hardness = optionPart.hardness;
  //爆炸抗性设定
  if (optionPart.blockstate.resistance) optionBlock.resistance = optionPart.resistance;
  //亮度设定
  if (optionPart.blockstate.lightLevel) optionBlock.lightLevel = optionPart.lightLevel;
  //挖掘等级设定
  optionBlock.requiresTool = true;
  if (optionPart.blockstate.level) optionItem.lightLevel = optionPart.lightLevel;
  //Tooltip设定
  if (optionPart.tooltip) optionItem.tooltip = optionPart.tooltip;
  //附魔光效设定
  if (material.enchanted === true) optionItem.glow = true;
  //燃料设定
  if (material.usage.fuel > 0) optionItem.burnTime = material.usage.fuel;
  /*推入任务队列*/
  if (optionPart.build === false) {
    continue;
  } else if (optionPart.build === true) {
    global.listBlockBuild.push(optionItem);
  } else {
    optionItem.id = optionPart.build;
    global.listBlockModify.push(optionItem);
  }
  global.listItemModify.push(optionItem);
  /*tag相关*/
  //初始化tag
  let itemTags = [
    `c:${part}s/${material.id}`, //基础tag
    `c:${part}s`, //基础tag
  ];
  let blockTags = [
    `c:${part}s/${material.id}`, //基础tag
    `c:${part}s`, //基础tag
    `minecraft:${part}s`, //基础tag
    `'minecraft:${material.id}_${part}s`, //基础tag,挖掘加速
  ];
  //挖掘等级tag
  switch (optionPart.blockstate.level) {
    case 0: {
      //木&金
      break;
    }
    case 1: {
      //石&铜
      blockTags.push(
        'minecraft:incorrect_for_wooden_tool', //
        'minecraft:incorrect_for_gold_tool'
      );
      blockTags.push('minecraft:needs_stone_tool');
      break;
    }
    case 2: {
      //铁
      blockTags.push(
        'minecraft:incorrect_for_wooden_tool', //
        'minecraft:incorrect_for_gold_tool',
        'minecraft:incorrect_for_stone_tool',
        'minecraft:incorrect_for_copper_tool'
      );
      blockTags.push('minecraft:needs_iron_tool');
      break;
    }
    case 3: {
      //钻
      blockTags.push(
        'minecraft:incorrect_for_wooden_tool', //
        'minecraft:incorrect_for_gold_tool',
        'minecraft:incorrect_for_stone_tool',
        'minecraft:incorrect_for_copper_tool',
        'minecraft:incorrect_for_iron_tool'
      );
      blockTags.push('minecraft:needs_diamond_tool');
      break;
    }
    case 4: {
      //下界
      blockTags.push(
        'minecraft:incorrect_for_wooden_tool', //
        'minecraft:incorrect_for_gold_tool',
        'minecraft:incorrect_for_stone_tool',
        'minecraft:incorrect_for_copper_tool',
        'minecraft:incorrect_for_iron_tool',
        'minecraft:incorrect_for_diamond_tool'
      );
      blockTags.push('minecraft:needs_netherite_tool');
      break;
    }
    case 5: {
      //下界之上
      blockTags.push(
        'minecraft:incorrect_for_wooden_tool', //
        'minecraft:incorrect_for_gold_tool',
        'minecraft:incorrect_for_stone_tool',
        'minecraft:incorrect_for_copper_tool',
        'minecraft:incorrect_for_iron_tool',
        'minecraft:incorrect_for_diamond_tool',
        'minecraft:incorrect_for_netherite_tool'
      );
      break;
    }
    default: {
      break;
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
  /*creativetab相关*/
  //初始化itemGroup
  if (!global.listCreativeTabAdd[creativeTab]) global.listCreativeTabAdd[creativeTab] = [];
  global.listCreativeTabAdd[creativeTab].push(optionItem.id);
  global.listCreativeTabRemove.push(optionItem.id);
  /*tooltip相关*/
  if (optionPart.tooltop) global.listTooltip[optionItem.id] = optionPart.tooltop;
}
