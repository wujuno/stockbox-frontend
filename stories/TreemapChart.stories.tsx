import { ComponentStory, ComponentMeta } from '@storybook/react';
import TreeMapChart from '@/components/chart/TreeMapChart';

const json =
  '{"SECURITYMASTERX_ID":{"0":"AAPL","1":"MSFT","2":"AMZN","3":"NVDA","4":"GOOG","5":"88160R10","6":"30303M10","7":"UNH","8":"XOM","9":"JNJ","10":"CMB","11":"WMT","12":"92826C83","13":"PG","14":"57636Q10","15":"LLY","16":"HD","17":"CHV","18":"MRK","19":"00287Y10","20":"BRK.A","21":"KO","22":"Y0486S10","23":"PEP","24":"BAC","25":"PFE","26":"ORCL","27":"COST","28":"TMO","29":"CSCO","30":"MCD","31":"79466L30","32":"DHR","33":"MPCS","34":"DIS","35":"ABT","36":"TXN","37":"VZ","38":"ADBE","39":"CMCS.A","40":"FPL","41":"71817210","42":"WFC","43":"NKE","44":"AMD","45":"MWD","46":"BMY","47":"UTX","48":"NTFZ","49":"UPS","50":"SBC","51":"QCOM","52":"HON","53":"AMGN","54":"LMT","55":"LOW","56":"AXP","57":"BA","58":"INTC","59":"UNP","60":"P","61":"P","62":"P","63":"P","64":"DE","65":"SBUX","66":"INTU","67":"CAT","68":"IBM","69":"03674B10","70":"MHP","71":"SCH","72":"GS","73":"SYK","74":"AMAT","75":"GILD","76":"GE","77":"CVS","78":"BLK","79":"ADI","80":"PCLN","81":"KFT","82":"AUD","83":"C","84":"TJX","85":"81762P10","86":"MO","87":"PYPLV","88":"ISRG","89":"REGN","90":"CI","91":"PGR","92":"MMC","93":"98978V10","94":"VRTX","95":"DUK","96":"SO","97":"TGT","98":"ITW","99":"BSX"},"COMNAME":{"0":"Apple Inc","1":"Microsoft Corp","2":"Amazon.com Inc","3":"NVIDIA Corp","4":"Alphabet Inc","5":"Tesla Inc","6":"Meta Platforms Inc","7":"UnitedHealth Group Inc","8":"Exxon Mobil Corp","9":"Johnson & Johnson","10":"JPMorgan Chase & Co","11":"Walmart Inc","12":"Visa Inc","13":"Procter & Gamble Co","14":"Mastercard Inc","15":"Eli Lilly and Co","16":"Home Depot Inc","17":"Chevron Corp","18":"Merck & Co Inc","19":"Abbvie Inc","20":"Berkshire Hathaway Inc","21":"Coca-Cola Co","22":"Broadcom Inc","23":"PepsiCo Inc","24":"Bank of America Corp","25":"Pfizer Inc","26":"Oracle Corp","27":"Costco Wholesale Corp","28":"Thermo Fisher Scientific Inc","29":"Cisco Systems Inc","30":"McDonald\'s Corp","31":"Salesforce Inc","32":"Danaher Corp","33":"T-Mobile US Inc","34":"Walt Disney Co","35":"Abbott Laboratories","36":"Texas Instruments Inc","37":"Verizon Communications Inc","38":"Adobe Inc","39":"Comcast Corp","40":"Nextera Energy Inc","41":"Philip Morris International Inc","42":"Wells Fargo & Co","43":"Nike Inc","44":"Advanced Micro Devices Inc","45":"Morgan Stanley","46":"Bristol-Myers Squibb Co","47":"Raytheon Technologies Corp","48":"Netflix Inc","49":"United Parcel Service Inc","50":"AT&T Inc","51":"Qualcomm Inc","52":"Honeywell International Inc","53":"Amgen Inc","54":"Lockheed Martin Corp","55":"Lowe\'s Companies Inc","56":"American Express Co","57":"Boeing Co","58":"Intel Corp","59":"Union Pacific Corp","60":"Conocophillips","61":"Conocophillips","62":"Conocophillips","63":"Conocophillips","64":"Deere & Co","65":"Starbucks Corp","66":"Intuit Inc","67":"Caterpillar Inc","68":"International Business Machines Corp","69":"Elevance Health Inc","70":"S&P Global Inc","71":"Charles Schwab Corp","72":"Goldman Sachs Group Inc","73":"Stryker Corp","74":"Applied Materials Inc","75":"Gilead Sciences Inc","76":"General Electric Co","77":"CVS Health Corp","78":"BlackRock Inc","79":"Analog Devices Inc","80":"Booking Holdings Inc","81":"Mondelez International Inc","82":"Automatic Data Processing Inc","83":"Citigroup Inc","84":"TJX Companies Inc","85":"ServiceNow Inc","86":"Altria Group Inc","87":"PayPal Holdings Inc","88":"Intuitive Surgical Inc","89":"Regeneron Pharmaceuticals Inc","90":"Cigna Group","91":"Progressive Corp","92":"Marsh & McLennan Companies Inc","93":"Zoetis Inc","94":"Vertex Pharmaceuticals Inc","95":"Duke Energy Corp","96":"Southern Co","97":"Target Corp","98":"Illinois Tool Works Inc","99":"Boston Scientific Corp"},"EXCHNAME":{"0":"NASDAQ(COMPOSITE)","1":"NASDAQ(COMPOSITE)","2":"NASDAQ(COMPOSITE)","3":"NASDAQ(COMPOSITE)","4":"NASDAQ(COMPOSITE)","5":"NASDAQ(COMPOSITE)","6":"NASDAQ(COMPOSITE)","7":"NEW YORK SE(COMPOSITE)","8":"NEW YORK SE(COMPOSITE)","9":"NEW YORK SE(COMPOSITE)","10":"NEW YORK SE(COMPOSITE)","11":"NEW YORK SE(COMPOSITE)","12":"NEW YORK SE(COMPOSITE)","13":"NEW YORK SE(COMPOSITE)","14":"NEW YORK SE(COMPOSITE)","15":"NEW YORK SE(COMPOSITE)","16":"NEW YORK SE(COMPOSITE)","17":"NEW YORK SE(COMPOSITE)","18":"NEW YORK SE(COMPOSITE)","19":"NEW YORK SE(COMPOSITE)","20":"NEW YORK SE(COMPOSITE)","21":"NEW YORK SE(COMPOSITE)","22":"NASDAQ(COMPOSITE)","23":"NASDAQ(COMPOSITE)","24":"NEW YORK SE(COMPOSITE)","25":"NEW YORK SE(COMPOSITE)","26":"NEW YORK SE(COMPOSITE)","27":"NASDAQ(COMPOSITE)","28":"NEW YORK SE(COMPOSITE)","29":"NASDAQ(COMPOSITE)","30":"NEW YORK SE(COMPOSITE)","31":"NEW YORK SE(COMPOSITE)","32":"NEW YORK SE(COMPOSITE)","33":"NASDAQ(COMPOSITE)","34":"NEW YORK SE(COMPOSITE)","35":"NEW YORK SE(COMPOSITE)","36":"NASDAQ(COMPOSITE)","37":"NEW YORK SE(COMPOSITE)","38":"NASDAQ(COMPOSITE)","39":"NASDAQ(COMPOSITE)","40":"NEW YORK SE(COMPOSITE)","41":"NEW YORK SE(COMPOSITE)","42":"NEW YORK SE(COMPOSITE)","43":"NEW YORK SE(COMPOSITE)","44":"NASDAQ(COMPOSITE)","45":"NEW YORK SE(COMPOSITE)","46":"NEW YORK SE(COMPOSITE)","47":"NEW YORK SE(COMPOSITE)","48":"NASDAQ(COMPOSITE)","49":"NEW YORK SE(COMPOSITE)","50":"NEW YORK SE(COMPOSITE)","51":"NASDAQ(COMPOSITE)","52":"NASDAQ(COMPOSITE)","53":"NASDAQ(COMPOSITE)","54":"NEW YORK SE(COMPOSITE)","55":"NEW YORK SE(COMPOSITE)","56":"NEW YORK SE(COMPOSITE)","57":"NEW YORK SE(COMPOSITE)","58":"NASDAQ(COMPOSITE)","59":"NEW YORK SE(COMPOSITE)","60":"NEW YORK SE(COMPOSITE)","61":"NEW YORK SE(COMPOSITE)","62":"NEW YORK SE(COMPOSITE)","63":"NEW YORK SE(COMPOSITE)","64":"NEW YORK SE(COMPOSITE)","65":"NASDAQ(COMPOSITE)","66":"NASDAQ(COMPOSITE)","67":"NEW YORK SE(COMPOSITE)","68":"NEW YORK SE(COMPOSITE)","69":"NEW YORK SE(COMPOSITE)","70":"NEW YORK SE(COMPOSITE)","71":"NEW YORK SE(COMPOSITE)","72":"NEW YORK SE(COMPOSITE)","73":"NEW YORK SE(COMPOSITE)","74":"NASDAQ(COMPOSITE)","75":"NASDAQ(COMPOSITE)","76":"NEW YORK SE(COMPOSITE)","77":"NEW YORK SE(COMPOSITE)","78":"NEW YORK SE(COMPOSITE)","79":"NASDAQ(COMPOSITE)","80":"NASDAQ(COMPOSITE)","81":"NASDAQ(COMPOSITE)","82":"NASDAQ(COMPOSITE)","83":"NEW YORK SE(COMPOSITE)","84":"NEW YORK SE(COMPOSITE)","85":"NEW YORK SE(COMPOSITE)","86":"NEW YORK SE(COMPOSITE)","87":"NASDAQ(COMPOSITE)","88":"NASDAQ(COMPOSITE)","89":"NASDAQ(COMPOSITE)","90":"NEW YORK SE(COMPOSITE)","91":"NEW YORK SE(COMPOSITE)","92":"NEW YORK SE(COMPOSITE)","93":"NEW YORK SE(COMPOSITE)","94":"NASDAQ(COMPOSITE)","95":"NEW YORK SE(COMPOSITE)","96":"NEW YORK SE(COMPOSITE)","97":"NEW YORK SE(COMPOSITE)","98":"NEW YORK SE(COMPOSITE)","99":"NEW YORK SE(COMPOSITE)"},"MARKETDATE":{"0":1678838400000,"1":1678838400000,"2":1678838400000,"3":1678838400000,"4":1678838400000,"5":1678838400000,"6":1678838400000,"7":1678838400000,"8":1678838400000,"9":1678838400000,"10":1678838400000,"11":1678838400000,"12":1678838400000,"13":1678838400000,"14":1678838400000,"15":1678838400000,"16":1678838400000,"17":1678838400000,"18":1678838400000,"19":1678838400000,"20":1678838400000,"21":1678838400000,"22":1678838400000,"23":1678838400000,"24":1678838400000,"25":1678838400000,"26":1678838400000,"27":1678838400000,"28":1678838400000,"29":1678838400000,"30":1678838400000,"31":1678838400000,"32":1678838400000,"33":1678838400000,"34":1678838400000,"35":1678838400000,"36":1678838400000,"37":1678838400000,"38":1678838400000,"39":1678838400000,"40":1678838400000,"41":1678838400000,"42":1678838400000,"43":1678838400000,"44":1678838400000,"45":1678838400000,"46":1678838400000,"47":1678838400000,"48":1678838400000,"49":1678838400000,"50":1678838400000,"51":1678838400000,"52":1678838400000,"53":1678838400000,"54":1678838400000,"55":1678838400000,"56":1678838400000,"57":1678838400000,"58":1678838400000,"59":1678838400000,"60":1678838400000,"61":1678838400000,"62":1678838400000,"63":1678838400000,"64":1678838400000,"65":1678838400000,"66":1678838400000,"67":1678838400000,"68":1678838400000,"69":1678838400000,"70":1678838400000,"71":1678838400000,"72":1678838400000,"73":1678838400000,"74":1678838400000,"75":1678838400000,"76":1678838400000,"77":1678838400000,"78":1678838400000,"79":1678838400000,"80":1678838400000,"81":1678838400000,"82":1678838400000,"83":1678838400000,"84":1678838400000,"85":1678838400000,"86":1678838400000,"87":1678838400000,"88":1678838400000,"89":1678838400000,"90":1678838400000,"91":1678838400000,"92":1678838400000,"93":1678838400000,"94":1678838400000,"95":1678838400000,"96":1678838400000,"97":1678838400000,"98":1678838400000,"99":1678838400000},"BEFORE_PRICE":{"0":152.59,"1":260.79004,"2":94.880005,"3":240.63001,"4":93.970002,"5":183.26,"6":194.02001,"7":464.58008,"8":106.94001,"9":153.92,"10":134.62,"11":138.10001,"12":218.66001,"13":139.85001,"14":352.82007,"15":327.07007,"16":285.57007,"17":160.76,"18":106.97001,"19":153.85001,"20":461805.0,"21":60.029999,"22":632.45997,"23":173.53,"24":28.759995,"25":39.899994,"26":84.559998,"27":481.91993,"28":555.95997,"29":49.050004,"30":265.89991,"31":182.89,"32":244.85001,"33":143.01,"34":93.360001,"35":98.550004,"36":175.73,"37":36.880005,"38":333.33008,"39":35.279999,"40":74.550004,"41":97.350007,"42":40.169999,"43":119.0,"44":87.449997,"45":89.970002,"46":66.470002,"47":98.320008,"48":294.93995,"49":185.06,"50":18.440003,"51":116.55001,"52":192.97001,"53":230.58001,"54":478.87012,"55":196.83001,"56":163.91001,"57":207.28,"58":28.009995,"59":195.15,"60":101.36001,"61":101.36001,"62":101.36001,"63":101.36001,"64":402.44996,"65":99.460007,"66":408.30005,"67":225.67,"68":124.65,"69":458.58008,"70":332.72999,"71":56.679993,"72":322.14991,"73":275.68995,"74":120.34,"75":79.770005,"76":91.169999,"77":75.559998,"78":637.83008,"79":186.58001,"80":2475.75,"81":66.289994,"82":213.59,"83":47.399994,"84":74.759995,"85":424.54004,"86":46.740006,"87":73.240006,"88":235.28,"89":766.80005,"90":272.12989,"91":141.84,"92":157.26,"93":164.56,"94":295.25,"95":95.089997,"96":66.179993,"97":158.37,"98":234.14,"99":48.309998},"PRICE":{"0":152.99001,"1":265.43995,"2":96.199997,"3":242.28,"4":96.110001,"5":180.45,"6":197.75,"7":465.42994,"8":101.62,"9":154.35001,"10":128.26,"11":139.64,"12":216.37,"13":141.83001,"14":348.08008,"15":329.46998,"16":287.96998,"17":153.80001,"18":107.63001,"19":154.06,"20":448671.0,"21":60.429993,"22":626.04004,"23":176.63001,"24":28.490006,"25":40.279999,"26":82.979996,"27":485.65992,"28":542.69996,"29":49.059998,"30":266.34009,"31":182.91001,"32":242.11001,"33":144.42,"34":93.100007,"35":97.800004,"36":174.39,"37":37.059998,"38":333.61011,"39":35.89,"40":75.520005,"41":96.179993,"42":38.850007,"43":118.17,"44":89.679993,"45":85.39,"46":67.479996,"47":95.830002,"48":303.79004,"49":184.36001,"50":18.309998,"51":115.49001,"52":188.12,"53":234.9,"54":473.31006,"55":198.59,"56":159.81,"57":198.21001,"58":28.410004,"59":192.04,"60":95.240006,"61":95.240006,"62":95.240006,"63":95.240006,"64":390.47999,"65":99.339997,"66":406.32007,"67":217.26,"68":123.28,"69":456.47999,"70":333.97999,"71":59.550004,"72":312.18995,"73":273.03003,"74":118.48,"75":79.649994,"76":89.759995,"77":75.399994,"78":631.74,"79":182.93,"80":2415.73,"81":66.399994,"82":213.25,"83":44.820008,"84":74.160004,"85":422.26001,"86":46.869996,"87":73.910004,"88":234.18,"89":760.30005,"90":270.36011,"91":135.06,"92":154.08001,"93":163.57001,"94":294.27002,"95":96.830002,"96":67.649994,"97":159.13001,"98":228.55001,"99":47.970002},"YIELD":{"0":0.0026214693,"1":0.0178300904,"2":0.0139122252,"3":0.0068569585,"4":0.0227732144,"5":-0.0153334061,"6":0.0192247697,"7":0.0018293079,"8":-0.0497476108,"9":0.002793724,"10":-0.0472440945,"11":0.0111512664,"12":-0.0104729255,"13":0.0141580254,"14":-0.0134345815,"15":0.007337602,"16":0.0084039269,"17":-0.0432942896,"18":0.0061699536,"19":0.0013649008,"20":-0.0284405756,"21":0.0066632352,"22":-0.0101507294,"23":0.0178644038,"24":-0.0093876581,"25":0.0095239363,"26":-0.0186849815,"27":0.0077606045,"28":-0.023850656,"29":0.0002037513,"30":0.0016554349,"31":0.00010941,"32":-0.0111905244,"33":0.0098594504,"34":-0.0027848543,"35":-0.0076103498,"36":-0.0076253343,"37":0.0048805037,"38":0.0008400982,"39":0.0172902783,"40":0.0130114145,"41":-0.0120186329,"42":-0.0328601452,"43":-0.0069747899,"44":0.025500241,"45":-0.0509058786,"46":0.015194734,"47":-0.0253255268,"48":0.0300064132,"49":-0.003782503,"50":-0.0070501615,"51":-0.0090948083,"52":-0.025133491,"53":0.0187353188,"54":-0.0116107892,"55":0.0089416751,"56":-0.0250137865,"57":-0.0437571883,"58":0.0142809379,"59":-0.0159364591,"60":-0.0603788812,"61":-0.0603788812,"62":-0.0603788812,"63":-0.0603788812,"64":-0.0297427536,"65":-0.0012066156,"66":-0.0048493259,"67":-0.0372668055,"68":-0.0109907742,"69":-0.0045795491,"70":0.0037567999,"71":0.050635345,"72":-0.030917159,"73":-0.0096482298,"74":-0.0154562074,"75":-0.0015044627,"76":-0.0154656577,"77":-0.0021175755,"78":-0.0095481229,"79":-0.0195627066,"80":-0.0242431586,"81":0.0016593756,"82":-0.0015918348,"83":-0.0544300913,"84":-0.0080255623,"85":-0.0053705888,"86":0.0027811293,"87":0.0091479785,"88":-0.0046752805,"89":-0.0084767861,"90":-0.0065034385,"91":-0.0478003384,"92":-0.020221226,"93":-0.006015982,"94":-0.0033191533,"95":0.0182985073,"96":0.0222121661,"97":0.0047989518,"98":-0.0238745622,"99":-0.0070377978},"MARKETCAP":{"0":2420599811.0,"1":1975883004.0,"2":985786396.0,"3":598431832.0,"4":572431042.0,"5":570962047.0,"6":440144609.0,"7":434174718.0,"8":413693361.0,"9":401971705.0,"10":377514696.0,"11":376580973.0,"12":351591487.0,"13":334597553.0,"14":329187351.0,"15":313769760.0,"16":293494948.0,"17":293246615.0,"18":273228785.0,"19":272593911.0,"20":265090620.0,"21":261438597.0,"22":261010917.0,"23":243263836.0,"24":227899626.0,"25":226336317.0,"26":224029525.0,"27":215381937.0,"28":209172802.0,"29":200940960.0,"30":194826923.0,"31":182910010.0,"32":176395736.0,"33":176103275.0,"34":170075733.0,"35":169971211.0,"36":158231357.0,"37":155647627.0,"38":152726708.0,"39":150975321.0,"40":150095623.0,"41":149101395.0,"42":147391829.0,"43":147200455.0,"44":144509350.0,"45":143620938.0,"46":141625460.0,"47":140219317.0,"48":135291897.0,"49":133625108.0,"50":130513665.0,"51":128771472.0,"52":125690526.0,"53":125430999.0,"54":120466346.0,"55":119352590.0,"56":118929425.0,"57":118762871.0,"58":117532213.0,"59":117504083.0,"60":116076324.0,"61":116076324.0,"62":116076324.0,"63":116076324.0,"64":115707905.0,"65":114171553.0,"66":113991632.0,"67":112181210.0,"68":111827978.0,"69":108394715.0,"70":107541556.0,"71":106680792.0,"72":104715752.0,"73":103432293.0,"74":100129628.0,"75":99331902.0,"76":97774384.0,"77":96822109.0,"78":94910362.0,"79":92535594.0,"80":90948296.0,"81":90523568.0,"82":88360461.0,"83":87117230.0,"84":85692252.0,"85":85296522.0,"86":83689422.0,"87":83619779.0,"88":82023174.0,"89":81737904.0,"90":80313174.0,"91":79056020.0,"92":76203560.0,"93":75796144.0,"94":75654279.0,"95":74566863.0,"96":73664684.0,"97":73257727.0,"98":69723331.0,"99":68826445.0}}';

const parsed = JSON.parse(json);

export default {
  title: 'Chart/TreemapChart',
  component: TreeMapChart
} as ComponentMeta<typeof TreeMapChart>;

const Template: ComponentStory<typeof TreeMapChart> = args => <TreeMapChart {...args} />;

export const Treemap = Template.bind({});

Treemap.args = {
  data: parsed,
  height: 500,
  width: 1200
};
