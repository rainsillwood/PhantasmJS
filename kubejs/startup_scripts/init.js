// priority: 2147483647

const _Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks');
const _PushReaction = Java.loadClass('net.minecraft.world.level.material.PushReaction');
//设定命名空间
global.namespace = 'phantasm';
//设置首选语言
global.displayLanguage = 'zh_cn';
//初始化语言列表
let Languagetable = {};
global.listLanguageTable = [];
//初始化材料列表
global.listRarity = ['POOR', 'COMMON', 'SUPERIOR', 'EXQUISITE', 'BRILLIANT', 'EPICALLY', 'LEGEND', 'MYTHIC', 'PEERLESS'];
//初始化材料列表
global.listToolLevel = [
  [
    //木&金,Lv0
  ],
  [
    //石&铜,Lv1
    'minecraft:incorrect_for_wooden_tool', //
    'minecraft:incorrect_for_gold_tool',
    'minecraft:needs_stone_tool',
  ],
  [
    //铁,Lv2
    'minecraft:incorrect_for_wooden_tool', //
    'minecraft:incorrect_for_gold_tool',
    'minecraft:incorrect_for_stone_tool',
    'minecraft:incorrect_for_copper_tool',
    'minecraft:needs_iron_tool',
  ],
  [
    //钻,Lv3
    'minecraft:incorrect_for_wooden_tool', //
    'minecraft:incorrect_for_gold_tool',
    'minecraft:incorrect_for_stone_tool',
    'minecraft:incorrect_for_copper_tool',
    'minecraft:incorrect_for_iron_tool',
    'minecraft:needs_diamond_tool',
  ],
  [
    //下界,Lv4
    'minecraft:incorrect_for_wooden_tool', //
    'minecraft:incorrect_for_gold_tool',
    'minecraft:incorrect_for_stone_tool',
    'minecraft:incorrect_for_copper_tool',
    'minecraft:incorrect_for_iron_tool',
    'minecraft:incorrect_for_diamond_tool',
    'minecraft:needs_netherite_tool',
  ],
  [
    //下界之上,Lv5
    'minecraft:incorrect_for_wooden_tool', //
    'minecraft:incorrect_for_gold_tool',
    'minecraft:incorrect_for_stone_tool',
    'minecraft:incorrect_for_copper_tool',
    'minecraft:incorrect_for_iron_tool',
    'minecraft:incorrect_for_diamond_tool',
    'minecraft:incorrect_for_netherite_tool',
  ],
];
//初始化材料列表
global.listMaterial = [];
//初始化物品注册队列
global.listItemBuild = [];
global.listItemModify = [];
//初始化方块注册队列
global.listBlockBuild = [];
global.listBlockModify = [];
//初始化流体注册队列
global.listFluidBuild = [];
//初始化药水注册队列
global.listPotionBuild = [];
//初始化附魔注册队列
global.listEnchantBuild = [];
//初始化效果注册队列
global.listEffectBuild = [];
//初始化创造模式物品栏
global.listCreativeTabAdd = {};
global.listCreativeTabRemove = [];
//初始化标签处理队列
global.listTagItem = {};
global.listTagBlock = {};
global.listTagFluid = {};
global.listTagEntity = {};
//初始化Tooltip处理队列
global.listTooltip = {};
//初始化材质处理队列
global.listTexture = [];
//初始化方块状态
global.listBlockState = [];
//初始化模型
global.listModel = [];
