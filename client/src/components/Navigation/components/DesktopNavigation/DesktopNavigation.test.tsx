import { render, screen } from "../../../../testUtils";
import DesktopNavigation from "./DesktopNavigation";

describe("DesktopNavigation", () => {
  const mockProps = {
    bAdmin: true,
    bLoggedIn: true,
    bLightTheme: true,
    funcModalOpen: jest.fn(),
    funcToggleTheme: jest.fn(),
    handleLogout: jest.fn(),
  };
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
    render(<DesktopNavigation {...mockProps} />);
  });
  it("should render Home and Admin navlinks if admin role", () => {
    render(<DesktopNavigation {...mockProps} />);
    const linkHome = screen.getByText("Home");
    const linkAdmin = screen.getByText("Admin");
    expect(linkHome).toBeInTheDocument();
    expect(linkAdmin).toBeInTheDocument();
  });
  it("should NOT render admin navlink if NOT an admin role", () => {
    render(<DesktopNavigation {...mockProps} bAdmin={false} />);
    const linkHome = screen.getByText("Home");
    const linkAdmin = screen.queryByText("Admin");
    expect(linkHome).toBeInTheDocument();
    expect(linkAdmin).not.toBeInTheDocument();
  });
  it("should render authentication button", () => {
    render(<DesktopNavigation {...mockProps} />);
    const buttonAuth = screen.getByTestId("auth-link");
    expect(buttonAuth).toBeInTheDocument();
  });
  it("should render link to github source code", () => {
    render(<DesktopNavigation {...mockProps} />);
    const linkGithub = screen.getByTestId("link-github");
    expect(linkGithub).toBeInTheDocument();
  });
  it("should render Theme switch", () => {
    render(<DesktopNavigation {...mockProps} />);
    const switchTheme = screen.getByTestId("switch-theme");
    expect(switchTheme).toBeInTheDocument();
  });
});
