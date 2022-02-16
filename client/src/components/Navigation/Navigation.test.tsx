import { MockedProvider } from "@apollo/client/testing";
import { render, screen, arrMockResponses } from "../../testUtils";
import Navigation from "./Navigation";

const renderNav = () =>
  render(
    <MockedProvider mocks={arrMockResponses}>
      <Navigation />
    </MockedProvider>
  );

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
    renderNav();
    const navigationDesktop = screen.getByTestId("navigation-desktop");
    expect(navigationDesktop).toBeInTheDocument();
  });
  it("should NOT render mobile navbar", () => {
    renderNav();
    const navigationMobile = screen.queryByTestId("navigation-mobile");
    expect(navigationMobile).not.toBeInTheDocument();
  });
});
