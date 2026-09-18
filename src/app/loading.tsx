export default function Loading() {
  return (
    <div className="container loading-page" role="status">
      <span className="eyebrow">CARREGANDO</span>
      <div className="skeleton" />
      <div className="skeleton short" />
      <p>Preparando o conteúdo…</p>
    </div>
  );
}
