import { render, screen, waitFor } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { MultiFieldSelect } from "./select";
import userEvent from "@testing-library/user-event";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

const mockFetchOptions = vi.fn();

function Wrapper() {
  const { control } = useForm({
    defaultValues: { tags: [] },
  });

  return <MultiFieldSelect control={control} name="tags" label="Tags" fetchOptions={mockFetchOptions} />;
}

describe("MultiFieldSelect", () => {
  it("renders search input and 'None selected' by default", () => {
    (useQuery as unknown as Mock).mockReturnValue({
      data: [
        { _id: "1", name: "JavaScript" },
        { _id: "2", name: "Go" },
      ],
      isLoading: false,
    });

    render(<Wrapper />);
    expect(screen.getByPlaceholderText(/tags.../i)).toBeInTheDocument();
    expect(screen.getByText("None selected")).toBeInTheDocument();
  });

  it("renders available options", () => {
    (useQuery as unknown as Mock).mockReturnValue({
      data: [
        { _id: "1", name: "JavaScript" },
        { _id: "2", name: "Go" },
      ],
      isLoading: false,
    });

    render(<Wrapper />);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("adds and removes items properly", async () => {
    (useQuery as unknown as Mock).mockReturnValue({
      data: [
        { _id: "1", name: "JavaScript" },
        { _id: "2", name: "Go" },
      ],
      isLoading: false,
    });

    render(<Wrapper />);

    const user = userEvent.setup();

    const addBtn = screen.getAllByText(/add/i)[0];
    await user.click(addBtn);

    await waitFor(() => expect(screen.getByText("JavaScript")).toBeInTheDocument());

    const removeBtn = screen.getByRole("button", { name: "" });
    await user.click(removeBtn);

    await waitFor(() => expect(screen.getByText("None selected")).toBeInTheDocument());
  });

  it("shows 'No results' when no options available", async () => {
    (useQuery as unknown as Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<Wrapper />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/tags.../i);

    await user.type(input, "anewsets");

    await waitFor(() => {
      expect(screen.getByText("No results")).toBeInTheDocument();
    });
  });
});
