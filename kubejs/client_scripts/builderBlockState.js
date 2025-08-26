// priority: 1

ClientEvents.generateAssets('last', (event) => {
  global.listBlockState.forEach((optionBlockState) => {
    let model = optionBlockState.id.replace(':', ':block/');
    let resourceLocation = optionBlockState.id.replace(':', ':blockstates/');
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
    event.json(resourceLocation, listBlockState[optionBlockState.state] || optionBlockState.state);
  });
});
