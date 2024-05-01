import "./header.scss";

export default function Header({
    children,
} : {
    children?: React.ReactNode;
}) {
  return (
    <h1>{children}</h1>
  );
}