/**
 * Little Roots: Thai Botanical Learning Media
 * Master Application Script (Vanilla ES6+)
 */
'use strict';

/* ==========================================================================
   1. PIXEL ART GENERATOR (SVG Data URIs / Markup)
   ========================================================================== */
const pixelSvg = (kind, c = '#80B918') => {
  const maps = {
    leaf: [
      '0000000110000000',
      '0000001111000000',
      '0000011111100000',
      '0000111111110000',
      '0001111111111000',
      '0001111111111000',
      '0000111111110000',
      '0000011111100000',
      '0000001221000000',
      '0000000220000000',
      '0000000220000000',
      '0000000220000000',
      '0000000220000000',
      '0000000220000000',
      '0000333333330000',
      '0000333333330000'
    ],
    flower: [
      '0000011001100000',
      '0000111111110000',
      '0001111441111000',
      '0001114444111000',
      '0001111441111000',
      '0000111111110000',
      '0000011221100000',
      '0000000220000000',
      '0000200220020000',
      '0000220220220000',
      '0000022222200000',
      '0000002222000000',
      '0000000220000000',
      '0000000220000000',
      '0000333333330000',
      '0000333333330000'
    ],
    fruit: [
      '0000000220000000',
      '0000002222000000',
      '0000001221100000',
      '0000011111110000',
      '0001111111111000',
      '0011111441111100',
      '0011114411111100',
      '0011111111111100',
      '0011111111111100',
      '0001111111111000',
      '0000111111110000',
      '0000011111100000',
      '0000000000000000',
      '0000000000000000',
      '0000333333330000',
      '0000333333330000'
    ],
    tree: [
      '0000011111100000',
      '0001111111111000',
      '0011111111111100',
      '0111111441111110',
      '0111114411111110',
      '0011111111111100',
      '0001111111111000',
      '0000011221100000',
      '0000000220000000',
      '0000000220000000',
      '0000000220000000',
      '0000000220000000',
      '0000000220000000',
      '0000002222000000',
      '0000333333330000',
      '0000333333330000'
    ]
  };

  const palette = {
    1: c,
    2: '#386641',
    3: '#D4A373',
    4: '#FFE066'
  };

  const pattern = maps[kind] || maps.leaf;
  let rects = '';
  pattern.forEach((row, y) => {
    [...row].forEach((val, x) => {
      if (val !== '0') {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${palette[val]}"/>`;
      }
    });
  });

  return `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" shape-rendering="crispEdges">${rects}</svg>`;
};

/* ==========================================================================
   2. CATEGORIES & TAXONOMY DEFINITION
   ========================================================================== */
const CATEGORIES = {
  herbs: {
    th: 'พืชสมุนไพร',
    en: 'Medicinal Herbs',
    icon: 'assets/cat0.png',
    desc: 'พืชสมุนไพรไทย สรรพคุณทางยา และภูมิปัญญาการแพทย์แผนไทย',
    subs: {
      home: 'สมุนไพรประจำบ้าน',
      special: 'สมุนไพรเฉพาะทาง',
      health: 'สมุนไพรบำรุงสุขภาพ'
    }
  },
  edible: {
    th: 'พืชอาหาร',
    en: 'Edible Plants',
    icon: 'assets/cat1.png',
    desc: 'ผักพื้นบ้าน ผักริมรั้ว ผลไม้พื้นเมือง และเครื่องเทศแต่งกลิ่น',
    subs: {
      veg: 'ผักพื้นบ้านและผักริมรั้ว',
      fruit: 'ผลไม้พื้นเมือง',
      spice: 'เครื่องเทศและพืชแต่งกลิ่น'
    }
  },
  economic: {
    th: 'พืชเศรษฐกิจ',
    en: 'Economic Crops',
    icon: 'assets/cat2.png',
    desc: 'พืชไร่แปรรูป พืชเส้นใยงานจักสาน และพืชสกัดระดับอุตสาหกรรม',
    subs: {
      field: 'พืชไร่และพืชแปรรูปเศรษฐกิจ',
      fiber: 'พืชเส้นใยและงานจักสาน',
      extract: 'พืชสกัดและอุตสาหกรรม'
    }
  },
  ornamental: {
    th: 'พืชไม้ประดับ',
    en: 'Ornamental Plants',
    icon: 'assets/cat3.png',
    desc: 'ไม้ดอกไทย ไม้มงคลตามความเชื่อ และไม้จัดสวนปรับภูมิทัศน์',
    subs: {
      flower: 'ไม้ดอกไทยและพืชแปรรูปหลัก',
      lucky: 'ไม้มงคลและความเชื่อ',
      garden: 'ไม้จัดสวน'
    }
  }
};

/* Helper factory for creating consistent plant objects */
const createPlant = (
  id, nameTh, nameEn, karaokeName, scientificName, family,
  category, subcategory, kind, color,
  description, attributes, usage, precautions,
  sun, water, soil,
  imageSrc = '', photo = '', tags = []
) => ({
  id,
  nameTh,
  nameEn,
  karaokeName,
  scientificName,
  family,
  category,
  subcategory,
  description,
  attributes,
  usage,
  precautions,
  care: { sun, water, soil },
  imageSvg: pixelSvg(kind, color),
  imageSrc: imageSrc || '',
  photo: photo || '',
  tags: tags || []
});

/* ==========================================================================
   3. BOTANICAL DATA STORE
   ========================================================================== */
