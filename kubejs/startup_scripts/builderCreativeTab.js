// priority: 10

let listCreativeTab = [
  {
    'id': 'part',
    'icon': 'minecraft:glowstone_dust',
  },
  {
    'id': 'intermediate',
    'icon': 'minecraft:raw_iron',
  },
];
for (let optionTab of listCreativeTab) {
  StartupEvents.registry('creative_mode_tab', (event) => {
    let tabId = optionTab.id;
    let tab = event.create(`minecraft:${tabId}s`);
    tab.icon(() => optionTab.icon);
    tab.displayName = global.lang[global.displayLanguage].creativeTab[tabId];
  });
}
/*
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
StartupEvents.modifyCreativeTab('minecraft:ingredients', (event) => {
  let listRemove = [
    'minecraft:raw_iron',
    'minecraft:raw_copper',
    'minecraft:raw_gold', //
  ];
  for (let item of listRemove) {
    event.remove(item);
  }
  tab.displayName = global.lang[global.displayLanguage]['process'];
});
for (let CreativeTab in global.listCreativeTab) {
  StartupEvents.modifyCreativeTab(CreativeTab, (event) => {
    let listItem = global.listCreativeTab[CreativeTab];
    for (let setItem of listItem) {
      event.addBefore(setItem.before, setItem.item); //before 不起作用?
    }
  });
}
