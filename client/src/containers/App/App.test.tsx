import { render, screen } from "../../testUtils";
import App from "./App";

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
    render(<App />);
  });
  it("should render PageBackgound", () => {
    render(<App />);
    const pageBackgound = screen.getByTestId("page-background");
    expect(pageBackgound).toBeInTheDocument();
  });
  it("should render navigation container", () => {
    render(<App />);
    const navigation = screen.getByTestId("nav-container");
    expect(navigation).toBeInTheDocument();
  });
  it("should render book list as home page", () => {
    render(<App />);
    const homepage = screen.getByTestId("book-list-page");
    expect(homepage).toBeInTheDocument();
  });
});
