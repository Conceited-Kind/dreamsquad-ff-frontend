import TeamDraft from '../components/TeamDraft';

function Draft() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/football-bg.jpg')" }}
    >
      <div className="min-h-screen bg-black bg-opacity-50">
        <TeamDraft />
      </div>
    </div>
  );
}

export default Draft;      Draft.jsx