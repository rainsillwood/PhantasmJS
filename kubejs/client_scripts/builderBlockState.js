// priority: 1

ClientEvents.generateAssets('last', (event) => {
  global.listBlockState.forEach((option) => {
    let model = `${option.namespace}:block/${option.id}`;
    let resourceLocation = `${option.namespace}:blockstates/${option.id}`;
    let listBlockState = {
      'simple': {
        'variants': {
          '': {
            'model': model,
          },
        },
      },
      'facing': {
        'variants': {
          'facing=down': {
            'model': model,
            'x': 180,
          },
          'facing=east': {
            'model': model,
            'x': 90,
            'y': 90,
          },
          'facing=north': {
            'model': model,
            'x': 90,
          },
          'facing=south': {
            'model': model,
            'x': 90,
            'y': 180,
          },
          'facing=up': {
            'model': model,
          },
          'facing=west': {
            'model': model,
            'x': 90,
            'y': 270,
          },
        },
      },
    };
    event.json(resourceLocation, listBlockState[option.state] || option.state);
  });
});
