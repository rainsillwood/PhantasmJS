// priority: 50

//注册新物品
StartupEvents.registry('fluid', (event) => {
  for (let optionFluid of global.listFluidBuild) {
    let builderFluid;
    if (optionFluid.texture) {
      builderFluid = event.create(optionFluid.id);
      builderFluid.stillTexture(optionFluid.texture[0]);
      builderFluid.flowingTexture(optionFluid.texture[1]);
    } else {
      builderFluid = event.create(optionFluid.id, optionFluid.type);
    }
    builderFluid.displayName(optionFluid.displayName);
    builderFluid.tint(optionFluid.color);
    if (optionFluid.resistance) builderFluid.explosionResistance(optionFluid.resistance);
    //builderFluid.renderType
    //builderFluid.slopeFindDistance
    //builderFluid.levelDecreasePerBlock
    //builderFluid.tickRate
    //builderFluid.translucent()
    
    //builderFluid.luminosity(optionFluid.luminosity);
    //builderFluid.density(optionFluid.density);
    //builderFluid.temperature(optionFluid.temperature);
    //builderFluid.viscosity(optionFluid.viscosity);
  }
});
/*/修改原有物品
Fluid.modification((event) => {
  for (let optionFluid of global.listFluidModify) {

  }
});*/
