let $Item$Properties = Java.loadClass('net.minecraft.world.item.Item$Properties');
let $BlockBehaviour$Properties = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour$Properties');
let $AmethystClusterBlock = Java.loadClass('net.minecraft.world.level.block.AmethystClusterBlock');

let testBlock;
StartupEvents.registry('block', (event) => {
  testBlock = event.createCustom('kubejs:testblock', () => new $AmethystClusterBlock(7, 3, $BlockBehaviour$Properties.ofFullCopy(Blocks.AMETHYST_CLUSTER)));
});

let $BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem');

StartupEvents.registry('item', (event) => {
  event.createCustom('kubejs:testblockitem', () => new $BlockItem(testBlock.get(), new $Item$Properties()));
});
