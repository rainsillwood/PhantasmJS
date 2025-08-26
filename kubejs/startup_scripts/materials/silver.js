// priority: 2147483644
let material = 'silver';
//地物形态
let Config = {
  'normal': {
    'type': 'minecraft:ore',
    'config': {
      'discard_chance_on_air_exposure': 0.0,
      'size': 9,
      'targets': [
        {
          'state': {
            'Name': `minecraft:${material}_ore`,
          },
          'target': {
            'predicate_type': 'minecraft:tag_match',
            'tag': 'minecraft:stone_ore_replaceables',
          },
        },
        {
          'state': {
            'Name': `minecraft:deepslate_${material}_ore`,
          },
          'target': {
            'predicate_type': 'minecraft:tag_match',
            'tag': 'minecraft:deepslate_ore_replaceables',
          },
        },
      ],
    },
  },
  'small': {
    'type': 'minecraft:ore',
    'config': {
      'discard_chance_on_air_exposure': 0.0,
      'size': 4,
      'targets': [
        {
          'state': {
            'Name': `minecraft:${material}_ore`, //
          },
          'target': {
            'predicate_type': 'minecraft:tag_match',
            'tag': 'minecraft:stone_ore_replaceables',
          },
        },
        {
          'state': {
            'Name': `minecraft:deepslate_${material}_ore`, //
          },
          'target': {
            'predicate_type': 'minecraft:tag_match',
            'tag': 'minecraft:deepslate_ore_replaceables',
          },
        },
      ],
    },
  },
  //'medium': {},
  //'large': {},
  //'buried': {},
};
//地物放置规则
let Placement = {
  'small': {
    'feature': Config.small,
    'placement': [
      {
        'type': 'minecraft:count',
        'count': 10,
      },
      {
        'type': 'minecraft:in_square',
      },
      {
        'type': 'minecraft:height_range',
        'height': {
          'type': 'minecraft:uniform',
          'max_inclusive': {
            'absolute': 72,
          },
          'min_inclusive': {
            'above_bottom': 0,
          },
        },
      },
      {
        'type': 'minecraft:biome',
      },
    ],
  },
  //'medium': {},
  //'large': {},
  'upper': {
    'feature': Config.normal,
    'placement': [
      {
        'type': 'minecraft:count',
        'count': 90,
      },
      {
        'type': 'minecraft:in_square',
      },
      {
        'type': 'minecraft:height_range',
        'height': {
          'type': 'minecraft:trapezoid',
          'max_inclusive': {
            'absolute': 384,
          },
          'min_inclusive': {
            'absolute': 80,
          },
        },
      },
      {
        'type': 'minecraft:biome',
      },
    ],
  },
  'middle': {
    'feature': Config.normal,
    'placement': [
      {
        'type': 'minecraft:count',
        'count': 10,
      },
      {
        'type': 'minecraft:in_square',
      },
      {
        'type': 'minecraft:height_range',
        'height': {
          'type': 'minecraft:trapezoid',
          'max_inclusive': {
            'absolute': 56,
          },
          'min_inclusive': {
            'absolute': -24,
          },
        },
      },
      {
        'type': 'minecraft:biome',
      },
    ],
  },
  //'lower': {},
  //'buried': {},
};
global.listMaterial.push({
  'id': material, //id
  'type': 'metal', //类型
  'subtype': '', //类型v
  'color': 0x66ccff, //颜色
  'rarity': 0, //稀有度
  'enchanted': false, //是否附魔
  'process': {
    'type': 'acid',
    'product': [
      //产物
      {
        'material': 'silver',
        'chance': 1,
      },
      {
        'material': '',
        'chance': 0,
      },
      {
        'material': '',
        'chance': 0,
      },
    ],
  },
  'usage': {
    'value': 0, //货币价值
    'fuel': 0, //燃烧时间,基准为锭
    'bacon': true, //是否用于信标
    'trim': true, //是否用于锻造
    'tool': {
      'stiffness': 0, //刚度,影响弓壁拉弓速度,
      'strength': 0, //强度,影响耐久
      'hardness': 0, //硬度,影响伤害,挖掘等级,护甲值
      'elasticity': 0, //弹性,影响拉弓速度
      'toughness': 0, //韧性,影响耐久
      'ductility': 0, //延性
      'density': 0, //密度,影响挖掘速度,攻击速度
      'attributes': '', //特性
    },
  },
  'ore': {
    //矿石
    'stone': {
      //表层矿石
      'build': true, //是否有原型以及是否构建,不构建为false,无原型或不使用原型为true,有原型为物品id
      'name': false, //是否指定名称
      'tooltip': false, //是否指定描述
      'blockstate': {
        'light': 0, //光照等级,0~15
        'hardness': 3, //硬度,浮点
        'resistance': 3, //爆炸抗性,浮点
        'level': 1, //挖掘等级
        'requiresTool': true,
      },
    },
    'deepslate': {
      //深层矿石
      'build': true,
      'blockstate': {
        'light': 0,
        'hardness': 4.5,
        'resistance': 3,
        'level': 1,
        'requiresTool': true,
      },
    },
    'drop': {
      //掉落
      'formula': 'ore_drops', //掉落方式,ore_drops:矿物掉落随机算法(铁矿石);uniform_bonus_count:均匀分布随机数;binomial_with_bonus_count:二项分布随机数
      'min_xp': 0,
      'max_xp': 0,
      'bonus': 0, //均匀分布中的乘数,值域为[c,c+bl],其中l是魔咒等级,c是原物品数量
      'extra': 0, //额外计算的次数.二项分布计算的n为魔咒等级与额外计算次数之和
      'probability': 0, //二项分布中的概率p
    },
    'smelt': {
      //熔炼
      'xp': 1, //经验
      'count': 1, //产出
    },
    'generator': [Placement.small, Placement.upper, Placement.middle], //生成器
  },
    'cluster': {
    //晶簇(包括晶芽)
    'build': true,
    'drop': {
      //掉落
      'formula': 'ore_drops',
      'min_xp': 0,
      'max_xp': 0,
      'bonus': 0,
      'extra': 0,
      'probability': 0,
    },
  },
  'raw_block': {
    //粗矿块
    'build': true,
    'count': 9,
    'blockstate': {
      'light': 0,
      'hardness': 5,
      'resistance': 6,
      'level': 1,
      'requiresTool': true,
    },
  },
  'storage_block': {
    //块
    'build': true,
    'count': 9,
    'blockstate': {
      'lightLevel': 0,
      'hardness': 5,
      'resistance': 6,
      'level': 1,
      'requiresTool': true,
    },
  },
  'molten': {
    //熔融流体
    'build': true,
    'blockstate': {
      'luminosity': 0, //亮度,水为0,熔岩为
      'temperature': 1235, //温度,室温300K(27℃)
      'density': 1000, //密度,水为1000,水蒸气为0.001
      'viscosity': 1000, //粘度,水为1000,水蒸气为0.001
    },
  },
  'vapor': {
    //蒸气流体
    'build': true,
    'blockstate': {
      'luminosity': 0,
      'temperature': 2435,
      'density': 0.001,
      'viscosity': 0.001,
    },
  },
  'raw': {
    //粗矿
    'build': true,
  },
  'fragment': {
    //碎块
    'build': true,
  },
  'scrap': {
    //碎片
    'build': true,
  },
  'calcine': {
    //焙砂
    'build': true,
  },
  'slurry': {
    //浆液
    'build': true,
  },
  'solution': {
    //溶液
    'build': true,
  },
  'extraction': {
    //萃取液
    'build': true,
  },
  'stripping': {
    //反萃液
    'build': true,
  },
  'crystal': {
    //晶体
    'build': true,
  },
  'clump': {
    //碎晶
    'build': true,
  },
  'ingot': {
    //锭,对应宝石为gem,对应球为ball,对应砖为brick,
    'build': true,
  },
  'nugget': {
    //粒,对应宝石为shard碎片,对应球为droplet滴,对应砖为tile瓦片,
    'build': true,
  },
  'dust': {
    //粉
    'build': true,
  },
  'powder': {
    //末
    'build': true,
  },
  'coin': {
    //币
    'build': true,
  },
  'rod': {
    //棒
    'build': true,
  },
  'ball': {
    //珠
    'build': true,
  },
  'gear': {
    //齿轮
    'build': true,
  },
  'plate': {
    //板
    'build': true,
  },
  'sheet': {
    //钣金
    'build': true,
  },
  'casing': {
    // 机壳
    'build': true,
    'blockstate': {
      'lightLevel': 0,
      'hardness': 1.5,
      'resistance': 6,
      'level': 0,
      'requiresTool': false,
    },
  },
});
