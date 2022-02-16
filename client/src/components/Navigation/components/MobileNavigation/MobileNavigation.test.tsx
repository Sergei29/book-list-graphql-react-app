import { render, screen, fireEvent } from "../../../../testUtils";
import MobileNavigation from "./MobileNavigation";

describe("MobileNavigation", () => {
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
    render(<MobileNavigation {...mockProps} />);
  });
  it("should render mobile menu toggle button", () => {
    render(<MobileNavigation {...mockProps} />);
    const menuToggle = screen.getByTestId("mobile-menu-toggle-button");
    expect(menuToggle).toBeInTheDocument();
  });
  it("should render Home and Admin navlinks if admin role", async () => {
    render(<MobileNavigation {...mockProps} />);
    const menuToggle = screen.getByTestId("mobile-menu-toggle-button");
    fireEvent.click(menuToggle);
    const linkHome = await screen.findByText(/Home/);
    const linkAdmin = await screen.findByText(/Admin/);
    expect(linkHome).toBeInTheDocument();
    expect(linkAdmin).toBeInTheDocument();
  });
  it("should NOT render admin navlink if NOT an admin role", async () => {
    render(<MobileNavigation {...mockProps} bAdmin={false} />);
    const menuToggle = screen.getByTestId("mobile-menu-toggle-button");
    fireEvent.click(menuToggle);
    const linkHome = await screen.findByText(/Home/);
    const linkAdmin = screen.queryByText(/Admin/);
    expect(linkHome).toBeInTheDocument();
    expect(linkAdmin).not.toBeInTheDocument();
  });
  it("should render authentication button", async () => {
    render(<MobileNavigation {...mockProps} />);
    const menuToggle = screen.getByTestId("mobile-menu-toggle-button");
    fireEvent.click(menuToggle);
    const buttonAuth = await screen.findByTestId("auth-link");
    expect(buttonAuth).toBeInTheDocument();
  });
  it("should render link to github source code", async () => {
    render(<MobileNavigation {...mockProps} />);
    const menuToggle = screen.getByTestId("mobile-menu-toggle-button");
    fireEvent.click(menuToggle);
    const linkGithub = await screen.findByTestId("link-github");
    expect(linkGithub).toBeInTheDocument();
  });
  it("should render Theme switch", async () => {
    render(<MobileNavigation {...mockProps} />);
    const menuToggle = screen.getByTestId("mobile-menu-toggle-button");
    fireEvent.click(menuToggle);
    const switchTheme = await screen.findByTestId("switch-theme-mobile");
    expect(switchTheme).toBeInTheDocument();
  });
});
