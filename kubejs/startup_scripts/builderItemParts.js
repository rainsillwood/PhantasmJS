// priority: 9996

let creativeTab = 'parts';
let rarity = 1;
for (let part of ['dust', 'powder', 'gear', 'plate', 'sheet']) {
  for (let material of global.listMaterial) {
    let optionPart = material[part];
    if (!optionPart) continue;
    //基本设定
    let id = `${material.id}_${part}`;
    let optionItem = {
      'type': 'basic',
      'rarity': material.rarity + rarity,
      'id': `minecraft:${id}`,
    };
    //针对设定
    //名称设定
    if (!optionPart.displayName) {
      optionItem.displayName = global.listLanguage.part[part].replace('${material}', global.listLanguage.material[material.id]);
    } else {
      optionItem.displayName = global.listLanguage.item[optionPart.displayName];
    }
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
      global.listItemBuild.push(optionItem);
    } else {
      optionItem.id = optionPart.build;
      global.listItemModify.push(optionItem);
    }
    /*材质相关*/
    global.listTexture.push({
      'location': `minecraft:item/${id}`,
      'layers': [
        {
          'path': `minecraft:parts/${part}`,
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
    if (optionPart.build === true) global.listCreativeTabRemove.push(optionItem.id);
    /*tooltip相关*/
    if (optionPart.tooltop) global.listTooltip[optionItem.id] = optionPart.tooltop;
  }
}
