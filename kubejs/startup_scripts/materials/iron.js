// priority: 2147483645

global.materials.push({
  'id': 'iron', //id
  'type': 'metal', //类型
  'color': 0x66ccff, //颜色
  'ore': {
    //矿石
    'stoneslate': {
      'build': 'minecraft:iron_ore', //是否有原型以及是否构建，不构建为null，无原型为build，有原型为物品id
      'light': 0, //光照等级
      'hardness': 3, //硬度
      'resistance': 3, //爆炸抗性
      'level': 1, //挖掘等级
    },
    'deepslate': {
      'build': 'minecraft:deepslate_iron_ore', //是否有原型以及是否构建，不构建为null，无原型或不使用原型为build，有原型为物品id
      'light': 0, //光照等级
      'hardness': 4.5, //硬度
      'resistance': 3, //爆炸抗性
      'level': 1, //挖掘等级
    },
    'drop': {
      //掉落
      'formula': 'ore_drops', //掉落方式，ore_drops:矿物掉落随机算法(铁矿石);uniform_bonus_count:均匀分布随机数;binomial_with_bonus_count:二项分布随机数
      'bonus': 0, //均匀分布中的乘数,值域为[c,c+bl]，其中l是魔咒等级，c是原物品数量
      'extra': 0, //额外计算的次数。二项分布计算的n为魔咒等级与额外计算次数之和
      'probability': 0, //二项分布中的概率p
    },
    'smelt': {
      //熔炼
      'xp': 0.7, //经验
      'count': 1, //产出
    },
    'generator': [
      //生成器
      {
        'max_count': 10, //
        'min_count': -1,
        'size': 4, //团簇数量
        'chance': 0,
        'shape': 'in_square', //团簇形状，in_square:15*15范围内分布;constant:恒定高度;uniform:均匀分布;biased_to_bottom:偏向底部
        'type': 'trapezoid', //分布类型，trapezoid：梯形分布
        'max_inclusive': 56,
        'min_inclusive': -24,
        'plateau': 0, //若为梯形，则决定上顶长度
        'biomes': ['all'],
      },
      {
        'max_count': 10, //
        'min_count': -1,
        'size': 9, //团簇数量
        'chance': 0,
        'shape': 'in_square', //团簇形状，in_square:15*15范围内分布;constant:恒定高度;uniform:均匀分布;biased_to_bottom:偏向底部
        'type': 'uniform', //分布类型，trapezoid：梯形分布
        'max_inclusive': 72,
        'min_inclusive': 0,
        'plateau': 0, //若为梯形，则决定上顶长度
        'biomes': ['all'],
      },
      {
        'max_count': 90, //
        'min_count': -1,
        'size': 9, //团簇数量
        'chance': 0, //暴露空气概率，若为0则不会取消生成，1则必定取消生成
        'shape': 'in_square', //团簇形状，in_square:15*15范围内分布;constant:恒定高度;uniform:均匀分布;biased_to_bottom:偏向底部
        'type': 'uniform', //分布类型，trapezoid：梯形分布
        'max_inclusive': 384,
        'min_inclusive': 80,
        'plateau': 0, //若为梯形，则决定上顶长度
        'biomes': ['all'],
      },
    ],
  },
});
