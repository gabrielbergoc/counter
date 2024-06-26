import "./navbar.scss";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return <div className="navbar">{children}</div>;
}
