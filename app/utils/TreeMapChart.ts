import { companyData, xyDataType } from '@/types/type';

export class TreeMapChartData {
  private data: companyData[];
  private xyData: xyDataType[];
  private colors: string[];
  private companyIds: string[];

  constructor(data: companyData[]) {
    this.data = data;
    this.xyData = this.getXYData();
    this.colors = this.getColors();
    this.companyIds = this.getCompanyIds();
  }

  private getXYData() {
    const xyData: xyDataType[] = [];

    for (const { COMNAME, MARKETCAP } of this.data) {
      xyData.push({ x: COMNAME, y: MARKETCAP });
    }
    return xyData;
  }

  private getColors() {
    const yieldValues = this.data.map(obj => obj.YIELD);
    const yieldData = yieldValues.map(x => +(x * 100).toFixed(2));
    const colorData = yieldData.map(x => Math.floor(x));
    const MIN_INDEX = -3;
    const MAX_INDEX = 3;
    const colors = ['#991f29', '#f23645', '#f77c80', '#c1c4cd', '#42bd7f', '#089950', '#056636'];

    const getColorIndex = (value: number) => {
      if (value < MIN_INDEX) return 0;
      if (value > MAX_INDEX) return colors.length - 1;
      const index = Math.floor(((value - MIN_INDEX) / (MAX_INDEX - MIN_INDEX)) * colors.length);
      return index;
    };

    const convertedHexColors = colorData.map(getColorIndex).map(x => colors[x]);
    return convertedHexColors;
  }

  private getCompanyIds() {
    return this.data.map(obj => obj.SECURITYMASTERX_ID);
  }

  public getData() {
    return { xyData: this.xyData, colors: this.colors, companyIds: this.companyIds };
  }
}
