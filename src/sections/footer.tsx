// components/footer.tsx
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-10 py-6 border-t-2 border-zinc-300 flex items-center justify-center">
      <p className="text-xs text-zinc-500">
        © {year} George Lucas. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;