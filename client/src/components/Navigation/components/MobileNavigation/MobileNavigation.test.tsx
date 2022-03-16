import { MockedProvider } from "@apollo/client/testing";
import {
  render,
  screen,
  fireEvent,
  arrMockResponses,
} from "../../../../testUtils";
import MobileNavigation, { Props } from "./MobileNavigation";
import { OBJ_TEST_IDS } from "../../../../constants";

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
      <MobileNavigation {...mockProps} {...props} />
    </MockedProvider>
  );

const renderMenuOpen = (props: Partial<Props> = {}) => {
  renderMenu(props);
  const menuToggle = screen.getByTestId(OBJ_TEST_IDS.navigationMobileToggle);
  fireEvent.click(menuToggle);
};

describe("MobileNavigation", () => {
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
  it("should render mobile menu toggle button", () => {
    renderMenu();
    const menuToggle = screen.getByTestId(OBJ_TEST_IDS.navigationMobileToggle);
    expect(menuToggle).toBeInTheDocument();
  });
  it("should render Home and Admin navlinks if admin role", async () => {
    renderMenuOpen();
    const linkHome = await screen.findByText(/Home/);
    const linkAdmin = await screen.findByText(/Admin/);
    expect(linkHome).toBeInTheDocument();
    expect(linkAdmin).toBeInTheDocument();
  });
  it("should NOT render admin navlink if NOT an admin role", async () => {
    renderMenuOpen({ bAdmin: false });
    const linkHome = await screen.findByText(/Home/);
    const linkAdmin = screen.queryByText(/Admin/);
    expect(linkHome).toBeInTheDocument();
    expect(linkAdmin).not.toBeInTheDocument();
  });
  it("should render authentication button", async () => {
    renderMenuOpen();
    const buttonAuth = await screen.findByTestId(OBJ_TEST_IDS.authLink);
    expect(buttonAuth).toBeInTheDocument();
  });
  it("should render link to github source code", async () => {
    renderMenuOpen();
    const linkGithub = await screen.findByTestId(OBJ_TEST_IDS.gitHubLink);
    expect(linkGithub).toBeInTheDocument();
  });
  it("should render Theme switch", async () => {
    renderMenuOpen();
    const switchTheme = await screen.findByTestId(
      OBJ_TEST_IDS.themeSwitchMobile
    );
    expect(switchTheme).toBeInTheDocument();
  });
});
