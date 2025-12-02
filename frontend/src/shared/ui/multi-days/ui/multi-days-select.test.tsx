import { render, screen } from "@testing-library/react";
import { MultiDaySelector } from "./multi-days-select";
import { days } from "../model/constants/days";
import userEvent from "@testing-library/user-event";

describe("multi-days-select component", () => {
  it("render all days", () => {
    render(<MultiDaySelector value={[]} onChange={() => {}} />);

    days.forEach((day: string) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("calls onChange with added day when inactive day is clicked", async () => {
    const handleChange = vi.fn();
    render(<MultiDaySelector value={[]} onChange={handleChange} />);

    const user = userEvent.setup();

    const mondayButton = screen.getByText(days[0]);

    await user.click(mondayButton);

    expect(handleChange).toHaveBeenCalledWith([days[0]]);
  });

  it("calls onChange with removed day when active day is clicked", async () => {
    const handleChange = vi.fn();
    render(<MultiDaySelector value={[days[0], days[1]]} onChange={handleChange} />);

    const user = userEvent.setup();

    const mondayButton = screen.getByText(days[0]);
    await user.click(mondayButton);

    expect(handleChange).toHaveBeenCalledWith([days[1]]);
  });

  it("applies correct active/inactive classes", () => {
    render(<MultiDaySelector value={[days[0]]} onChange={() => {}} />);

    const activeButton = screen.getByText(days[0]);
    const inactiveButton = screen.getByText(days[1]);

    expect(activeButton.className).toMatch(/bg-blue-600/);
    expect(inactiveButton.className).toMatch(/bg-gray-100/);
  });
});