const plants = [
  /* ------------------- HERBS (พืชสมุนไพร) ------------------- */
  createPlant(
    1, 'ว่านหางจระเข้', 'Aloe Vera', 'วาน-หาง-จอ-ระ-เข้',
    'Aloe vera (L.) Burm.f.', 'Asphodelaceae',
    'herbs', 'home', 'leaf', '#80B918',
    'วุ้นใสใช้ทาบรรเทาแผลไฟไหม้ น้ำร้อนลวก และผิวไหม้จากแสงแดด ช่วยสมานแผลและเติมความชุ่มชื้นให้ผิวหนัง',
    'ไม้ล้มลุกหลายฤดู ใบอวบน้ำรูปดาบ ขอบใบมีหนามแหลม ภายในบรรจุวุ้นใส',
    'ปอกเปลือกสีเขียวออก ล้างยางสีเหลืองออกให้สะอาดหมดจด นำวุ้นใสมาบดหรือแปะทาบริเวณผิวหนัง',
    'ยางสีเหลืองใต้ผิวเปลือกมีสารแอนทราควิโนน อาจระคายเคืองและมีฤทธิ์เป็นยาระบายรุนแรง ไม่ควรกินยางสด',
    'แดดรำไรถึงแดดจัด', 'น้อย (รดเมื่อหน้าดินแห้ง)', 'ดินร่วนปนทราย ระบายน้ำดี',
    'assets/p_aloe.png', '', ['รสเย็น', 'บำรุงผิว']
  ),
  createPlant(
    2, 'ฟ้าทะลายโจร', 'Andrographis', 'ฟ้า-ทะ-ลาย-โจน',
    'Andrographis paniculata (Burm.f.) Nees', 'Acanthaceae',
    'herbs', 'special', 'leaf', '#4A7C59',
    'รสขมจัด บรรเทาอาการเจ็บคอ ลดไข้หวัดระยะเริ่มต้น และช่วยกระตุ้นภูมิคุ้มกันของร่างกาย',
    'ไม้ล้มลุก ลำต้นเป็นสี่เหลี่ยม แตกกิ่งก้านมาก ใบเดี่ยวรูปรีปลายแหลม ดอกสีขาวแต้มม่วง',
    'ใช้ส่วนเหนือดินตากแห้งชงดื่ม หรือใช้ในรูปแบบแคปซูลยาแผนไทยตามขนาดที่ฉลากระบุ (รับประทานติดต่อกันไม่เกิน 5-7 วัน)',
    'ห้ามใช้ในสตรีมีครรภ์และให้นมบุตร ผู้ที่มีอาการเจ็บคอเนื่องจากการติดเชื้อแบคทีเรีย และผู้ที่แพ้ฟ้าทะลายโจร',
    'แดดจัดถึงแดดปานกลาง', 'ปานกลาง', 'ดินร่วนซุย ระบายน้ำดี',
    'assets/p_fah.png', 'assets/photo_fah.jpg', ['รสขม', 'ฤทธิ์เย็น']
  ),
  createPlant(
    3, 'ขมิ้นชัน', 'Turmeric', 'ขะ-หมิ้น-ชัน',
    'Curcuma longa L.', 'Zingiberaceae',
    'herbs', 'health', 'leaf', '#D4A373',
    'เหง้าใต้ดินมีสารเคอร์คูมิน ช่วยขับลม บรรเทาอาการท้องอืด แน่น จุกเสียด และช่วยสมานแผลในกระเพาะอาหาร',
    'ไม้ล้มลุกมีเหง้าใต้ดินสีเหลืองส้มเข้มและมีกลิ่นเฉพาะ ใบเดี่ยวรูปใบหอกขนาดใหญ่',
    'ล้างเหง้าสดให้สะอาด หั่นตากแห้งบดเป็นผงชงน้ำดื่ม หรือรับประทานสดแนมน้ำพริกและใช้เป็นเครื่องแกง',
    'ควรระวังในผู้ป่วยท่อน้ำดีอุดตัน หรือผู้ที่มีนิ่วในถุงน้ำดี สตรีมีครรภ์ไม่ควรรับประทานในปริมาณสูง',
    'แดดรำไร', 'ปานกลางสม่ำเสมอ', 'ดินร่วนซุย อุดมด้วยอินทรียวัตถุ',
    'assets/p_turmeric.png', '', ['รสฝาด', 'ขับลม']
  ),
  createPlant(
    4, 'ขิง', 'Ginger', 'ขิง',
    'Zingiber officinale Roscoe', 'Zingiberaceae',
    'herbs', 'home', 'leaf', '#D4A373',
    'รสเผ็ดร้อน ช่วยขับลม แก้อาเจียน คลื่นไส้ บรรเทาอาการหวัด และช่วยกระตุ้นการไหลเวียนโลหิต',
    'พืชล้มลุก เหง้าใต้ดินเป็นข้อปล้องเนื้อแน่นสีเหลืองนวล ใบเดี่ยวแคบยาวเรียวแหลม',
    'ใช้เหง้าแก่ทุบต้มน้ำดื่มอุ่นๆ หรือฝานเป็นแว่นชงชาดื่มหลังมื้ออาหาร',
    'ควรระวังในผู้ที่รับประทานยาละลายลิ่มเลือด และผู้ป่วยแผลในกระเพาะอาหารรุนแรง',
    'แดดรำไร', 'ปานกลาง', 'ดินร่วนระบายน้ำได้ดี ไม่ขังแฉะ',
    'assets/p_ginger.png', '', ['รสเผ็ดร้อน', 'ประจำบ้าน']
  ),
  createPlant(
    5, 'บัวบก', 'Gotu Kola', 'บัว-บก',
    'Centella asiatica (L.) Urb.', 'Apiaceae',
    'herbs', 'home', 'leaf', '#4A7C59',
    'แก้ร้อนใน กระหายน้ำ แก้ช้ำใน บรรเทาอาการอักเสบ และมีสารเอเชียติโคไซด์ช่วยบำรุงสมอง',
    'ไม้เลื้อยคลุมดิน แตกไหลตามข้อ ลำต้นทอดไปตามผิวดิน ใบรูปไตขอบหยักมน',
    'ล้างใบสดให้สะอาด นำมาคั้นน้ำดื่ม หรือรับประทานเป็นผักสดแนมลาบและน้ำพริก',
    'เป็นยารสเย็นจัด ผู้ที่มีธาตุเย็น ท้องอืดง่าย หรือหญิงตั้งครรภ์ไม่ควรดื่มติดต่อกันยาวนาน',
    'แดดรำไรถึงแดดจัด', 'มาก (ชอบความชื้นสูง)', 'ดินเหนียวปนร่วน ชุ่มชื้น',
    'assets/p_gotu.png', '', ['รสขม', 'แก้ช้ำใน']
  ),
  createPlant(
    6, 'มะรุม', 'Moringa', 'มะ-รุม',
    'Moringa oleifera Lam.', 'Moringaceae',
    'herbs', 'health', 'tree', '#386641',
    'ใบและฝักอุดมด้วยวิตามิน แคลเซียม และสารต้านอนุมูลอิสระ ช่วยลดความดันโลหิตและบำรุงร่างกาย',
    'ไม้ยืนต้นโตเร็ว เปลือกต้นสีขาว ใบประกอบขนนก ฝักยาวห้อยลง เมล็ดมีปีก',
    'นำยอดอ่อนและฝักอ่อนมาต้มลวก ปรุงแกงส้ม หรืออบแห้งใบทำชาชงดื่มเพื่อสุขภาพ',
    'สตรีมีครรภ์ไม่ควรรับประทานรากหรือเปลือกต้น เพราะอาจกระตุ้นการบีบตัวของมดลูก',
    'แดดจัด', 'ปานกลางถึงน้อย (ทนแล้งดี)', 'ดินร่วนปนทราย',
    'assets/ma-rum-1.svg', '', ['บำรุงสุขภาพ', 'วิตามินสูง']
  ),
  createPlant(
    7, 'ไพล', 'Cassumunar Ginger', 'ไพล',
    'Zingiber montanum (J.Koenig) Link ex A.Dietr.', 'Zingiberaceae',
    'herbs', 'special', 'leaf', '#D4A373',
    'เหง้าสดมีน้ำมันหอมระเหย บรรเทาอาการเคล็ดขัดยอก ฟกช้ำ บวม และแก้ปวดเมื่อยกล้ามเนื้อ',
    'พืชล้มลุกมีเหง้าใต้ดินสีเหลืองส้ม กลิ่นหอมฉุนเฉพาะตัว ลำต้นเทียมสูงประมาณ 1 เมตร',
    'ใช้เหง้าสดตำพอก หรือสกัดเป็นน้ำมันไพลใช้ทาถูนวดบริเวณที่มีอาการฟกช้ำและปวดเมื่อย',
    'หลีกเลี่ยงการทาบริเวณผิวหนังที่มีบาดแผลเปิด หรือบริเวณเนื้อเยื่ออ่อนรอบดวงตา',
    'แดดรำไรถึงแดดจัด', 'ปานกลาง', 'ดินร่วนโปร่ง ระบายน้ำดี',
    '', '', ['แก้ฟกช้ำ', 'น้ำมันไพล']
  ),

  /* ------------------- EDIBLE (พืชอาหาร) ------------------- */
  createPlant(
    8, 'ผักบุ้งไทย', 'Water Morning Glory', 'ผัก-บุ้ง-ไทย',
    'Ipomoea aquatica Forssk.', 'Convolvulaceae',
    'edible', 'veg', 'leaf', '#80B918',
    'ผักใบเขียวคู่ครัวไทย อุดมด้วยเบตาแคโรทีน วิตามินเอ ช่วยบำรุงสายตาและมีกากใยสูงช่วยระบบขับถ่าย',
    'ไม้ทอดเลื้อย ลำต้นกลวงมีข้อปล้อง ใบรูปหอกหรือรูปหัวลูกศร ดอกรูปแตรสีขาวอมม่วง',
    'ล้างน้ำให้สะอาด เด็ดยอดและใบนำไปผัดไฟแดง ลวกจิ้มน้ำพริก หรือใส่ในแกงส้มและเย็นตาโฟ',
    'เนื่องจากมักเจริญเติบโตในแหล่งน้ำธรรมชาติ จึงควรล้างทำความสะอาดอย่างทั่วถึงเพื่อขจัดปรสิตและสารตกค้าง',
    'แดดจัด', 'มาก (ขึ้นได้ทั้งในน้ำและดินแฉะ)', 'ดินเลนหรือดินชื้นแฉะ',
    '', '', ['ผักริมรั้ว', 'บำรุงสายตา']
  ),
  createPlant(
    9, 'ตำลึง', 'Ivy Gourd', 'ตำ-ลึง',
    'Coccinia grandis (L.) Voigt', 'Cucurbitaceae',
    'edible', 'veg', 'leaf', '#4A7C59',
    'ผักริมรั้วยอดนิยม มีแคลเซียม ฟอสฟอรัส และวิตามินซีสูง ช่วยดับพิษร้อนและบำรุงกระดูก',
    'ไม้เถาเลื้อย มีมือเกาะ ใบเดี่ยวรูปห้าเหลี่ยมหรือรูปหัวใจ ผลรูปกระสวยสุกสีแดงสด',
    'เด็ดยอดอ่อนและใบนำไปลวกจิ้ม ต้มจืดหมูสับ หรือผัดไข่ รับประทานง่ายและย่อยง่าย',
    'ใบสดหากสัมผัสบางรายอาจระคายเคืองยางอ่อน ควรล้างน้ำก่อนปรุงอาหาร',
    'แดดจัดถึงแดดรำไร', 'ปานกลาง', 'ดินร่วนทั่วไป',
    '', '', ['ผักพื้นบ้าน', 'แคลเซียมสูง']
  ),
  createPlant(
    10, 'มะม่วง', 'Mango', 'มะ-ม่วง',
    'Mangifera indica L.', 'Anacardiaceae',
    'edible', 'fruit', 'fruit', '#E8B923',
    'ผลไม้เขตร้อนยอดนิยม ผลดิบมีรสเปรี้ยวหรือมัน ผลสุกรสหวานหอม อุดมด้วยวิตามินเอและซี',
    'ไม้ยืนต้นขนาดกลางถึงใหญ่ ทรงพุ่มหนาทึบ ดอกออกเป็นช่อ ผลรูปไข่หรือรูปไตทรงรี',
    'รับประทานผลสุกคู่ข้าวเหนียวมูน หรือนำผลดิบมารับประทานกับน้ำปลาหวานและแปรรูปเป็นมะม่วงกวน',
    'ผู้มีอาการแพ้ยางมะม่วงควรระวังการสัมผัสยางสดที่ขั้วผล เพราะอาจทำให้เกิดผื่นคันรอบปากและผิวหนัง',
    'แดดจัดตลอดวัน', 'ปานกลาง', 'ดินร่วนลึก ระบายน้ำดี',
    '', '', ['ผลไม้พื้นเมือง', 'วิตามินสูง']
  ),
  createPlant(
    11, 'มะละกอ', 'Papaya', 'มะ-ละ-กอ',
    'Carica papaya L.', 'Caricaceae',
    'edible', 'fruit', 'fruit', '#E07A5F',
    'ผลดิบใช้ทำส้มตำ มีเอนไซม์ปาเปนช่วยย่อยโปรตีน ผลสุกมีเบตาแคโรทีนสูงและช่วยระบายท้อง',
    'ไม้ล้มลุกกึ่งยืนต้น ลำต้นตั้งตรงไม่แตกกิ่ง มีรอยแผลใบ ใบหยักลึกรูปนิ้วมือ ผลทรงกระบอกยาว',
    'ผลดิบขูดเป็นเส้นปรุงส้มตำหรือแกงส้ม ผลสุกปอกเปลือกรับประทานสดแช่เย็น',
    'ยางมะละกอดิบมีความเป็นกรดและเอนไซม์กัดผิวหนัง สตรีมีครรภ์ควรหลีกเลี่ยงการกินผลดิบปริมาณมาก',
    'แดดจัด', 'ปานกลาง (ระวังน้ำขังรากเน่า)', 'ดินร่วนปนทราย ระบายน้ำคล่อง',
    'assets/papaya-1.svg', '', ['ผลไม้พื้นบ้าน', 'ช่วยย่อย']
  ),
  createPlant(
    12, 'กะเพรา', 'Holy Basil', 'กะ-เพรา',
    'Ocimum tenuiflorum L.', 'Lamiaceae',
    'edible', 'spice', 'leaf', '#386641',
    'เครื่องเทศเอกลักษณ์ไทย กลิ่นหอมฉุนเผ็ดร้อน ช่วยขับลม แก้อาการจุกเสียดและคลื่นไส้',
    'ไม้พุ่มเตี้ย ลำต้นเป็นเหลี่ยมมีขนปกคลุม ใบเดี่ยวขอบหยักฟันเลื่อย ดอกออกเป็นช่อปลายยอด',
    'เด็ดใบสดใส่ในอาหารผัด ต้มยำ หรือแกงป่า โดยใส่ในขั้นตอนสุดท้ายเพื่อให้ได้น้ำมันหอมระเหยเข้มข้น',
    'ผู้ที่มีภาวะเลือดหยุดยากควรระมัดระวัง เพราะสารในน้ำมันกะเพราอาจชะลอการแข็งตัวของเลือด',
    'แดดจัด', 'ปานกลางสม่ำเสมอ', 'ดินร่วนซุย ระบายน้ำดี',
    'assets/p_basil.png', '', ['รสเผ็ดร้อน', 'เครื่องเทศ']
  ),
  createPlant(
    13, 'ตะไคร้', 'Lemongrass', 'ตะ-ไคร้',
    'Cymbopogon citratus (DC.) Stapf', 'Poaceae',
    'edible', 'spice', 'leaf', '#80B918',
    'พืชแต่งกลิ่นหอมสดชื่น เป็นส่วนประกอบหลักของเครื่องแกงและต้มยำ ช่วยขับเหงื่อ ขับลม และเจริญอาหาร',
    'พืชตระกูลหญ้าขึ้นเป็นกอหนา กาบใบหุ้มซ้อนกันเป็นลำต้นเทียม ใบแคบยาวมีขนสากมือ',
    'ใช้โคนต้นทุบพอแตกใส่ในต้มยำ หรือซอยละเอียดโขลกในพริกแกงและทำยำตะไคร้กุ้งสด',
    'สตรีมีครรภ์อ่อนๆ ควรหลีกเลี่ยงการดื่มน้ำมันหอมระเหยเข้มข้นจากตะไคร้',
    'แดดจัด', 'ปานกลาง', 'ดินร่วนซุย',
    '', '', ['กลิ่นหอม', 'ต้มยำ']
  ),

  /* ------------------- ECONOMIC (พืชเศรษฐกิจ) ------------------- */
  createPlant(
    14, 'ข้าว', 'Rice', 'ข้าว',
    'Oryza sativa L.', 'Poaceae',
    'economic', 'field', 'leaf', '#E8B923',
    'พืชอาหารหลักของคนไทยและสินค้าส่งออกอันดับต้นๆ ของประเทศ แปรรูปเป็นข้าวสาร แป้ง และน้ำมันรำข้าว',
    'พืชล้มลุกตระกูลหญ้า ลำต้นกลวงเป็นข้อปล้อง ใบเรียวยาว ออกรวงเป็นช่อโค้งเมื่อเมล็ดแก่',
    'เก็บเกี่ยวเมล็ดข้าว นำไปสีเป็นข้าวกล้องหรือข้าวขาวเพื่อหุงรับประทาน และแปรรูปเป็นผลิตภัณฑ์อาหาร',
    'การเก็บรักษาต้องระวังความชื้นเพื่อป้องกันการเกิดเชื้อราอะฟลาทอกซิน',
    'แดดจัดเต็มวัน', 'มาก (ต้องการน้ำขังช่วงเติบโต)', 'ดินเหนียวหรือดินร่วนเหนียว',
    'assets/rice-1.svg', '', ['พืชหลัก', 'สินค้าส่งออก']
  ),
  createPlant(
    15, 'อ้อย', 'Sugarcane', 'อ้อย',
    'Saccharum officinarum L.', 'Poaceae',
    'economic', 'field', 'tree', '#80B918',
    'พืชไร่อุตสาหกรรมสำคัญ ผลิตน้ำตาลทราย เอทานอลพลังงานทดแทน และกากชานอ้อยสำหรับผลิตกระดาษ',
    'พืชตระกูลหญ้าลำต้นเดี่ยวสูงใหญ่ ข้อปล้องอวบแน่นสะสมน้ำหวาน เปลือกนอกแข็ง',
    'ตัดลำต้นส่งเข้าโรงงานน้ำตาลเพื่อหีบน้ำอ้อย แปรรูปเป็นน้ำตาลทราย โมลาส และเอทานอล',
    'ผู้ป่วยโรคเบาหวานควรควบคุมการบริโภคน้ำตาลจากอ้อยอย่างเคร่งครัด',
    'แดดจัดตลอดวัน', 'ปานกลาง (ทนแล้งช่วงสุก)', 'ดินร่วนปนทรายหรือดินร่วนเหนียว',
    '', '', ['อุตสาหกรรม', 'พลังงานชีวภาพ']
  ),
  createPlant(
    16, 'กระจูด', 'Krachut Sedge', 'กระ-จูด',
    'Lepironia articulata (Retz.) Domin', 'Cyperaceae',
    'economic', 'fiber', 'leaf', '#4A7C59',
    'พืชเส้นใยภูมิปัญญาพื้นบ้านภาคใต้ ใช้สานเสื่อ กระเป๋า และของตกแต่งบ้าน สร้างรายได้ยั่งยืนให้ชุมชน',
    'พืชตระกูลกก ลำต้นกลมเหนียวภายในกลวง ขึ้นรวมกันเป็นกอหนาแน่นในพื้นที่พรุและบึงน้ำ',
    'ตัดลำต้นสด คัดขนาด คลุกโคลนขาว ตากแดดให้แห้งสนิท แล้วนำมารีดแบนก่อนสานเป็นผลิตภัณฑ์',
    'ผลิตภัณฑ์กระจูดควรหลีกเลี่ยงความชื้นสะสมเพื่อป้องกันเชื้อรา และควรผึ่งแดดเป็นประจำ',
    'แดดจัด', 'มาก (แช่น้ำตลอดเวลา)', 'ดินพรุหรือดินเลนชุ่มน้ำ',
    '', '', ['งานจักสาน', 'หัตถกรรมใต้']
  ),
  createPlant(
    17, 'ป่านศรนารายณ์', 'Sisal', 'ป่าน-สอน-นา-ราย',
    'Agave sisalana Perrine', 'Asparagaceae',
    'economic', 'fiber', 'leaf', '#80B918',
    'เส้นใยมีความเหนียว แข็งแรง ทนทานต่อน้ำเค็ม นำมาถักทอเป็นเชือก พรม กระเป๋า และหมวกสาน',
    'พืชอวบน้ำไม่มีลำต้น ใบรูปดาบหนาแข็งปลายใบมีหนามแหลม เรียงเวียนซ้อนเป็นกอใหญ่',
    'ตัดใบล่าง ขูดแยกเนื้อใบออก ล้างและตากเส้นใยให้แห้ง นำไปฟอกย้อมสีแล้วถักทอ',
    'น้ำคั้นสดจากใบมีสารซาโปนินเข้มข้น อาจทำให้ผิวหนังไหม้และเกิดผื่นแพ้แสบคันรุนแรง',
    'แดดจัดเต็มวัน', 'น้อยมาก (ทนแล้งยอดเยี่ยม)', 'ดินร่วนปนทราย ดินลูกรัง',
    '', '', ['เส้นใยเหนียว', 'ทนแล้ง']
  ),
  createPlant(
    18, 'ยางพารา', 'Para Rubber Tree', 'ยาง-พา-รา',
    'Hevea brasiliensis (Willd. ex A.Juss.) Müll.Arg.', 'Euphorbiaceae',
    'economic', 'extract', 'tree', '#386641',
    'พืชเศรษฐกิจสกัดน้ำยางหลักของประเทศ ใช้ผลิตยางล้อรถยนต์ ถุงมือแพทย์ ที่นอน และผลิตภัณฑ์ยางพารา',
    'ไม้ยืนต้นผลัดใบ ลำต้นตรง เปลือกเรียบสีเทา มีท่อน้ำยางสีขาวนวลอยู่ใต้เปลือกใน',
    'กรีดเปลือกต้นในช่วงเช้ามืดเพื่อให้น้ำยางไหลลงถ้วยรอง นำน้ำยางสดไปจับตัวเป็นยางแผ่นหรือน้ำยางข้น',
    'ผู้ที่มีอาการแพ้สารโปรตีนในยางธรรมชาติ (Latex Allergy) ควรหลีกเลี่ยงการสัมผัสโดยตรง',
    'แดดจัด', 'ปานกลางถึงมาก', 'ดินร่วนลึก หน้าดินหนา ระบายน้ำดี',
    'assets/rubber-1.svg', '', ['พืชสกัด', 'ยางพาราไทย']
  ),
  createPlant(
    19, 'ปาล์มน้ำมัน', 'Oil Palm', 'ปาล์ม-น้ำ-มัน',
    'Elaeis guineensis Jacq.', 'Arecaceae',
    'economic', 'extract', 'tree', '#E8B923',
    'สกัดน้ำมันปาล์มสำหรับบริโภค อุตสาหกรรมอาหาร และแปรรูปเป็นไบโอดีเซล B100 เป็นพืชพลังงานสำคัญ',
    'พืชตระกูลปาล์ม ลำต้นเดี่ยวทรงกระบอก ใบประกอบขนนกขนาดใหญ่ ทะลายผลออกตามซอกกาบใบ',
    'ตัดทะลายปาล์มสุกส่งโรงงานสกัดน้ำมัน นำไปนึ่ง แยกผล และบีบสกัดน้ำมันปาล์มดิบ',
    'การปลูกควรคำนึงถึงการอนุรักษ์พื้นที่ป่าไม้และจัดการน้ำอย่างยั่งยืน',
    'แดดจัดเต็มวัน', 'มาก สม่ำเสมอตลอดปี', 'ดินร่วนเหนียว อุดมด้วยแร่ธาตุ',
    '', '', ['น้ำมันพืช', 'พลังงานทดแทน']
  ),

  /* ------------------- ORNAMENTAL (พืชไม้ประดับ) ------------------- */
  createPlant(
    20, 'ดอกบัวหลวง', 'Sacred Lotus', 'ดอก-บัว-หลวง',
    'Nelumbo nucifera Gaertn.', 'Nelumbonaceae',
    'ornamental', 'flower', 'flower', '#E07A5F',
    'ดอกไม้มงคลสัญลักษณ์แห่งความบริสุทธิ์ในพุทธศาสนา ใช้บูชาพระ ประดับสระน้ำ เกสรใช้ทำชาบำรุงหัวใจ',
    'ไม้น้ำล้มลุก เหง้าไหลอยู่ใต้โคลน ใบกลมใหญ่ชูเหนือน้ำ ดอกเดี่ยวขนาดใหญ่สีชมพูหรือขาว กลิ่นหอม',
    'ปลูกประดับบ่อน้ำ อ่างบัว ตัดดอกในตอนเช้าเพื่อบูชาพระ เมล็ดบัวและรากบัวสามารถนำมารับประทานได้',
    'ก้านใบและก้านดอกมีหนามเล็กๆ แหลมคม ควรระมัดระวังเวลาตัดแต่งและหยิบจับ',
    'แดดจัดเต็มวัน', 'ต้องแช่อยู่ในน้ำตลอดเวลา', 'ดินเหนียวใต้น้ำ',
    'assets/bua-luang-1.svg', '', ['ไม้ดอกไทย', 'ไม้มงคล']
  ),
  createPlant(
    21, 'ราชพฤกษ์', 'Golden Shower', 'ราด-ชะ-พฺรึก',
    'Cassia fistula L.', 'Fabaceae',
    'ornamental', 'flower', 'tree', '#FFE066',
    'ต้นไม้ประจำชาติไทย ดอกสีเหลืองทองอร่ามออกเป็นช่อระย้าสวยงาม นิยมปลูกประดับริมถนนและสวนสาธารณะ',
    'ไม้ยืนต้นขนาดกลาง ผลัดใบช่วงฤดูร้อนก่อนออกดอก ช่อดอกยาวห้อยย้อย ฝักยาวทรงกระบอกสีน้ำตาลดำ',
    'ปลูกเป็นไม้ประดับให้ร่มเงาและภูมิทัศน์ เนื้อในฝักแก่มีรสหวานอมเปรี้ยวใช้เป็นยาระบายแผนไทย',
    'เนื้อในฝักมีฤทธิ์ระบายท้อง หากรับประทานมากเกินไปอาจทำให้ปวดมวนท้องและท้องร่วง',
    'แดดจัด', 'ปานกลาง (ทนแล้งดีเยี่ยม)', 'ดินร่วนซุย ระบายน้ำดี',
    'assets/ratchaphruek-1.svg', '', ['ต้นไม้ประจำชาติ', 'ดอกสีทอง']
  ),
  createPlant(
    22, 'ต้นแก้ว', 'Orange Jasmine', 'ต้น-แก้ว',
    'Murraya paniculata (L.) Jack', 'Rutaceae',
    'ornamental', 'lucky', 'tree', '#80B918',
    'ไม้มงคลโบราณ เชื่อว่าจะทำให้คนในบ้านมีจิตใจผ่องใสบริสุทธิ์ดั่งแก้ว ดอกสีขาวส่งกลิ่นหอมชื่นใจในยามค่ำคืน',
    'ไม้พุ่มหรือไม้ยืนต้นขนาดเล็ก ใบประกอบแบบขนนก ผิวใบเป็นมัน ดอกสีขาวช่อสั้น ผลสุกสีส้มแดง',
    'ปลูกเป็นไม้พุ่มริมรั้ว ตัดแต่งทรงพุ่ม หรือปลูกทิศตะวันออกเพื่อความเป็นสิริมงคล',
    'ผลสุกและเมล็ดมีสารที่อาจก่อการระคายเคืองในเด็กเล็ก ควรระวังไม่ให้เด็ดรับประทาน',
    'แดดจัดถึงแดดรำไร', 'ปานกลาง', 'ดินร่วนโปร่ง ระบายน้ำดี',
    '', '', ['ไม้มงคล', 'ดอกหอม']
  ),
  createPlant(
    23, 'นางกวัก', 'Buddha\'s Hand', 'นาง-กวัก',
    'Alocasia cucullata (Lour.) G.Don', 'Araceae',
    'ornamental', 'lucky', 'leaf', '#4A7C59',
    'ไม้มงคลยอดนิยมตามความเชื่อว่าจะช่วยกวักเงินกวักทอง กวักโชคลาภ และลูกค้าเข้ามาสู่บ้านหรือร้านค้า',
    'ไม้ล้มลุกมีเหง้าใต้ดิน ลำต้นตั้งตรง ใบเดี่ยวรูปหัวใจปลายแหลมงอคล้ายมือกวัก ก้านใบยาวอวบน้ำ',
    'ปลูกในกระถางดินเผาตั้งหน้าบ้าน หน้าร้าน หรือมุมห้องทำงานเพื่อเสริมฮวงจุ้ยและฟอกอากาศ',
    'น้ำยางในทุกส่วนของลำต้นมีสารแคลเซียมออกซาเลต ทำให้แสบคันระคายเคืองผิวหนังและเป็นพิษหากกลืนกิน',
    'แดดรำไร (ไม่ชอบแดดจัดตรงๆ)', 'ปานกลาง (ชอบความชื้น)', 'ดินร่วนผสมกาบมะพร้าวสับ',
    '', '', ['เสริมโชคลาภ', 'ฟอกอากาศ']
  ),
  createPlant(
    24, 'พลูด่าง', 'Golden Pothos', 'พลู-ด่าง',
    'Epipremnum aureum (Linden & André) G.S.Bunting', 'Araceae',
    'ornamental', 'garden', 'leaf', '#80B918',
    'ไม้เลื้อยยอดนิยม เลี้ยงง่าย ทนทาน มีคุณสมบัติช่วยดูดซับสารพิษจำพวกฟอร์มาลดีไฮด์และฟอกอากาศในอาคาร',
    'ไม้เลื้อยอิงอาศัย ลำต้นมีรากยึดเกาะ ใบรูปหัวใจแผ่นใบด่างลายสีเหลืองทองสลับเขียว',
    'ปลูกในกระถางแขวน เลื้อยขึ้นเสา หรือแช่แจกันน้ำตกแต่งบนโต๊ะทำงานและห้องนั่งเล่น',
    'มีสารแคลเซียมออกซาเลต เป็นพิษต่อสัตว์เลี้ยงอย่างสุนัขและแมวหากกัดแทะ',
    'แดดรำไรหรือแสงสว่างในร่ม', 'ปานกลาง (เลี้ยงในน้ำได้)', 'ดินร่วนโปร่ง หรือน้ำสะอาด',
    '', '', ['ไม้จัดสวน', 'ฟอกอากาศ']
  ),
  createPlant(
    25, 'ลิ้นมังกร', 'Snake Plant', 'ลิ้น-มัง-กอน',
    'Sansevieria trifasciata Prain', 'Asparagaceae',
    'ornamental', 'garden', 'leaf', '#386641',
    'ไม้จัดสวนทนแล้ง ช่วยคายออกซิเจนในเวลากลางคืนและดูดซับคาร์บอนไดออกไซด์ เหมาะสำหรับวางในห้องนอน',
    'พืชอวบน้ำ มีเหง้าใต้ดิน ใบแทงขึ้นเป็นแผ่นหนาแข็งรูปหอกยาว ลวดลายริ้วขวางสีเขียวสลับเทา ขอบใบสีเหลือง',
    'ปลูกลงแปลงจัดสวนหิน สวนโมเดิร์น หรือใส่กระถางตกแต่งภายในห้องอาคาร',
    'หลีกเลี่ยงการรดน้ำจนดินแฉะขัง เพราะจะทำให้โคนต้นและเหง้าเน่าตายได้ง่าย',
    'แดดรำไรถึงแดดจัด', 'น้อยมาก (รด 1-2 สัปดาห์ครั้ง)', 'ดินร่วนปนทราย ระบายน้ำดีเยี่ยม',
    '', '', ['ไม้ฟอกอากาศ', 'ทนทาน']
  )
];

