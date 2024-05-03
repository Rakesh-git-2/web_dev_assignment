import { calculateRelativeDate } from "./relative-date";
import { expect } from "@open-wc/testing";

describe("calculateRelativeDate", () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize time part to midnight

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const thisWeek = new Date(today);
  thisWeek.setDate(today.getDate() - 3); // Example: 3 days ago within the same week

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7); // Exactly one week ago

  const thisMonth = new Date(today);
  thisMonth.setDate(1); // Start of this month

  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 15); // Middle of last month

  const thisYear = new Date(today.getFullYear(), 0, 15); // Middle of January this year

  const lastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  ); // Same day last year

  const longTimeAgo = new Date(
    today.getFullYear() - 2,
    today.getMonth(),
    today.getDate()
  ); // Two years ago

  it('should return "Today"', () => {
    expect(calculateRelativeDate(today.toISOString())).to.equal("Today");
  });

  it('should return "Yesterday"', () => {
    expect(calculateRelativeDate(yesterday.toISOString())).to.equal(
      "Yesterday"
    );
  });

  it('should return "This week"', () => {
    expect(calculateRelativeDate(thisWeek.toISOString())).to.equal("This week");
  });

  it('should return "Last week"', () => {
    expect(calculateRelativeDate(lastWeek.toISOString())).to.equal("Last week");
  });

  it('should return "This month"', () => {
    if (today.getDate() == 2) {
      expect(calculateRelativeDate(thisMonth.toISOString())).to.equal(
        "Yesterday"
      );
      return;
    }

    if (today.getDate() < 7) {
      expect(calculateRelativeDate(thisMonth.toISOString())).to.equal(
        "This week"
      );
      return;
    }

    expect(calculateRelativeDate(thisMonth.toISOString())).to.equal(
      "This month"
    );
  });

  it('should return "Last month"', () => {
    expect(calculateRelativeDate(lastMonth.toISOString())).to.equal(
      "Last month"
    );
  });

  it('should return "This year"', () => {
    expect(calculateRelativeDate(thisYear.toISOString())).to.equal("This year");
  });

  it('should return "Last year"', () => {
    expect(calculateRelativeDate(lastYear.toISOString())).to.equal("Last year");
  });

  it('should return "Long time ago"', () => {
    expect(calculateRelativeDate(longTimeAgo.toISOString())).to.equal(
      "Long time ago"
    );
  });
});
