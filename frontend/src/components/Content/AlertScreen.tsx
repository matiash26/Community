export default function AlertScreen({ error }: { error: boolean }) {
  return (
    <h2 style={{ marginTop: '3rem', color: 'white', textAlign:"center" }}>
      {error ? 'Servidor Offline.' : 'Nenhuma postagem no momento.'}
    </h2>
  );
}
