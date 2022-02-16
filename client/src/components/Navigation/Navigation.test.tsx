import { render, screen } from "../../testUtils";
import Navigation from "./Navigation";

describe("Navigation", () => {
  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });
  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore();
  });
  it("should render desktop navbar", () => {
    render(<Navigation />);
    const navigationDesktop = screen.getByTestId("navigation-desktop");
    expect(navigationDesktop).toBeInTheDocument();
  });
  it("should NOT render mobile navbar", () => {
    render(<Navigation />);
    const navigationMobile = screen.queryByTestId("navigation-mobile");
    expect(navigationMobile).not.toBeInTheDocument();
  });
});
