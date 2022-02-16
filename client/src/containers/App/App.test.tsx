import { MockedProvider } from "@apollo/client/testing";
import { render, screen, arrMockResponses } from "../../testUtils";
import App from "./App";

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
    const pageBackgound = screen.getByTestId("page-background");
    expect(pageBackgound).toBeInTheDocument();
  });
  it("should render navigation container", () => {
    renderApp();
    const navigation = screen.getByTestId("nav-container");
    expect(navigation).toBeInTheDocument();
  });
  it("should render book list as home page", () => {
    renderApp();
    const homepage = screen.getByTestId("book-list-page");
    expect(homepage).toBeInTheDocument();
  });
});
