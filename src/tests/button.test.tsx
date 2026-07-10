import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  test("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  test("shows loading spinner when isLoading is true", () => {
    const { container } = render(<Button isLoading>Submit</Button>);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
