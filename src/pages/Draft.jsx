import TeamDraft from '../components/TeamDraft';

function Draft() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/football-bg.jpg')" }}
    >
      <div className="min-h-screen bg-black bg-opacity-50 pt-20"> {/* Added pt-20 for navbar offset */}
        <TeamDraft />
      </div>
    </div>
  );
}

export default Draft;