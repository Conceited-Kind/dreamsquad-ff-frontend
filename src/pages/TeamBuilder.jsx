import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';

export default function TeamBuilder() {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [mySquad, setMySquad] = useState([]);
  const [budget, setBudget] = useState(100);

  // Mock player data - replace with your API call
  useEffect(() => {
    const mockPlayers = [
      { id: 1, name: 'Mohamed Salah', team: 'Liverpool', position: 'Forward', value: 12.5, points: 210 },
      { id: 2, name: 'Kevin De Bruyne', team: 'Man City', position: 'Midfielder', value: 11.0, points: 195 },
      // Add more players...
    ];
    setAvailablePlayers(mockPlayers);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === 'available' && destination.droppableId === 'squad') {
      const player = availablePlayers[source.index];
      if (budget - player.value < 0) return;
      
      setAvailablePlayers(availablePlayers.filter((_, i) => i !== source.index));
      setMySquad([...mySquad, player]);
      setBudget(budget - player.value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Team Builder</h1>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
          <span className="font-bold">Budget:</span> ${budget.toFixed(1)}M remaining
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Players</h2>
            <Droppable droppableId="available">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[500px]"
                >
                  {availablePlayers.map((player, index) => (
                    <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="player-card"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{player.name}</h3>
                              <p className="text-gray-600">{player.team} • {player.position}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-blue-600">${player.value}M</p>
                              <p className="text-sm text-green-600">{player.points} pts</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">My Squad ({mySquad.length}/11)</h2>
            <Droppable droppableId="squad">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[500px]"
                >
                  {mySquad.map((player, index) => (
                    <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="player-card"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{player.name}</h3>
                              <p className="text-gray-600">{player.team} • {player.position}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-blue-600">${player.value}M</p>
                              <p className="text-sm text-green-600">{player.points} pts</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}