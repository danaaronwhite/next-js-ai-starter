import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field, FieldError, FieldLabel } from "@/components/field";
import { Input } from "@/components/ui/input";

describe("Field composition", () => {
  it("associates label with input and shows error", () => {
    render(
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" aria-invalid />
        <FieldError>Invalid email</FieldError>
      </Field>,
    );

    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid");
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });
});
