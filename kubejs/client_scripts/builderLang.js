// priority: 1

ClientEvents.lang(global.displayLanguage, (event) => {
  let lang = {};
  global.listLanguageTable.forEach((option) => {
    if (!lang[option.namespace]) {
      lang[option.namespace] = {};
    }
    let resourceLocation = `${option.type}.${option.namespace}.${option.id}`;
    lang[option.namespace][resourceLocation] = option.displayName;
  });
  for (let namespace in lang) {
    event.json(`${namespace}:lang/${global.displayLanguage}`, lang[namespace]);
  }
});
