// priority: 9994

let creativeTab = 'parts';
let rarity = 1;
let parts = ['casing'];
parts.forEach((part) => {
  global.listMaterial.forEach((material) => {
    let type = undefined; //适用于type和part不同
    let option = material[type || part]; //获取部位设定
    if (!option || !option.build) return; //若部位不存在则取消
    let [namespace, id] = option.id == 'build' ? ['minecraft', `${material.id}_${part}`] : option.id.split(':');
    let property = option.property;
    /*属性设置*/
    //基本设定
    let optionBlock = {
      'namespace': namespace,
      'id': id,
      'type': 'basic',
      'hardness': property.hardness || 1.5,
      'resistance': property.resistance || 1.5,
      'lightLevel': property.lightLevel || 0,
      'requiresTool': property.requiresTool || true,
    };
    let optionItem = {
      'namespace': namespace,
      'id': `${id}_bucket`,
      'rarity': material.rarity + rarity,
    };
    //针对设定
    //附魔光效设定
    if (material.enchanted === true) optionItem.glow = true;
    //燃料设定
    //if (material.usage.fuel > 0) optionItem.burnTime = material.usage.fuel * 10;
    /*构建处理*/
    if (!(property === false)) {
      //需要构建或者修改属性
      /*推入构建队列*/
      if (option.build === true) {
        global.listBlockBuild.push(optionFluid);
      } else {
        global.listBlockModify.push(optionFluid);
      }
      global.listItemModify.push(optionItem);
      /*名称处理*/
      let displayName = option.displayName || global.listLanguage.part[part].replace('${material}', global.listLanguage.material[material.id]);
      //修改方块名称
      global.listLanguageTable.push({
        'namespace': optionBlock.namespace,
        'id': optionBlock.id,
        'type': 'block',
        'displayName': displayName,
      });
      //修改物品名称
      global.listLanguageTable.push({
        'namespace': optionItem.namespace,
        'id': optionItem.id,
        'type': 'item',
        'displayName': displayName,
      });
      /*模型相关*/
      global.listModel.push({
        'namespace': option.namespace,
        'id': option.id,
        'type': 'block',
        'model': 'cube_all',
      });
      global.listBlockState.push({
        'namespace': option.namespace,
        'id': option.id,
        'state': 'simple',
      });
      global.listModel.push({
        'namespace': option.namespace,
        'id': option.id,
        'type': 'item',
        'model': 'simple',
      });
      /*材质相关
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
      });*/
    }
  });
});
for (let material of global.listMaterial) {
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
  global.listCreativeTabAdd[creativeTab].push(optionItem.id);
  if (optionPart.build === true) global.listCreativeTabRemove.push(optionItem.id);
  /*tooltip相关*/
  if (optionPart.tooltop) global.listTooltip[optionItem.id] = optionPart.tooltop;
}
