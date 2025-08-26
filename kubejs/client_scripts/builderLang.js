// priority: 1

ClientEvents.lang(global.displayLanguage, (event) => {
  global.listLanguageTable.forEach((optionLang) => {
    switch (optionLang.type) {
      case 'item': {
        event.renameItem(optionLang.id, optionLang.displayName);
        break;
      }
      case 'block': {
        event.renameItem(optionLang.id, optionLang.displayName);
        event.renameBlock(optionLang.id, optionLang.displayName);
      }
    }
  });
});
