// priority: 9995

let creativeTab = 'intermediates';
let rarity = 0;
let parts = ['slurry', 'solution', 'extraction', 'stripping'];
parts.forEach((part) =>
  global.listMaterial.forEach((material) => {
    let type = 'intermediates'; //适用于type和part不同
    let option = material[type || part]; //获取部位设定
    if (!option || !option.build) return; //若部位不存在则取消
    let [namespace, id] = option.id == 'build' ? ['minecraft', `${material.id}_${part}`] : option.id.split(':');
    let property = option.property;
    /*属性设置*/
    //基本设定
    let optionFluid = {
      'namespace': namespace,
      'id': id,
      'type': 'thin',
      'color': material.color || 0xffffff,
      'lightLevel': property.lightLevel || 0,
      'temperature': property.temperature || 300,
      'viscosity': property.viscosity || 1000,
      'density': property.density || 1000,
    };
    let optionBlock = {
      'namespace': namespace,
      'id': id,
      //'type': 'basic',
      //'lightLevel': property.lightLevel || 0,
      //'hardness': property.hardness || 1.5,
      //'resistance': property.resistance || 1.5,
      //'requiresTool': property.requiresTool || true,
    };
    let optionItem = {
      'namespace': namespace,
      'id': `${id}_bucket`,
      //'type': 'basic',
      'rarity': material.rarity + rarity,
      'glow': material.enchanted === true ? true : false,
      //'burnTime': material.usage.fuel > 0 ? material.usage.fuel * 10 : undefined,
    };
    //针对设定
    /*构建处理*/
    if (!(property === false)) {
      /*需要构建或者修改属性*/
      //推入构建队列
      if (option.build === true) {
        global.listFluidBuild.push(optionFluid);
      } else {
        global.listFluidModify.push(optionFluid);
      }
      global.listBlockModify.push(optionBlock);
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
        'displayName': global.listLanguage.part.bucket.replace('${fluid}', displayName),
      });
      /*模型相关
      if (optionBlock.type != 'basic') {
        global.listBlockState.push({
          'namespace': option.namespace,
          'id': option.id,
          'state': 'simple',
        });
        global.listModel.push({
          'namespace': option.namespace,
          'id': option.id,
          'type': 'block',
          'model': 'cube_all',
        });
        global.listModel.push({
          'namespace': option.namespace,
          'id': option.id,
          'type': 'item',
          'model': 'simple',
        });
      }*/
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
    /*creativetab处理*/
    if (!global.listCreativeTabAdd[creativeTab]) {
      //如果存在相关creativetab
      //推入creativetab
      global.listCreativeTabAdd[creativeTab].push(optionItem.id);
      //如果为新构建,从默认栏删除
      if (option.build === true) global.listCreativeTabRemove.push(optionItem.id);
    }
    /*Tooltip处理*/
    if (option.tooltop) global.listTooltip[optionItem.id] = option.tooltop;
    /*Tag处理
    //初始化tag
    let tagBlock = [
      `c:${part}s/${material.id}`, //基础tag
      `c:${part}s`, //基础tag
      `c:${part}s_in_ground/${type}`, //基础tag
      `minecraft:${material.id}_${part}s`, //基础tag
      'minecraft:overworld_carver_replaceables',
      'minecraft:mineable/pickaxe',
    ];
    let tagItem = [
      `c:${part}s/${material.id}`, //基础tag
      `c:${part}s`, //基础tag
      `c:${part}s_in_ground/${type}`, //基础tag
      `minecraft:${material.id}_${part}s`, //基础tag
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
        dropType = 'dense';
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
      tagItem.push(`c:ore_rates/${dropType}`);
      tagBlock.push(`c:ore_rates/${dropType}`);
    }
    //挖掘等级
    if (blockstate) {
      for (let tag of global.listToolLevel[blockstate.level]) {
        tagBlock.push(tag);
      }
    }
    //其他模组金属相关tag
    //if (material.type == 'metal' || material.type == 'alloy') itemTags.push('minecolonies:blacksmith_product', 'ae2:metal_ingots'); //殖民地:铁匠产物;ae2:金属锭
    //推入Tag列表
    tagFluid.forEach((tag) => {
      if (!global.listTagBlock[tag]) global.listTagBlock[tag] = [];
      global.listTagFluid[tag].push(optionBlock.id);
    });
    tagBlock.forEach((tag) => {
      if (!global.listTagBlock[tag]) global.listTagBlock[tag] = [];
      global.listTagBlock[tag].push(optionBlock.id);
    });
    tagItem.forEach((tag) => {
      if (!global.listTagItem[tag]) global.listTagItem[tag] = [];
      global.listTagItem[tag].push(optionItem.id);
    });*/
  })
);
