import React from "react";
import DestinationButton from "./DestinationButton";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/";

describe("DestinationButton", () => {
  it("should display the name of a destination", () => {
    const { getByText } = render(
      <MemoryRouter>
        <DestinationButton
          setSelectedDestination={""}
          key={3}
          destination={{
            destination: "FoCo",
            destinationFullName: "Fort Collins",
            id: 3,
          }}
        />
      </MemoryRouter>
    );

    const name = getByText("FoCo");
    expect(name).toBeInTheDocument();
  });

  it("should update the pathname when the destination button is clicked", () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <DestinationButton
          setSelectedDestination={""}
          key={3}
          destination={{
            destination: "FoCo",
            destinationFullName: "Fort Collins",
            id: 3,
          }}
        />
      </Router>
    );

    const destinationLink = getByRole("link", { name: "FoCo" });
    fireEvent.click(destinationLink);
    expect(history.location.pathname).toBe("/destinations/FoCo");
  });

  it("should be called with the proper arguments when button is clicked on", () => {
    const history = createMemoryHistory();
    const mockSetSelectedDestination = jest.fn();
    const { getByRole } = render(
      <Router history={history}>
        <DestinationButton
          setSelectedDestination={mockSetSelectedDestination}
          key={3}
          destination={{
            destination: "FoCo",
            destinationFullName: "Fort Collins",
            id: 3,
          }}
        />
      </Router>
    );

    const destinationButton = getByRole("button", { name: "FoCo" });
    fireEvent.click(destinationButton);
    expect(mockSetSelectedDestination).toHaveBeenCalledWith({
      destination: "FoCo",
      destinationFullName: "Fort Collins",
      id: 3,
    });
  });
});
