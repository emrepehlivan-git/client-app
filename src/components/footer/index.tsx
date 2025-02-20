export const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
