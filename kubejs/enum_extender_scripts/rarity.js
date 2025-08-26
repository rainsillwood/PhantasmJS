let _Rarity = Java.loadClass('net.minecraft.world.item.Rarity');
let _ChatFormatting = Java.loadClass('net.minecraft.ChatFormatting');
/*Poor
Common
Superior
Exquisite
Brilliant
Epic
Legend
Mythic
Peerless
*/
let Poor = _Rarity.create1('POOR', _Rarity.values().length, 'poor', _ChatFormatting.GRAY);
//let Common = _Rarity.create1('COMMON', 0, 'common', _ChatFormatting.WHITE);
let Superior = _Rarity.create1('SUPERIOR', _Rarity.values().length, 'superior', _ChatFormatting.GREEN);
let Exquisite = _Rarity.create1('EXQUISITE', _Rarity.values().length, 'exquisite', _ChatFormatting.BLUE);
let Brilliant = _Rarity.create1('BRILLIANT', _Rarity.values().length, 'brilliant', _ChatFormatting.YELLOW);
let Epically = _Rarity.create1('EPICALLY', _Rarity.values().length, 'epic', _ChatFormatting.GOLD);
let Legend = _Rarity.create1('LEGEND', _Rarity.values().length, 'legend', _ChatFormatting.RED);
let Mythic = _Rarity.create1('MYTHIC', _Rarity.values().length, 'mythic', _ChatFormatting.LIGHT_PURPLE);
let Peerless = _Rarity.create1('PEERLESS', _Rarity.values().length, 'peerless', _ChatFormatting.DARK_PURPLE);
