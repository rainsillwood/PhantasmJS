// priority: 10

let listCreativeTab = [
  {
    'id': 'part',
    'icon': 'minecraft:iron_ingot',
  },
  {
    'id': 'intermediate',
    'icon': 'minecraft:raw_iron',
  },
];
StartupEvents.registry('creative_mode_tab', (event) => {
  for (let optionTab of listCreativeTab) {
    let tabId = optionTab.id;
    let tab = event.create(`minecraft:${tabId}s`);
    tab.icon(() => optionTab.icon);
    tab.displayName = global.listLanguage.creativeTab[tabId];
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
  let listRemove = [
    'minecraft:raw_iron',
    'minecraft:raw_copper',
    'minecraft:raw_gold', //
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
//插入
for (let CreativeTab in global.listCreativeTab) {
  StartupEvents.modifyCreativeTab(CreativeTab, (event) => {
    let listItem = global.listCreativeTab[CreativeTab];
    for (let setItem of listItem) {
      if (setItem.before) {
        event.addBefore(setItem.before, setItem.item); //before 不起作用?
      } else {
        event.add(setItem.item);
      }
    }
  });
}
