import { BUTTON_BASE, BUTTON_SIZES, BUTTON_VARIANTS } from "../constants/classes";
import { render, screen } from "@testing-library/react";
import { Button } from "./primary";

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button>click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent(/click/i);
  });

  it("applies correct variant and size classes", () => {
    render(
      <Button variant="destructive" size="lg">
        text
      </Button>
    );

    const button = screen.getByRole("button", { name: /text/i });

    expect(button).toHaveClass(BUTTON_VARIANTS.destructive);
    expect(button).toHaveClass(BUTTON_SIZES.lg);
    expect(button).toHaveClass(BUTTON_BASE);
  });

  it("applies w-full on full", () => {
    render(<Button full>text</Button>);

    expect(screen.getByRole("button", { name: /text/i })).toHaveClass(/w-full/i);
  });

  it("renders icon when provded", () => {
    render(<Button icon={<span data-testid="icon">*</span>}>text</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(<Button loading>text</Button>);

    expect(screen.getByRole("button", { name: /text/i })).toBeDisabled();
  });

  it("shows loading text instead of child while loading", () => {
    render(
      <Button loading loadingText="loading">
        text
      </Button>
    );

    expect(screen.getByRole("button")).toHaveTextContent(/loading/i);
    expect(screen.getByRole("button")).not.toHaveTextContent(/text/i);
  });

  it("shows children text if no loading text is provided", () => {
    render(<Button loading>text</Button>);

    expect(screen.getByRole("button")).toHaveTextContent(/text/i);
  });

  it("disables button while disabled prop is true", () => {
    render(<Button disabled>text</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
