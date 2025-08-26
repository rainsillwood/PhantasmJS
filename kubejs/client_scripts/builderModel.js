// priority: 2

ClientEvents.generateAssets('last', (event) => {
  global.listModel.forEach((optionModel) => {
    let resourceLocation = optionModel.id.replace(':', `:models/${optionModel.type}/`);
    event.json(resourceLocation, optionModel.model);
  });
});
