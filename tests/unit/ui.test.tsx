import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";

describe("ui primitives", () => {
  it("renders a badge", () => {
    render(<Badge>TypeScript</Badge>);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders a heading level", () => {
    render(<Heading as="h3">Case study</Heading>);
    expect(screen.getByRole("heading", { level: 3, name: "Case study" })).toBeInTheDocument();
  });
});
