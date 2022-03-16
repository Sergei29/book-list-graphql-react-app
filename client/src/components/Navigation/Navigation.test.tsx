import { MockedProvider } from "@apollo/client/testing";
import { render, screen, arrMockResponses } from "../../testUtils";
import Navigation from "./Navigation";
import { OBJ_TEST_IDS } from "../../constants";

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
    const navigationDesktop = screen.getByTestId(
      OBJ_TEST_IDS.navigationDesktop
    );
    expect(navigationDesktop).toBeInTheDocument();
  });
  it("should NOT render mobile navbar", () => {
    renderNav();
    const navigationMobile = screen.queryByTestId(
      OBJ_TEST_IDS.navigationMobile
    );
    expect(navigationMobile).not.toBeInTheDocument();
  });
});
