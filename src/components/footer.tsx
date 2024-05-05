export default function Footer() {
  return (
    <footer className="px-4 sticky top-full border-t flex items-center">
      <p className="container py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Truss Inc.
      </p>
    </footer>
  );
}
