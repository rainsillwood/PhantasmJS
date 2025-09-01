// priority: 40

//注册新物品
StartupEvents.registry('block', (event) => {
  global.listBlockBuild.forEach((option) => {
    let builder;
    let resourceLocation = `${option.namespace}:${option.id}`;
    if (option.type == 'custom') {
      let block;
      let propertyBlock = option.specialBlock;
      switch (propertyBlock.type) {
        case 'cluster': {
          block = builderBlockCluster(option);
          break;
        }
        case 'budding': {
          block = builderBlockBudding(option);
        }
        default: {
          break;
        }
      }
      builder = event.createCustom(resourceLocation, () => block);
      global.listItemBuild.push({
        'type': 'custom',
        'namespace': option.namespace,
        'id': option.id,
        'specialItem': {
          'type': 'blockItem',
          'block': builder,
        },
      });
      global.listBlockModify.push({
        'namespace': option.namespace,
        'id': option.id,
        'lightLevel': option.lightLevel,
      });
    } else {
      if (option.type == 'basic') {
        builder = event.create(resourceLocation);
      } else {
        builder = event.create(resourceLocation, option.type);
      }
      if (option.renderType) builder.renderType(option.renderType);
      if (option.fullBlock) {
        builder.fullBlock(false);
      }
      if (option.placeFacing) {
        builder.property(BlockProperties.FACING);
        builder.placementState((context) => {
          context.set(BlockProperties.FACING, context.getClickedFace());
        });
        global.listBlockState.push({
          'namespace': option.namespace,
          'id': option.id,
          'type': 'facing',
        });
      }
      if (option.waterlogged) builder.waterlogged();
      if (option.parentModel) {
        builder.parentModel(option.parentModel);
      }
      if (option.hardness) builder.hardness(option.hardness);
      if (option.resistance) builder.resistance(option.resistance);
      if (option.lightLevel) builder.lightLevel(option.lightLevel);
      if (option.requiresTool) builder.requiresTool(option.requiresTool);
      if (option.texture) {
        for (let i in option.texture) {
          builder.texture(i, option.texture[i]);
        }
      }
      if (option.randomTick) {
        switch (option.randomTick.type) {
          case 'budding': {
            builder.randomTick((event) => {
              const block = event.block;
              const level = event.level;
              const material = option.randomTick.material;
              const listBlock = [
                `${option.namespace}:small_${material}_bud`, //
                `${option.namespace}:medium_${material}_bud`,
                `${option.namespace}:large_${material}_bud`,
                `${option.namespace}:${material}_cluster`,
              ];
              if (Math.random() < 0.2) {
                let direction = Direction.VALUES[Math.floor(Math.random() * 6)];
                let targetpos = block.getPos().relative(direction);
                let targetstate = level.getBlockState(targetpos);
                let targetblock = targetstate.getBlock();
                let index = listBlock.indexOf(targetblock.getId());
                let iswater = targetstate.is(Blocks.WATER) && targetstate.getFluidState().getAmount() == 8;
                console.log(index + targetblock.getId());
                if (targetstate.isAir() || iswater) {
                  targetblock = listBlock[0];
                  level.getBlock(targetpos).set(targetblock, { 'facing': direction.getName(), 'waterlogged': iswater }, 3);
                } else if (index >= 0 && index < 3) {
                  targetblock = listBlock[index + 1];
                  console.log(targetstate.getFluidState().fluidType.toString());
                  level.getBlock(targetpos).set(targetblock, { 'facing': direction.getName(), 'waterlogged': targetstate.getFluidState().fluidType.toString() == 'minecraft:water' }, 3);
                }
              }
            });
            break;
          }
          default: {
            break;
          }
        }
      }

      //builderBlock.afterFallenOn
      //builderBlock.blockEntity
      //builderBlock.bounciness
      //builderBlock.box
      //builderBlock.canBeReplaced
      //builderBlock.canBeWaterlogged
      //builderBlock.color
      //builderBlock.copyPropertiesFrom
      //builderBlock.createProperties
      //builderBlock.cropSoundType
      //builderBlock.defaultCutout
      //builderBlock.defaultState
      //builderBlock.defaultTranslucent
      //builderBlock.detectorId()
      //builderBlock.drops
      //builderBlock.dynamicMapColor
      //builderBlock.exploded
      //builderBlock.fallenOn
      //builderBlock.opaque(optionBlock.opaque);
    }
  });
});
//修改原有物品
BlockEvents.modification((event) => {
  global.listBlockModify.forEach((option) => {
    let resourceLocation = `${option.namespace}:${option.id}`;
    event.modify(resourceLocation, (builder) => {
      if (option.hardness) builder.setDestroySpeed(option.hardness); //destroySpeed
      if (option.resistance) builder.setExplosionResistance(option.resistance);
      if (option.lightLevel) builder.setLightEmission(option.lightLevel); //lightEmission
      if (option.requiresTool) builder.setRequiresTool(option.requiresTool); //requiredTool
      //builderBlock.setFriction;
      //builderBlock.setJumpFactor;
      //builderBlock.setSpeedFactor;
      //builderBlock.setHasCollision;
      //builderBlock.setIsRandomlyTicking;
      //builderBlock.setRandomTickCallback;
      //builderBlock.setSoundType;
    });
  });
});
function builderBlockCluster(optionBlock) {
  let sound;
  const [height, offset, type] = [optionBlock.specialBlock.height, optionBlock.specialBlock.offset, optionBlock.specialBlock.subtype];
  const [hardness, resistance] = [optionBlock.hardness, optionBlock.resistance, optionBlock.lightLevel];
  switch (type) {
    case 'small_bud': {
      sound = SoundType.SMALL_AMETHYST_BUD;
      break;
    }
    case 'medium_bud': {
      sound = SoundType.MEDIUM_AMETHYST_BUD;
      break;
    }
    case 'large_bud': {
      sound = SoundType.LARGE_AMETHYST_BUD;
      break;
    }
    case 'cluster': {
      sound = SoundType.AMETHYST_CLUSTER;
      break;
    }
  }
  return new $AmethystClusterBlock(
    height,
    offset,
    $BlockBehaviour$Properties //
      .of()
      .sound(sound)
      .randomTicks()
      .forceSolidOn()
      .noCollission()
      .pushReaction($PushReaction.DESTROY)
      .explosionResistance(resistance)
      .destroyTime(hardness)
  );
}
