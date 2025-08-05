// priority: 10

/*
StartupEvents.registry('creative_mode_tab', (event) => {
  event
    .create('dirt')
    .icon(() => 'minecraft:dirt')
    .content(() => ['minecraft:dirt', 'minecraft:grass_block', 'minecraft:podzol', 'minecraft:coarse_dirt', 'minecraft:rooted_dirt']);
});
StartupEvents.modifyCreativeTab('minecraft:functional_blocks', (event) => {
  // Change tab icon
  event.icon = 'kubejs:example_block';
  // Change display name. Technically supports formatting, but it's not recommended
  event.displayName = Text.darkRed('Functional Blocks!');
});
*/
StartupEvents.modifyCreativeTab('kubejs:tab', (event) => {
  for (let item of global.listCreativeTabRemove) {
    event.remove(item);
  }
});
for (let CreativeTab in global.listCreativeTab) {
  StartupEvents.modifyCreativeTab(CreativeTab, (event) => {
    let listItem = global.listCreativeTab[CreativeTab];
    for (let setItem of listItem) {
      event.addBefore(setItem.before, setItem.item); //before 不起作用?
    }
  });
}
