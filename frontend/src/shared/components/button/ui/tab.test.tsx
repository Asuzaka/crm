import { TAB_ACTIVE, TAB_BASE, TAB_INACTIVE } from "../constants/classes";
import { render, screen } from "@testing-library/react";
import { TabButton } from "./tab";
import userEvent from "@testing-library/user-event";

describe("Tab Button component", () => {
  it("render children correctly", () => {
    render(<TabButton active={false}>tab</TabButton>);

    expect(screen.getByRole("button")).toHaveTextContent(/tab/i);
  });

  it("click is called while clicked", async () => {
    const handleClick = vi.fn();
    render(
      <TabButton active={false} onClick={handleClick}>
        tab
      </TabButton>
    );

    const button = screen.getByRole("button");

    const user = userEvent.setup();

    await user.click(button);

    expect(handleClick).toBeCalledTimes(1);
  });

  it("applies right classes on active", () => {
    render(<TabButton active={true}>tab</TabButton>);

    expect(screen.getByRole("button", { name: /tab/i })).toHaveClass(TAB_ACTIVE);
    expect(screen.getByRole("button", { name: /tab/i })).toHaveClass(TAB_BASE);
  });

  it("applies right classes on inactive", () => {
    render(<TabButton active={false}>tab</TabButton>);

    expect(screen.getByRole("button", { name: /tab/i })).toHaveClass(TAB_INACTIVE);
    expect(screen.getByRole("button", { name: /tab/i })).toHaveClass(TAB_BASE);
  });

  it("renders icon when provided", () => {
    render(
      <TabButton active={false} icon={<span data-testid="icon">*</span>}>
        tab
      </TabButton>
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
