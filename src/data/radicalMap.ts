export interface RadicalInfo {
  character: string;   // radical character, e.g. "子"
  meaning: string;     // Russian meaning, e.g. "ребёнок"
  strokeCount: number; // stroke count of the radical itself
}

export const radicalMap: Record<string, RadicalInfo> = {
  '学': { character: '子', meaning: 'ребёнок, учение', strokeCount: 3 },
  '说': { character: '讠', meaning: 'речь, слово', strokeCount: 2 },
  '吃': { character: '口', meaning: 'рот', strokeCount: 3 },
  '来': { character: '木', meaning: 'дерево', strokeCount: 4 },
  '去': { character: '厶', meaning: 'частный, личный', strokeCount: 2 },
  '人': { character: '人', meaning: 'человек', strokeCount: 2 },
  '大': { character: '大', meaning: 'большой', strokeCount: 3 },
  '小': { character: '小', meaning: 'маленький', strokeCount: 3 },
  '中': { character: '丨', meaning: 'вертикальная черта', strokeCount: 1 },
  '好': { character: '女', meaning: 'женщина', strokeCount: 3 },
  '不': { character: '一', meaning: 'один, горизонталь', strokeCount: 1 },
  '我': { character: '戈', meaning: 'копьё, оружие', strokeCount: 4 },
};
