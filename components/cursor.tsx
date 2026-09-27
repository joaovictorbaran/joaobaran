type CursorProps = {
  className?: string;
};

export function Cursor({ className = "" }: CursorProps) {
  const classes = ["jb-cursor", className].filter(Boolean).join(" ");

  return <span className={classes} aria-hidden="true" />;
}
