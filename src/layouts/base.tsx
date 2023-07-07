import { cn } from "~/utils/cn";

export const BaseLayout = ({
  children,
}: {
  children: React.ReactNode;
})  => {

  return <body
  className={cn(
    "font-sans antialiased",
   
  )}
>
    <main className="container mt-20">{children}</main>
    <footer className="container my-20 flex flex-col gap-4 sm:flex-row items-start md:items-center justify-between">
    </footer>
</body>
}