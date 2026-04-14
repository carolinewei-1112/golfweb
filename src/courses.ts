// 中国及周边地区高尔夫球场数据库
// slope: USGA Slope Rating (55-155), rating: Course Rating (60-80)
export interface Course {
  name: string
  city: string
  region: string
  slope: number
  rating: number
}

export const courseDatabase: Course[] = [
  // ===== 广东省 =====
  { name: '观澜湖·海口球场', city: '海口', region: '海南', slope: 132, rating: 72.5 },
  { name: '观澜湖·深圳诺曼球场', city: '深圳', region: '广东', slope: 133, rating: 73.0 },
  { name: '观澜湖·深圳艾斯球场', city: '深圳', region: '广东', slope: 128, rating: 71.2 },
  { name: '观澜湖·深圳利百特球场', city: '深圳', region: '广东', slope: 130, rating: 72.0 },
  { name: '观澜湖·深圳尾崎球场', city: '深圳', region: '广东', slope: 135, rating: 73.5 },
  { name: '深圳龙岗公众球场', city: '深圳', region: '广东', slope: 125, rating: 70.0 },
  { name: '深圳正中高尔夫球会', city: '深圳', region: '广东', slope: 127, rating: 71.5 },
  { name: '深圳云海谷球场', city: '深圳', region: '广东', slope: 126, rating: 70.8 },
  { name: '深圳光明高尔夫球场', city: '深圳', region: '广东', slope: 124, rating: 70.3 },
  { name: '深圳西丽高尔夫球场', city: '深圳', region: '广东', slope: 126, rating: 71.0 },
  { name: '东莞长安高尔夫', city: '东莞', region: '广东', slope: 128, rating: 71.2 },
  { name: '东莞银利高尔夫球会', city: '东莞', region: '广东', slope: 128, rating: 71.0 },
  { name: '东莞峰景高尔夫', city: '东莞', region: '广东', slope: 130, rating: 72.0 },
  { name: '东莞长安高尔夫俱乐部', city: '东莞', region: '广东', slope: 127, rating: 71.0 },
  { name: '广州风神高尔夫球场', city: '广州', region: '广东', slope: 126, rating: 70.5 },
  { name: '广州南沙高尔夫球会', city: '广州', region: '广东', slope: 129, rating: 71.8 },
  { name: '广州九龙湖高尔夫球会', city: '广州', region: '广东', slope: 131, rating: 72.3 },
  { name: '广州风神花园高尔夫', city: '广州', region: '广东', slope: 124, rating: 70.0 },
  { name: '佛山高尔夫球会', city: '佛山', region: '广东', slope: 127, rating: 71.0 },
  { name: '佛山君兰国际高尔夫', city: '佛山', region: '广东', slope: 130, rating: 72.0 },
  { name: '珠海翠湖高尔夫球会', city: '珠海', region: '广东', slope: 130, rating: 71.8 },
  { name: '珠海金湾高尔夫', city: '珠海', region: '广东', slope: 125, rating: 70.5 },
  { name: '肇庆星湖高尔夫球场', city: '肇庆', region: '广东', slope: 124, rating: 70.2 },
  { name: '惠州涛景高尔夫球会', city: '惠州', region: '广东', slope: 129, rating: 71.5 },
  { name: '惠州棕榈岛高尔夫', city: '惠州', region: '广东', slope: 131, rating: 72.0 },
  { name: '中山长江高尔夫球场', city: '中山', region: '广东', slope: 126, rating: 70.8 },
  { name: '中山雅居乐长江高尔夫', city: '中山', region: '广东', slope: 128, rating: 71.5 },
  { name: '江门恩平泉林黄金小镇', city: '江门', region: '广东', slope: 125, rating: 70.5 },
  { name: '清远狮子湖高尔夫', city: '清远', region: '广东', slope: 127, rating: 71.0 },

  // ===== 北京 =====
  { name: '北京华彬高尔夫俱乐部', city: '北京', region: '北京', slope: 135, rating: 73.5 },
  { name: '北京观澜湖高尔夫球场', city: '北京', region: '北京', slope: 132, rating: 72.0 },
  { name: '北京CBD国际高尔夫', city: '北京', region: '北京', slope: 130, rating: 72.0 },
  { name: '北京万柳高尔夫俱乐部', city: '北京', region: '北京', slope: 128, rating: 71.0 },
  { name: '北京鸿华国际高尔夫', city: '北京', region: '北京', slope: 131, rating: 72.2 },
  { name: '北京加州水郡高尔夫', city: '北京', region: '北京', slope: 124, rating: 70.0 },
  { name: '北京北辰高尔夫俱乐部', city: '北京', region: '北京', slope: 126, rating: 70.8 },

  // ===== 上海 =====
  { name: '上海佘山国际高尔夫俱乐部', city: '上海', region: '上海', slope: 138, rating: 74.5 },
  { name: '上海汤臣高尔夫球场', city: '上海', region: '上海', slope: 131, rating: 72.0 },
  { name: '上海旭宝高尔夫球场', city: '上海', region: '上海', slope: 129, rating: 71.5 },
  { name: '上海天马高尔夫球场', city: '上海', region: '上海', slope: 125, rating: 70.0 },
  { name: '上海林克司高尔夫俱乐部', city: '上海', region: '上海', slope: 130, rating: 71.5 },
  { name: '上海美兰湖高尔夫', city: '上海', region: '上海', slope: 126, rating: 70.5 },

  // ===== 浙江省 =====
  { name: '杭州西湖国际高尔夫', city: '杭州', region: '浙江', slope: 128, rating: 71.0 },
  { name: '杭州千岛湖高尔夫', city: '杭州', region: '浙江', slope: 125, rating: 70.0 },
  { name: '宁波启新高尔夫球场', city: '宁波', region: '浙江', slope: 126, rating: 70.5 },
  { name: '温州东方高尔夫球场', city: '温州', region: '浙江', slope: 124, rating: 69.8 },
  { name: '绍兴会稽山高尔夫', city: '绍兴', region: '浙江', slope: 123, rating: 69.5 },

  // ===== 江苏省 =====
  { name: '南京钟山国际高尔夫', city: '南京', region: '江苏', slope: 132, rating: 72.0 },
  { name: '南京银杏湖高尔夫', city: '南京', region: '江苏', slope: 134, rating: 73.0 },
  { name: '苏州金鸡湖高尔夫', city: '苏州', region: '江苏', slope: 127, rating: 71.0 },
  { name: '苏州太湖国际高尔夫', city: '苏州', region: '江苏', slope: 130, rating: 72.0 },
  { name: '昆山旭宝高尔夫', city: '昆山', region: '江苏', slope: 125, rating: 70.0 },
  { name: '无锡太湖高尔夫', city: '无锡', region: '江苏', slope: 126, rating: 70.5 },

  // ===== 四川省 =====
  { name: '成都麓山国际高尔夫', city: '成都', region: '四川', slope: 127, rating: 71.0 },
  { name: '成都观岭高尔夫球场', city: '成都', region: '四川', slope: 126, rating: 70.5 },
  { name: '成都青城山高尔夫', city: '成都', region: '四川', slope: 125, rating: 70.0 },

  // ===== 云南省 =====
  { name: '昆明春城高尔夫湖畔球场', city: '昆明', region: '云南', slope: 136, rating: 74.0 },
  { name: '昆明阳光高尔夫', city: '昆明', region: '云南', slope: 128, rating: 71.0 },
  { name: '大理苍海高尔夫', city: '大理', region: '云南', slope: 124, rating: 69.5 },

  // ===== 福建省 =====
  { name: '厦门东方高尔夫', city: '厦门', region: '福建', slope: 126, rating: 70.5 },
  { name: '福州温泉高尔夫', city: '福州', region: '福建', slope: 125, rating: 70.0 },

  // ===== 山东省 =====
  { name: '青岛华山国际高尔夫', city: '青岛', region: '山东', slope: 128, rating: 71.0 },
  { name: '烟台海阳旭宝高尔夫', city: '烟台', region: '山东', slope: 126, rating: 70.5 },

  // ===== 辽宁省 =====
  { name: '大连金石高尔夫', city: '大连', region: '辽宁', slope: 131, rating: 72.0 },
  { name: '沈阳盛京高尔夫', city: '沈阳', region: '辽宁', slope: 127, rating: 71.0 },

  // ===== 天津 =====
  { name: '天津松江团泊湖高尔夫', city: '天津', region: '天津', slope: 129, rating: 71.5 },
  { name: '天津京基高尔夫', city: '天津', region: '天津', slope: 125, rating: 70.0 },

  // ===== 重庆市 =====
  { name: '重庆庆隆高尔夫', city: '重庆', region: '重庆', slope: 126, rating: 70.5 },
  { name: '重庆保利高尔夫', city: '重庆', region: '重庆', slope: 124, rating: 69.8 },

  // ===== 海南省 =====
  { name: '海口观澜湖·黑石球场', city: '海口', region: '海南', slope: 135, rating: 73.0 },
  { name: '海口三公里高尔夫', city: '海口', region: '海南', slope: 122, rating: 69.0 },
  { name: '三亚亚龙湾高尔夫', city: '三亚', region: '海南', slope: 130, rating: 71.5 },
  { name: '三亚海棠湾海景高尔夫', city: '三亚', region: '海南', slope: 128, rating: 70.5 },
  { name: '博鳌亚洲论坛高尔夫', city: '博鳌', region: '海南', slope: 125, rating: 70.0 },

  // ===== 湖北省 =====
  { name: '武汉光谷国际高尔夫', city: '武汉', region: '湖北', slope: 126, rating: 70.5 },
  { name: '武汉梁子湖高尔夫', city: '武汉', region: '湖北', slope: 124, rating: 69.8 },

  // ===== 湖南省 =====
  { name: '长沙龙湖国际高尔夫', city: '长沙', region: '湖南', slope: 125, rating: 70.0 },
  { name: '长沙梓山湖高尔夫', city: '长沙', region: '湖南', slope: 123, rating: 69.5 },

  // ===== 河南省 =====
  { name: '郑州思念高尔夫', city: '郑州', region: '河南', slope: 125, rating: 70.0 },
  { name: '郑州金沙湖高尔夫', city: '郑州', region: '河南', slope: 124, rating: 69.5 },

  // ===== 陕西省 =====
  { name: '西安秦岭国际高尔夫', city: '西安', region: '陕西', slope: 127, rating: 71.0 },

  // ===== 广西 =====
  { name: '南宁青秀山高尔夫', city: '南宁', region: '广西', slope: 124, rating: 69.8 },
  { name: '桂林乐满地高尔夫', city: '桂林', region: '广西', slope: 126, rating: 70.5 },

  // ===== 江西省 =====
  { name: '南昌翠林高尔夫', city: '南昌', region: '江西', slope: 123, rating: 69.5 },

  // ===== 安徽省 =====
  { name: '合肥紫蓬山高尔夫', city: '合肥', region: '安徽', slope: 124, rating: 69.8 },

  // ===== 河北省 =====
  { name: '石家庄滹沱河高尔夫', city: '石家庄', region: '河北', slope: 124, rating: 69.8 },

  // ===== 贵州省 =====
  { name: '贵阳乐湾国际高尔夫', city: '贵阳', region: '贵州', slope: 125, rating: 70.0 },

  // ===== 台湾 =====
  { name: '台湾信谊高尔夫球场', city: '台北', region: '台湾', slope: 127, rating: 71.0 },
  { name: '台湾高尔夫俱乐部', city: '台北', region: '台湾', slope: 129, rating: 71.5 },
  { name: '台湾南峰高尔夫球场', city: '高雄', region: '台湾', slope: 124, rating: 69.8 },

  // ===== 香港 =====
  { name: '香港高尔夫球会', city: '香港', region: '香港', slope: 132, rating: 72.0 },
  { name: '香港粉岭高尔夫球场', city: '香港', region: '香港', slope: 130, rating: 71.5 },

  // ===== 澳门 =====
  { name: '澳门高尔夫乡村俱乐部', city: '澳门', region: '澳门', slope: 125, rating: 70.0 },

  // ===== 日本 =====
  { name: '日本东京高尔夫俱乐部', city: '东京', region: '日本', slope: 128, rating: 71.0 },
  { name: '日本广野高尔夫俱乐部', city: '兵库', region: '日本', slope: 132, rating: 72.5 },
  { name: '日本川奈酒店高尔夫', city: '静冈', region: '日本', slope: 134, rating: 73.0 },
  { name: '日本_ACL高尔夫俱乐部', city: '千叶', region: '日本', slope: 126, rating: 70.5 },
  { name: '日本凤凰高尔夫球场', city: '宫崎', region: '日本', slope: 131, rating: 72.0 },

  // ===== 韩国 =====
  { name: '韩国九桥高尔夫俱乐部', city: '全罗南道', region: '韩国', slope: 136, rating: 74.0 },
  { name: '韩国Ananti高尔夫俱乐部', city: '江原道', region: '韩国', slope: 134, rating: 73.5 },
  { name: '韩国Jack Nicklaus高尔夫', city: '京畿道', region: '韩国', slope: 130, rating: 72.0 },

  // ===== 泰国 =====
  { name: '泰国Alpine高尔夫俱乐部', city: '曼谷', region: '泰国', slope: 128, rating: 71.0 },
  { name: '泰国Siam Country Club', city: '芭提雅', region: '泰国', slope: 132, rating: 72.5 },
  { name: '泰国Black Mountain高尔夫', city: '华欣', region: '泰国', slope: 134, rating: 73.0 },
  { name: '泰国Laguna高尔夫俱乐部', city: '普吉', region: '泰国', slope: 126, rating: 70.5 },

  // ===== 新加坡 =====
  { name: '新加坡圣淘沙高尔夫俱乐部', city: '新加坡', region: '新加坡', slope: 130, rating: 72.0 },
  { name: '新加坡Sentosa高尔夫球场', city: '新加坡', region: '新加坡', slope: 128, rating: 71.5 },

  // ===== 越南 =====
  { name: '越南BRG Da Nang高尔夫', city: '岘港', region: '越南', slope: 130, rating: 71.5 },
  { name: '越南Montgomerie Links', city: '岘港', region: '越南', slope: 132, rating: 72.0 },

  // ===== 马来西亚 =====
  { name: '马来西亚TPC Kuala Lumpur', city: '吉隆坡', region: '马来西亚', slope: 129, rating: 71.0 },
]

/** 搜索球场，支持名称、城市、地区模糊匹配 */
export function searchCourses(keyword: string, limit = 8): Course[] {
  if (!keyword.trim()) return []
  const kw = keyword.toLowerCase().trim()
  return courseDatabase
    .filter(c =>
      c.name.toLowerCase().includes(kw) ||
      c.city.toLowerCase().includes(kw) ||
      c.region.toLowerCase().includes(kw)
    )
    .slice(0, limit)
}