/* ==========================================================================
   4. APPLICATION STATE
   ========================================================================== */
const state = {
  currentCategory: 'home',
  activeSubcategory: 'all',
  searchQuery: '',
  selectedPlantId: null,
  activeTab: 'info',
  sort: 'az'
};

/* DOM Helper */
const $ = (id) => document.getElementById(id);
const norm = (s) => (s || '').toLowerCase().trim();

/* Helper to render plant artwork */
const getPlantArtwork = (p) => {
  if (p.imageSrc) {
    return `<img src="${p.imageSrc}" alt="${p.nameTh}" class="pixel-art" onerror="this.onerror=null; this.outerHTML='${p.imageSvg.replace(/'/g, "\\'")}';">`;
  }
  return p.imageSvg;
};

/* Helper to render tags */
const renderTags = (tags = []) => {
  return tags.map((t) => {
    let mod = '';
    if (/เย็น|ช้ำ/i.test(t)) mod = 'chip--cool';
    else if (/เผ็ด|ร้อน|พิษ/i.test(t)) mod = 'chip--hot';
    else if (/ฝาด|หัตถกรรม|ส่งออก/i.test(t)) mod = 'chip--warm';
    else if (/บำรุง|ผัก|มงคล/i.test(t)) mod = 'chip--lime';
    return `<span class="chip ${mod}">${t}</span>`;
  }).join('');
};

