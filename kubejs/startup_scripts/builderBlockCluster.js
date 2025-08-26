// priority: 9998

let part = 'cluster';
let listStage = [
  'budding_${material}',
  'small_${material}_bud', //
  'medium_${material}_bud',
  'large_${material}_bud',
  '${material}_cluster',
];
let creativeTab = 'intermediates';
let rarity = 0;
for (let i = 0; i < listStage.length; i++) {
  for (let material of global.listMaterial) {
    let optionPart = material[part];
    if (!optionPart) continue;
    let materialId = material.id;
    let id = listStage[i].replace('${material}', materialId);
    //基本设定
    let optionItem = {
      'type': 'basic',
      'id': `minecraft:${id}`,
      'rarity': material.rarity + rarity,
    };
    let optionBlock = {
      'type': 'custom',
      'id': optionItem.id,
      'material': materialId,
      'model': {
        'id': optionItem.id,
        'type': 'block',
        'model': {
          'parent': 'minecraft:block/cross',
          'textures': {
            'cross': `minecraft:block/${id}`,
          },
          'render_type': 'cutout',
        },
      },
      'modelItem': {
        'id': optionItem.id,
        'type': 'item',
        'model': {
          'parent': 'minecraft:item/generated',
          'textures': {
            'layer0': `minecraft:block/${id}`,
          },
          'display': {
            'firstperson_righthand': {
              'rotation': [0, -90, 25],
              'translation': [0, 5, 0],
              'scale': [0.68, 0.68, 0.68],
            },
            'thirdperson_righthand': {
              'translation': [0, 4, 1],
              'scale': [0.55, 0.55, 0.55],
            },
            'head': {
              'translation': [0, 14, -5],
            },
            'gui': {
              'translation': [0, 2, 0],
            },
          },
        },
      },
      'blockstate': {
        'id': optionItem.id,
        'state': 'facing',
      },
    };
    //方块属性设定
    optionBlock.hardness = 1.5; //硬度设定
    optionBlock.resistance = 1.5; //爆炸抗性设定
    optionBlock.requiresTool = false;
    optionBlock.specialBlock = {};
    //生长设定
    let arrayType = id.split('_');
    if (arrayType[0] != 'budding') {
      optionBlock.specialBlock.type = 'cluster';
      arrayType.splice(-2, 1);
      optionBlock.specialBlock.subtype = arrayType.join('_');
    } else {
      optionBlock.specialBlock.type = 'budding';
      optionBlock.growCluster = listStage.map((text) => text.replace('${material}', materialId));
      optionBlock.randomTick = 0.2;
      arrayType.pop();
      arrayType[0] = arrayType[0] + '_block';
    }
    //亮度设定
    switch (arrayType[0]) {
      case 'small': {
        optionBlock.specialBlock.height = 3;
        optionBlock.specialBlock.offset = 4;
        optionBlock.lightLevel = 1;
        break;
      }
      case 'medium': {
        optionBlock.specialBlock.height = 4;
        optionBlock.specialBlock.offset = 3;
        optionBlock.lightLevel = 2;
        break;
      }
      case 'large': {
        optionBlock.specialBlock.height = 5;
        optionBlock.specialBlock.offset = 3;
        optionBlock.lightLevel = 4;
        break;
      }
      case 'cluster': {
        optionBlock.specialBlock.height = 7;
        optionBlock.specialBlock.offset = 3;
        optionBlock.lightLevel = 5;
        optionBlock.modelItem.model = {
          'parent': 'minecraft:item/generated',
          'textures': {
            'layer0': `minecraft:block/${id}`,
          },
          'display': {
            'head': {
              'translation': [0, 14, -5],
            },
          },
          'render_type': 'cutout',
        };
        break;
      }
      default: {
        optionBlock.type = 'basic';
        optionBlock.hardness = 1.5; //硬度设定
        optionBlock.resistance = 1.5; //爆炸抗性设定
        optionBlock.requiresTool = true;
        optionBlock.randomTick = {
          'type': 'budding',
          'material': materialId,
        };
        delete optionBlock.model;
        delete optionBlock.modelItem;
        delete optionBlock.blockstate;
        break;
      }
    }
    //名称设定
    if (!optionPart.displayName) {
      optionItem.displayName = global.listLanguage.part[arrayType.join('_')].replace('${material}', global.listLanguage.material[materialId]);
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
          'path': `minecraft:parts/${arrayType.join('_')}`,
          'color': material.color,
        },
      ],
    });
    /*tag相关*/
    //初始化tag
    arrayType.reverse();
    let itemTags = [
      `c:${arrayType[0]}s`, //基础tag
      `c:${arrayType[0]}s/${materialId}`, //基础tag
    ];
    let blockTags = [
      `c:${arrayType[0]}s`, //基础tag
      `c:${arrayType[0]}s/${materialId}`, //基础tag
      'minecraft:mineable/pickaxe',
      'minecraft:crystal_sound_blocks',
    ];
    //挖掘等级
    for (let tag of global.listToolLevel[0]) {
      blockTags.push(tag);
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
