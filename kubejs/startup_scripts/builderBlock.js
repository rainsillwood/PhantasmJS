// priority: 40

const _BlockBehaviour_Properties = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour$Properties');
const _AmethystClusterBlock = Java.loadClass('net.minecraft.world.level.block.AmethystClusterBlock');
const _Fluids = Java.loadClass('net.minecraft.world.level.material.Fluids');

//注册新物品
StartupEvents.registry('block', (event) => {
  global.listBlockBuild.forEach((optionBlock) => {
    let builderBlock;
    if (optionBlock.type == 'custom') {
      let block;
      let propertyBlock = optionBlock.specialBlock;
      switch (propertyBlock.type) {
        case 'cluster': {
          block = builderBlockCluster(optionBlock);
          break;
        }
        case 'budding': {
          block = builderBlockBudding(optionBlock);
        }
        default: {
          break;
        }
      }
      /*let provider = Utils.lazy(() => block);
      builderBlock = event['createCustom(dev.latvian.mods.kubejs.util.KubeResourceLocation,java.util.function.Supplier)'](optionBlock.id, provider);
      */
      builderBlock = event.createCustom(optionBlock.id, () => block);
      global.listItemBuild.push({
        'type': 'custom',
        'id': optionBlock.id,
        'specialItem': {
          'type': 'blockItem',
          'block': builderBlock,
        },
      });
      global.listBlockModify.push({
        'id': optionBlock.id,
        'lightLevel': optionBlock.lightLevel,
      });
      global.listModel.push(
        optionBlock.model || {
          'id': optionBlock.id,
          'type': 'block',
          'model': {
            'parent': 'minecraft:block/cube_all',
            'textures': {
              'all': optionBlock.id.replace(':', ':block/'),
            },
          },
          'render_type': 'solid',
        }
      );
      global.listModel.push(
        optionBlock.modelItem || {
          'id': optionBlock.id,
          'type': 'item',
          'model': {
            'parent': optionBlock.id.replace(':', ':block/'),
          },
        }
      );
      global.listBlockState.push(
        optionBlock.blockstate || {
          'id': optionBlock.id,
          'state': 'simple',
        }
      );
    } else {
      if (optionBlock.type == 'basic') {
        builderBlock = event.create(optionBlock.id);
      } else {
        builderBlock = event.create(optionBlock.id, optionBlock.type);
      }
      if (optionBlock.renderType) builderBlock.renderType(optionBlock.renderType);
      if (optionBlock.fullBlock) {
        builderBlock.fullBlock(false);
      }
      if (optionBlock.placeFacing) {
        builderBlock.property(BlockProperties.FACING);
        builderBlock.placementState((context) => {
          context.set(BlockProperties.FACING, context.getClickedFace());
        });
        global.listBlockState.push({
          'id': optionBlock.id,
          'type': 'facing',
        });
      }
      if (optionBlock.waterlogged) builderBlock.waterlogged();
      if (optionBlock.parentModel) {
        builderBlock.parentModel(optionBlock.parentModel);
      }
      if (optionBlock.hardness) builderBlock.hardness(optionBlock.hardness);
      if (optionBlock.resistance) builderBlock.resistance(optionBlock.resistance);
      if (optionBlock.lightLevel) builderBlock.lightLevel(optionBlock.lightLevel);
      if (optionBlock.requiresTool) builderBlock.requiresTool(optionBlock.requiresTool);
      if (optionBlock.texture) {
        for (let i in optionBlock.texture) {
          builderBlock.texture(i, optionBlock.texture[i]);
        }
      }
      if (optionBlock.randomTick) {
        switch (optionBlock.randomTick.type) {
          case 'budding': {
            builderBlock.randomTick((event) => {
              const block = event.block;
              const level = event.level;
              const Direction = Java.loadClass('net.minecraft.core.Direction');
              const material = optionBlock.randomTick.material;
              const listBlock = [
                `minecraft:small_${material}_bud`, //
                `minecraft:medium_${material}_bud`,
                `minecraft:large_${material}_bud`,
                `minecraft:${material}_cluster`,
              ];
              if (Math.random() < 0.2) {
                let direction = Direction.values()[Math.floor(Math.random() * 6)];
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
    global.listLanguageTable.push({
      'type': 'block',
      'id': optionBlock.id,
      'displayName': optionBlock.displayName,
    });
  });
});
//修改原有物品
BlockEvents.modification((event) => {
  global.listBlockModify.forEach((optionBlock) => {
    global.listLanguageTable.push({
      'type': 'block',
      'id': optionBlock.id,
      'displayName': optionBlock.displayName,
    });
    event.modify(optionBlock.id, (builderBlock) => {
      if (optionBlock.hardness) builderBlock.setDestroySpeed(optionBlock.hardness); //destroySpeed
      if (optionBlock.resistance) builderBlock.setExplosionResistance(optionBlock.resistance);
      if (optionBlock.lightLevel) builderBlock.setLightEmission(optionBlock.lightLevel); //lightEmission
      if (optionBlock.requiresTool) builderBlock.setRequiresTool(optionBlock.requiresTool); //requiredTool
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
  return new _AmethystClusterBlock(
    height,
    offset,
    _BlockBehaviour_Properties //
      .of()
      .sound(sound)
      .randomTicks()
      .forceSolidOn()
      .noCollission()
      .pushReaction(_PushReaction.DESTROY)
      .explosionResistance(resistance)
      .destroyTime(hardness)
  );
}
function randomTickBudding(tick, material) {}
