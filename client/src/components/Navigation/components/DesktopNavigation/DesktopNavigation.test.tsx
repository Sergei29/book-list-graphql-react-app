import { MockedProvider } from "@apollo/client/testing";
import { render, screen, arrMockResponses } from "../../../../testUtils";
import DesktopNavigation, { Props } from "./DesktopNavigation";

const mockProps = {
  bAdmin: true,
  bLoggedIn: true,
  bLightTheme: true,
  funcModalOpen: jest.fn(),
  funcToggleTheme: jest.fn(),
  handleLogout: jest.fn(),
};

const renderMenu = (props: Partial<Props> = {}) =>
  render(
    <MockedProvider mocks={arrMockResponses}>
      <DesktopNavigation {...mockProps} {...props} />
    </MockedProvider>
  );

describe("DesktopNavigation", () => {
  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });
  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore();
  });

  it("should render", () => {
    renderMenu();
  });
  it("should render Home and Admin navlinks if admin role", () => {
    renderMenu();
    const linkHome = screen.getByText("Home");
    const linkAdmin = screen.getByText("Admin");
    expect(linkHome).toBeInTheDocument();
    expect(linkAdmin).toBeInTheDocument();
  });
  it("should NOT render admin navlink if NOT an admin role", () => {
    renderMenu({ bAdmin: false });
    const linkHome = screen.getByText("Home");
    const linkAdmin = screen.queryByText("Admin");
    expect(linkHome).toBeInTheDocument();
    expect(linkAdmin).not.toBeInTheDocument();
  });
  it("should render authentication button", () => {
    renderMenu();
    const buttonAuth = screen.getByTestId("auth-link");
    expect(buttonAuth).toBeInTheDocument();
  });
  it("should render link to github source code", () => {
    renderMenu();
    const linkGithub = screen.getByTestId("link-github");
    expect(linkGithub).toBeInTheDocument();
  });
  it("should render Theme switch", () => {
    renderMenu();
    const switchTheme = screen.getByTestId("switch-theme");
    expect(switchTheme).toBeInTheDocument();
  });
});
