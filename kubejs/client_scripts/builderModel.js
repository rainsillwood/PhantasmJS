// priority: 2

ClientEvents.generateAssets('last', (event) => {
  global.listModel.forEach((option) => {
    let resourceLocation = `${option.namespace}:models/${option.type}/${option.id}`;
    let listModel = {
      'block': {
        'cube_all': {
          'parent': 'minecraft:block/cube_all',
          'textures': {
            'all': `${option.namespace}:block/${option.id}`,
          },
        },
        'cross': {
          'parent': 'minecraft:block/cross',
          'textures': {
            'cross': `${option.namespace}:block/${option.id}`,
          },
        },
      },
      'item': {
        'simple': {
          'parent': 'minecraft:item/generated',
          'textures': {
            'layer0': `${option.namespace}:item/${option.id}`,
          },
        },
        'block': {
          'parent': `${option.namespace}:block/${option.id}`,
        },
        'cluster': {
          'parent': 'minecraft:item/generated',
          'textures': {
            'layer0': `${option.namespace}:block/${option.id}`,
          },
          'display': {
            'head': {
              'translation': [0, 14, -5],
            },
          },
        },
        'bud': {
          'parent': 'minecraft:item/generated',
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
    };
    let model = listModel[option.type][option.model];
    event.json(resourceLocation, model || option.model);
  });
});