/* ==========================================================================
   5. FILTERING & RENDERING LOGIC
   ========================================================================== */

/**
 * Filter plants according to current active state (category, subcategory, search)
 */
const getFilteredPlants = () => {
  const query = norm(state.searchQuery);
  const filtered = plants.filter((p) => {
    const matchCategory = state.currentCategory === 'home' || p.category === state.currentCategory;
    const matchSubcategory = state.activeSubcategory === 'all' || p.subcategory === state.activeSubcategory;
    const matchSearch = !query || [
      p.nameTh,
      p.nameEn,
      p.karaokeName,
      p.scientificName,
      p.family,
      p.attributes,
      p.description
    ].some((field) => norm(field).includes(query));

    return matchCategory && matchSubcategory && matchSearch;
  });

  if (state.sort === 'az') {
    return [...filtered].sort((a, b) => a.nameTh.localeCompare(b.nameTh, 'th'));
  }
  return filtered;
};

/**
 * Render single plant card markup
 */
const renderPlantCardMarkup = (p) => `
  <div class="col">
    <article class="card-plant card-plant--pixel">
      <div class="card-plant__img">
        ${getPlantArtwork(p)}
      </div>
      <div class="card-plant__body">
        <h3 class="card-plant__name">
          ${p.nameTh} <small>/ ${p.nameEn}</small>
        </h3>
        <p class="card-plant__line"><strong>สรรพคุณ:</strong> ${p.description}</p>
        <p class="card-plant__line"><strong>ลักษณะ:</strong> ${p.attributes}</p>
        <div>${renderTags(p.tags)}</div>
        <button class="btn-pixel btn-pixel--green" type="button" data-open="${p.id}" aria-label="อ่านข้อมูล ${p.nameTh}">
          อ่านข้อมูล / View
        </button>
      </div>
    </article>
  </div>
`;

