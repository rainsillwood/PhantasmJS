// priority: 50

//注册新物品
StartupEvents.registry('fluid', (event) => {
  global.listFluidBuild.forEach((option) => {
    let builder;
    let resourceLocation = `${option.namespace}:${option.id}`;
    if (option.textures) {
      builder = event.create(resourceLocation);
      builder.stillTexture(option.texture.still);
      builder.flowingTexture(option.texture.flowing);
    } else {
      builder = event.create(resourceLocation, option.type);
      builder.tint(option.color);
    }
    if (option.resistance) builder.explosionResistance(option.resistance);
    builder.fluidType.lightLevel(option.luminosity || 0);
    builder.fluidType.temperature(option.temperature || 300);
    builder.fluidType.viscosity(option.viscosity || 1000);
    builder.fluidType.density(option.density || 1000);
    //builderFluid.slopeFindDistance
    //builderFluid.levelDecreasePerBlock
    //builderFluid.tickRate
    //builderFluid.translucent()
  });
});
//修改原有物品
global.listFluidModify.forEach((optionFluid) => {
  let resourceLocation = `${option.namespace}:${option.id}`;
  let builder = Fluid.getType(resourceLocation);
  //if (optionFluid.luminosity) builderFluid.getFluidType().lightLevel = optionFluid.luminosity;
  //if (optionFluid.temperature) builderFluid.fluidType.temperature = optionFluid.temperature;
  //if (optionFluid.viscosity) builderFluid.fluidType.viscosity = optionFluid.viscosity;
  //if (optionFluid.density) builderFluid.fluidType.density = optionFluid.density;
  //if (optionFluid.resistance)
});
