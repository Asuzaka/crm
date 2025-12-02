import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Pagination } from "./pagination";
import { vi } from "vitest";

describe("Pagination component", () => {
  const setup = (props = {}) => {
    const setPage = vi.fn();
    render(<Pagination totalPages={5} totalItems={100} limit={20} page={2} setPage={setPage} {...props} />);
    return { setPage };
  };

  it("renders correct page info and controls", () => {
    setup();

    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getAllByRole("button")[1]).toBeInTheDocument();
    expect(screen.getByLabelText("Go to page:")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    setup({ page: 1 });
    const prevBtn = screen.getAllByRole("button")[0];
    expect(prevBtn).toBeDisabled();
  });

  it("disables next button on last page", () => {
    setup({ page: 5 });
    const nextBtn = screen.getAllByRole("button")[1];
    expect(nextBtn).toBeDisabled();
  });

  it("calls setPage with previous page when clicking Prev", async () => {
    const { setPage } = setup({ page: 3 });
    const user = userEvent.setup();

    const prevBtn = screen.getAllByRole("button")[0];
    await user.click(prevBtn);

    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
    const fn = setPage.mock.calls[0][0];
    expect(fn(3)).toBe(2);
  });

  it("calls setPage with next page when clicking Next", async () => {
    const { setPage } = setup({ page: 2 });
    const user = userEvent.setup();

    const nextBtn = screen.getAllByRole("button")[1];
    await user.click(nextBtn);

    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
    const fn = setPage.mock.calls[0][0];
    expect(fn(2)).toBe(3);
  });

  it("calls setPage when entering valid custom page", async () => {
    const { setPage } = setup({ page: 2 });
    const user = userEvent.setup();

    const input = screen.getByRole("spinbutton");
    await user.type(input, "4");

    const goButton = screen.getByRole("button", { name: /Go/i });
    await user.click(goButton);

    expect(setPage).toHaveBeenCalledWith(4);
  });

  it("does not call setPage when entering invalid page", async () => {
    const { setPage } = setup({ page: 2 });
    const user = userEvent.setup();

    const input = screen.getByRole("spinbutton");
    await user.type(input, "0");
    await user.click(screen.getByRole("button", { name: /Go/i }));

    expect(setPage).not.toHaveBeenCalled();
  });

  it("does not call setPage when entering same page", async () => {
    const { setPage } = setup({ page: 3 });
    const user = userEvent.setup();

    const input = screen.getByRole("spinbutton");
    await user.type(input, "3");
    await user.click(screen.getByRole("button", { name: /Go/i }));

    expect(setPage).not.toHaveBeenCalled();
  });

  it("shows 'Showing 0 to 0 of 0 results' when totalItems = 0", () => {
    setup({ totalItems: 0, totalPages: 0 });
    const paragraph = screen.getByText(/showing/i).closest("p");
    expect(paragraph).toHaveTextContent("Showing 0 to 0 of 0 results");
  });

  it("hides input when totalPages = 0", () => {
    setup({ totalPages: 0 });
    expect(screen.queryByLabelText("Go to page:")).not.toBeInTheDocument();
  });
});