/**
 * Render Top Navbar
 */
const renderNav = () => {
  const homeBtn = `
    <button class="pill pill--nav ${state.currentCategory === 'home' ? 'is-active' : ''}" type="button" data-cat="home">
      <span><b>หน้าหลัก</b><small>Home</small></span>
    </button>
  `;

  const catBtns = Object.entries(CATEGORIES).map(([key, cat]) => `
    <button class="pill pill--nav ${state.currentCategory === key ? 'is-active' : ''}" type="button" data-cat="${key}">
      <img src="${cat.icon}" alt="" class="pixel-art">
      <span><b>${cat.th}</b><small>${cat.en}</small></span>
    </button>
  `).join('');

  $('mainNav').innerHTML = homeBtn + catBtns;
};

/**
 * Update dynamic species counter display
 */
const updateSpeciesCounter = () => {
  const list = getFilteredPlants();
  const count = list.length;
  $('speciesCounter').textContent = `ค้นพบ ${count} ชนิด / ${count} Species Found`;
  $('emptyState').hidden = count !== 0;
};

/**
 * Render Plant Grid in category view
 */
const renderGrid = () => {
  const list = getFilteredPlants();
  $('plantGrid').innerHTML = list.map(renderPlantCardMarkup).join('');
  updateSpeciesCounter();
};

