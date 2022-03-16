import { MockedProvider } from "@apollo/client/testing";
import { render, screen, arrMockResponses } from "../../testUtils";
import App from "./App";
import { OBJ_TEST_IDS } from "../../constants";

const renderApp = () =>
  render(
    <MockedProvider mocks={arrMockResponses}>
      <App />
    </MockedProvider>
  );

describe("App", () => {
  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore();
  });

  it("should render App", () => {
    renderApp();
  });
  it("should render PageBackgound", () => {
    renderApp();
    const pageBackgound = screen.getByTestId(OBJ_TEST_IDS.pageBackground);
    expect(pageBackgound).toBeInTheDocument();
  });
  it("should render navigation container", () => {
    renderApp();
    const navigation = screen.getByTestId(OBJ_TEST_IDS.navigationContainer);
    expect(navigation).toBeInTheDocument();
  });
  it("should render book list as home page", () => {
    renderApp();
    const homepage = screen.getByTestId(OBJ_TEST_IDS.bookListPage);
    expect(homepage).toBeInTheDocument();
  });
});
