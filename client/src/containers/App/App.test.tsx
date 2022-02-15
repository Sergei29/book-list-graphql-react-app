import { render, screen } from "../../testUtils";
import { MockedProvider } from "@apollo/client/testing";
import { GET_CURRENT_THEME } from "../../graphql/queries";
import { MuiSelectedTheme } from "../../types/types";
import App from "./App";

const mocks = [
  {
    request: {
      query: GET_CURRENT_THEME,
    },
    result: {
      data: {
        strCurrentTheme: MuiSelectedTheme.LIGHT,
      },
    },
  },
];

const AppTest = () => (
  <MockedProvider mocks={mocks}>
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
    render(<AppTest />);
  });
  it("should render PageBackgound", () => {
    render(<AppTest />);
    const pageBackgound = screen.getByTestId("page-background");
    expect(pageBackgound).toBeInTheDocument();
  });
  it("should render navigation container", () => {
    render(<AppTest />);
    const navigation = screen.getByTestId("nav-container");
    expect(navigation).toBeInTheDocument();
  });
  it("should render book list as home page", () => {
    render(<AppTest />);
    const homepage = screen.getByTestId("book-list-page");
    expect(homepage).toBeInTheDocument();
  });
});