/**
 * Render Subcategory Tabs in sidebar
 */
const renderSubTabs = () => {
  if (state.currentCategory === 'home') {
    $('subTabs').innerHTML = '';
    return;
  }

  const categoryData = CATEGORIES[state.currentCategory];
  if (!categoryData) return;

  const tabs = [
    ['all', 'ทั้งหมด / All'],
    ...Object.entries(categoryData.subs)
  ];

  $('subTabs').innerHTML = tabs.map(([key, label]) => `
    <button
      class="pill ${state.activeSubcategory === key ? 'is-active' : ''}"
      type="button"
      role="tab"
      aria-selected="${state.activeSubcategory === key}"
      data-sub="${key}">
      ${label}
    </button>
  `).join('');
};

/**
 * Switch views visibility (Home Overview vs Category View)
 */
const showViews = () => {
  const isSearching = !!state.searchQuery.trim();
  const isHome = state.currentCategory === 'home';

  $('homeView').hidden = !isHome || isSearching;
  $('categoryView').hidden = isHome && !isSearching;
};

/**
 * Switch category view
 */
const renderCategory = (categoryKey) => {
  state.currentCategory = categoryKey;
  state.activeSubcategory = 'all';

  document.querySelectorAll('.js-search').forEach((input) => {
    input.value = state.searchQuery;
  });

  const cat = CATEGORIES[categoryKey];
  $('categoryTitle').textContent = cat ? `หมวดหมู่: ${cat.th}` : 'ผลการค้นหา / Search Results';

  showViews();
  renderNav();
  renderSubTabs();
  renderGrid();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Filter plants by subcategory tab
 */
const filterBySubcategory = (subcategoryKey) => {
  state.activeSubcategory = subcategoryKey;
  renderSubTabs();
  renderGrid();
};

/**
 * Real-time search handler
 */
const handleSearch = (searchTerm) => {
  state.searchQuery = searchTerm;

  document.querySelectorAll('.js-search').forEach((input) => {
    if (input.value !== searchTerm) input.value = searchTerm;
  });

  if (state.currentCategory === 'home') {
    $('categoryTitle').textContent = 'ผลการค้นหา / Search Results';
  }

  showViews();
  renderGrid();
};

/* ==========================================================================
   6. PLANT DETAIL MODAL / OVERLAY VIEW
   ========================================================================== */

/**
 * Render detail view overlay
 */
const renderDetail = () => {
  const p = plants.find((x) => x.id === state.selectedPlantId);
  if (!p) return;

  const cat = CATEGORIES[p.category] || CATEGORIES.herbs;

  // Back button text
  $('backBtn').textContent = `← ย้อนกลับไปยังหน้า${cat.th} / Back to ${cat.en}`;

  // Quick category switchers
  $('quickSwitch').innerHTML = Object.entries(CATEGORIES).map(([key, item]) => `
    <button class="pill pill--nav ${key === p.category ? 'is-active' : ''}" type="button" data-quick="${key}">
      <img src="${item.icon}" alt="" class="pixel-art">
      <span><b>${item.th}</b><small>${item.en}</small></span>
    </button>
  `).join('');

  // Tab definitions
  const tabs = {
    info: [
      'สรรพคุณ',
      'Properties',
      `
        <h3>สรรพคุณและประโยชน์</h3>
        <p>${p.description}</p>
        <p><strong>ลักษณะทั่วไป:</strong> ${p.attributes}</p>
        <h3>การดูแล / Care Guide</h3>
        <ul>
          <li><strong>แสงแดด:</strong> ${p.care.sun}</li>
          <li><strong>การรดน้ำ:</strong> ${p.care.water}</li>
          <li><strong>สภาพดิน:</strong> ${p.care.soil}</li>
        </ul>
      `
    ],
    usage: [
      'วิธีใช้ & ข้อมูล',
      'Usage & Data',
      `
        <h3>วิธีใช้ & วิธีเตรียม / Usage</h3>
        <p>${p.usage}</p>
        <h3>ข้อมูลพฤกษศาสตร์</h3>
        <ul>
          <li><strong>ชื่อวิทยาศาสตร์:</strong> <em>${p.scientificName}</em></li>
          <li><strong>ชื่อวงศ์ (Family):</strong> ${p.family.toUpperCase()}</li>
          <li><strong>ชื่อเรียก:</strong> ${p.nameTh} (${p.karaokeName}) / ${p.nameEn}</li>
        </ul>
      `
    ],
    warn: [
      'ข้อควรระวัง',
      'Precautions',
      `
        <h3>⚠ ข้อควรระวัง / Precautions</h3>
        <p class="text-danger fw-bold">${p.precautions}</p>
        <div class="panel parchment mt-3">
          <strong>คำแนะนำด้านความปลอดภัย:</strong>
          <p>ข้อมูลนี้จัดทำเพื่อการศึกษาค้นคว้าเบื้องต้น หากใช้เพื่อการรักษาโรค ควรปรึกษาแพทย์แผนไทยหรือบุคลากรทางการแพทย์ผู้เชี่ยวชาญก่อนใช้เสมอ</p>
        </div>
      `
    ]
  };

  // Main visual (Photo or 8-bit Art)
  const photoMarkup = p.photo
    ? `<img src="${p.photo}" alt="${p.nameTh}" class="pixel-art"><span class="detail__label-tag">รูปภาพจริง / Real Photo</span>`
    : `${getPlantArtwork(p)}<span class="detail__label-tag">ภาพ 8-bit / 8-bit Art</span>`;

  $('detailBody').innerHTML = `
    <!-- Left Column: Visual & Taxonomical Attributes -->
    <div class="col-12 col-lg-6">
      <div class="detail__photo">
        ${photoMarkup}
        <div class="detail__inset">
          ${p.imageSvg}
          ภาพ 8-bit<br>8-bit Art
        </div>
      </div>

      <h2 class="detail__name">
        ${p.nameTh} <span>/ ${p.karaokeName}</span>
      </h2>

      <p class="detail__meta">
        <span class="detail__label">Scientific Name :</span> <em>${p.scientificName}</em>
      </p>
      <p class="detail__meta">
        <span class="detail__label">Family :</span> ${p.family.toUpperCase()}
      </p>
      <p class="detail__meta">
        <span class="detail__label">Common Attributes :</span> ${renderTags(p.tags)}
      </p>
      <p class="detail__meta">
        <span class="detail__label">ข้อควรระวัง :</span> ${p.precautions}
      </p>
    </div>

    <!-- Right Column: Detail Content Panel & Tabs -->
    <div class="col-12 col-lg-6">
      <div class="parchment detail__panel">
        <img class="detail__npc d-none d-lg-block pixel-art" src="assets/npc.png" alt="NPC Explorer">
        <div class="detail__tabs" role="tablist">
          ${Object.entries(tabs).map(([key, [th, en]]) => `
            <button
              class="pill ${state.activeTab === key ? 'is-active' : ''}"
              type="button"
              role="tab"
              aria-selected="${state.activeTab === key}"
              data-tab="${key}">
              ${th}<small>${en}</small>
            </button>
          `).join('')}
        </div>
        <div class="detail__content">
          ${tabs[state.activeTab][2]}
        </div>
      </div>
    </div>
  `;
};

/**
 * Open detail modal
 */
const openModal = (plantId) => {
  state.selectedPlantId = plantId;
  state.activeTab = 'info';
  renderDetail();
  $('overlay').hidden = false;
  document.body.classList.add('is-locked');
  $('overlay').scrollTop = 0;
  $('backBtn').focus();
};

/**
 * Close detail modal
 */
const closeModal = () => {
  state.selectedPlantId = null;
  $('overlay').hidden = true;
  document.body.classList.remove('is-locked');
};

/* ==========================================================================
   7. INITIALIZATION & EVENT BINDINGS
   ========================================================================== */
const initApp = () => {
  // 1. Render Home Category Navigation Cards
  $('categoryCards').innerHTML = Object.entries(CATEGORIES).map(([key, cat]) => {
    const count = plants.filter((p) => p.category === key).length;
    return `
      <div class="col">
        <div class="card-plant card-plant--pixel card-plant--cat" data-cat="${key}">
          <img src="${cat.icon}" alt="${cat.th}" class="pixel-art">
          <h3>${cat.th}</h3>
          <div class="card-plant__en">${cat.en}</div>
          <p>${cat.desc}</p>
          <div class="badge-pixel mt-1">${count} ชนิดพันธุ์</div>
          <button class="btn-pixel" type="button" data-cat="${key}">สำรวจเลย →</button>
        </div>
      </div>
    `;
  }).join('');

  // 2. Render Featured Plants on Home Page
  const featuredIds = [2, 1, 3, 12, 14, 20];
  const featuredList = featuredIds
    .map((id) => plants.find((p) => p.id === id))
    .filter(Boolean);
  $('featuredGrid').innerHTML = featuredList.map(renderPlantCardMarkup).join('');

  // 3. Render Topbar Nav & Counters
  renderNav();
  updateSpeciesCounter();

  // 4. Delegated Click Listener
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-cat],[data-sub],[data-open],[data-quick],[data-tab],[data-sort]');
    if (!target) return;

    if (target.dataset.cat) {
      e.preventDefault();
      state.searchQuery = '';
      renderCategory(target.dataset.cat);
    } else if (target.dataset.sub) {
      filterBySubcategory(target.dataset.sub);
    } else if (target.dataset.open) {
      openModal(Number(target.dataset.open));
    } else if (target.dataset.quick) {
      closeModal();
      state.searchQuery = '';
      renderCategory(target.dataset.quick);
    } else if (target.dataset.tab) {
      state.activeTab = target.dataset.tab;
      renderDetail();
    } else if (target.dataset.sort) {
      state.sort = target.dataset.sort;
      document.querySelectorAll('.sort__btn').forEach((btn) => {
        btn.classList.toggle('is-active', btn === target);
      });
      renderGrid();
    }
  });

  // 5. Keyboard Navigation (Escape key closes modal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('overlay').hidden) {
      closeModal();
    }
  });

  // 6. Back Button in Detail Modal
  $('backBtn').addEventListener('click', closeModal);

  // 7. Live Search Inputs Binding
  document.querySelectorAll('.js-search').forEach((input) => {
    input.addEventListener('input', (e) => handleSearch(e.target.value));
  });
};

/* Start App when DOM is ready */
document.addEventListener('DOMContentLoaded', initApp);
