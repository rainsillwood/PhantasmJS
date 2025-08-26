// priority: 10

const listCreativeTab = [
  {
    'id': 'parts',
    'icon': 'minecraft:iron_ingot',
  },
  {
    'id': 'intermediates',
    'icon': 'minecraft:raw_iron',
  },
];
StartupEvents.registry('creative_mode_tab', (event) => {
  for (let i = 0; i < listCreativeTab.length; i++) {
    let optionTab = listCreativeTab[i];
    let tabId = optionTab.id;
    let tab = event.create(`minecraft:${tabId}`);
    tab.icon(() => optionTab.icon);
    tab.displayName = global.listLanguage.creativeTab[tabId];
    tab.content(() => ['minecraft:barrier']);
  }
});
/*
StartupEvents.modifyCreativeTab('minecraft:functional_blocks', (event) => {
  // Change tab icon
  event.icon = 'kubejs:example_block';
  // Change display name. Technically supports formatting, but it's not recommended
  event.displayName = Text.darkRed('Functional Blocks!');
});
*/
StartupEvents.modifyCreativeTab('minecraft:ingredients', (event) => {
  event.setIcon('minecraft:bone');
  let listRemove = [
    'minecraft:iron_ingot', //
    'minecraft:raw_iron',
    'minecraft:iron_nugget',
    //'minecraft:raw_copper',
    //'minecraft:raw_gold',
    //'minecraft:emerald',
    //'minecraft:lapis_lazuli',
    //'minecraft:diamond',
    //'minecraft:amethyst_shard',
    //'minecraft:gold_nugget',
    //'minecraft:copper_ingot',
    //'minecraft:gold_ingot',
    //'minecraft:netherite_ingot',
  ];
  for (let item of listRemove) {
    event.remove(item);
  }
});
StartupEvents.modifyCreativeTab('minecraft:natural_blocks', (event) => {
  let listRemove = [
    //'minecraft:coal_ore', //
    //'minecraft:deepslate_coal_ore',
    'minecraft:iron_ore',
    'minecraft:deepslate_iron_ore',
    //'minecraft:copper_ore',
    //'minecraft:deepslate_copper_ore',
    //'minecraft:gold_ore',
    //'minecraft:deepslate_gold_ore',
    //'minecraft:redstone_ore',
    //'minecraft:deepslate_redstone_ore',
    //'minecraft:emerald_ore',
    //'minecraft:deepslate_emerald_ore',
    //'minecraft:lapis_ore',
    //'minecraft:deepslate_lapis_ore',
    //'minecraft:diamond_ore',
    //'minecraft:deepslate_diamond_ore',
    'minecraft:raw_iron_block',
    //'minecraft:raw_copper_block',
    //'minecraft:raw_gold_block',
    //'minecraft:amethyst_block',
    //'minecraft:glowstone',
    //'minecraft:budding_amethyst',
    //'minecraft:small_amethyst_bud',
    //'minecraft:medium_amethyst_bud',
    //'minecraft:large_amethyst_bud',
    //'minecraft:amethyst_cluster',
    //'minecraft:slime_block',
    //'minecraft:honey_block',
    //'minecraft:honeycomb_block',
  ];
  for (let item of listRemove) {
    event.remove(item);
  }
});
StartupEvents.modifyCreativeTab('minecraft:building_blocks', (event) => {
  let listRemove = [
    //'minecraft:gold_block', //
    //'minecraft:redstone_block',
    //'minecraft:emerald_block',
    //'minecraft:lapis_block',
    //'minecraft:diamond_block',
    //'minecraft:netherite_block',
    //'minecraft:copper_block',
    //'minecraft:amethyst_block',
    'minecraft:iron_block',
    //'minecraft:coal_block',
  ];
  for (let item of listRemove) {
    event.remove(item);
  }
});
StartupEvents.modifyCreativeTab('kubejs:tab', (event) => {
  for (let item of global.listCreativeTabRemove) {
    event.remove(item);
  }
});

for (let tabId in global.listCreativeTabAdd) {
  let listItem = global.listCreativeTabAdd[tabId];
  StartupEvents.modifyCreativeTab(tabId, (event) => {
    event.remove('minecraft:barrier');
    for (let setItem of listItem) {
      if (setItem.before) {
        event.addBefore(setItem.before, setItem.item); //before 不起作用?
      } else {
        event.add(setItem);
      }
    }
  });
}
