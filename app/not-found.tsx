import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="jb-not-found">
      <div className="jb-container">
        <h1 className="text-section text-text">Esta página não existe.</h1>
        <p className="jb-not-found__lead text-body text-text-2">
          Talvez o link esteja errado ou o texto tenha mudado de lugar.
        </p>
        <Link href="/" className="jb-btn jb-not-found__cta">
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
