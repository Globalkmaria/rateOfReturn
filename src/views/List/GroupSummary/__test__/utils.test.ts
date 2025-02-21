import { calculateGroupSummary } from '../utils';
import { SUMMARY_MINUS_RESULT_DATA, SUMMARY_PLUS_RESULT_DATA } from './mock';

describe('Group summary utils', () => {
  test('calculateGroupSummary - should calculate correct main summary for given data', () => {
    expect(
      calculateGroupSummary({
        groupData: null,
        stocksData: SUMMARY_PLUS_RESULT_DATA.stockData,
      }),
    ).toEqual(SUMMARY_PLUS_RESULT_DATA.mainSummary);

    expect(
      calculateGroupSummary({
        groupData: null,
        stocksData: SUMMARY_MINUS_RESULT_DATA.stockData,
      }),
    ).toEqual(SUMMARY_MINUS_RESULT_DATA.mainSummary);
  });

  test('calculateGroupSummary - should calculate correct group summary for given data', () => {
    expect(
      calculateGroupSummary({
        groupData: SUMMARY_PLUS_RESULT_DATA.groupData,
        stocksData: SUMMARY_PLUS_RESULT_DATA.stockData,
      }),
    ).toEqual(SUMMARY_PLUS_RESULT_DATA.groupSummary);

    expect(
      calculateGroupSummary({
        groupData: SUMMARY_MINUS_RESULT_DATA.groupData,
        stocksData: SUMMARY_MINUS_RESULT_DATA.stockData,
      }),
    ).toEqual(SUMMARY_MINUS_RESULT_DATA.groupSummary);
  });
});
