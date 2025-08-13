// priority: 40

//注册新物品
StartupEvents.registry('block', (event) => {
  for (let optionBlock of global.listBlockBuild) {
    let builderBlock;
    if (optionBlock.type == 'basic') {
      builderBlock = event.create(optionBlock.id);
    } else {
      builderBlock = event.create(optionBlock.id, optionBlock.type);
    }
    builderBlock.displayName(optionBlock.displayName);
    //mapColor
    //soundType
    //property
    builderBlock.hardness(optionBlock.hardness);
    builderBlock.resistance(optionBlock.resistance);
    builderBlock.lightLevel(optionBlock.lightLevel);
    //builderBlock.opaque(optionBlock.opaque);
    //builderBlock.fullBlock(optionBlock.fullBlock);
    builderBlock.requiresTool(optionBlock.requiresTool);
    //builderBlock.renderType(optionBlock.renderType);
    //color
    //textureAll
    //texture
    //model
    //noItem
    //box
    //noCollision
    //notSolid
    //waterlogged
    //noDrops
    //slipperiness
    //speedFactor
    //jumpFactor
    //randomTick
    //item
    //setLootTableJson
    //setBlockstateJson
    //setModelJson
    //noValidSpawns
    //suffocating
    //viewBlocking
    //redstoneConductor
    //transparent
    //defaultCutout
    //defaultTranslucent
  }
});
//修改原有物品
BlockEvents.modification((event) => {
  for (let optionBlock of global.listBlockModify) {
    event.modify(optionBlock.id, (builderBlock) => {
      //material
      //hasCollision
      //destroySpeed
      //explosionResistance
      //randomlyTicking
      //soundType
      //friction
      //speedFactor
      //jumpFactor
      //lightEmission
      //requiredTool
    });
  }
});
