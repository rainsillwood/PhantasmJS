// priority: 9999

let part = 'ore';
let creativeTab = 'intermediates';
let rarity = 0;
for (let material of global.listMaterial) {
  let listStone = ['stone', 'deepslate', 'nether', 'end'];
  for (let i = 0; i < listStone.length; i++) {
    let type = listStone[i];
    let optionPart = material[part][type];
    if (!optionPart) continue;
    //基本设定
    let id = `${type == 'stone' ? '' : type + '_'}${material.id}_${part}`;
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
      optionItem.displayName = global.listLanguage.part[`${type}_${part}`].replace('${material}', global.listLanguage.material[material.id]);
    } else {
      optionItem.displayName = global.listLanguage.item[optionPart.displayName];
    }
    optionBlock.displayName = optionItem.displayName;
    //Tooltip设定
    if (optionPart.tooltip) optionItem.tooltip = optionPart.tooltip;
    //附魔光效设定
    if (material.enchanted === true) optionItem.glow = true;
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
          'path': `minecraft:stones/${type}`,
        },
        {
          'path': `minecraft:parts/ore_${type}`,
          'color': material.color,
        },
      ],
    });
    /*tag相关*/
    //初始化tag
    let itemTags = [
      `c:${part}s/${material.id}`, //基础tag
      `c:${part}s`, //基础tag
      `c:${part}s_in_ground/${type}`, //基础tag
      `minecraft:${material.id}_${part}s`, //基础tag
    ];
    let blockTags = [
      `c:${part}s/${material.id}`, //基础tag
      `c:${part}s`, //基础tag
      `c:${part}s_in_ground/${type}`, //基础tag
      `minecraft:${material.id}_${part}s`, //基础tag
      'minecraft:overworld_carver_replaceables',
      'minecraft:mineable/pickaxe',
    ];
    let dropType;
    switch (material.type) {
      case 'metal': {
        dropType = 'singular';
        break;
      }
      case 'alloy': {
        dropType = 'singular';
        break;
      }
      case 'gem': {
        dropType = 'dense';
        break;
      }
      case 'mineral': {
        dropType = '  ';
        break;
      }
      case '？？？': {
        dropType = 'sparse';
        break;
      }
      default: {
        break;
      }
    }
    if (!!dropType) {
      itemTags.push(`c:ore_rates/${dropType}`);
      blockTags.push(`c:ore_rates/${dropType}`);
    }
    //挖掘等级
    if (blockstate) {
      for (let tag of global.listToolLevel[blockstate.level]) {
        blockTags.push(tag);
      }
    }
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
}
