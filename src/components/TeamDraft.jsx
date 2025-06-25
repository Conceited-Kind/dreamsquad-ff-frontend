import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PlayerCard from './PlayerCard';

function TeamDraft() {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [mySquad, setMySquad] = useState([]);
  const [budget, setBudget] = useState(100);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/players`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.ok) {
          const data = await response.json();
          setAvailablePlayers(data);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === 'available' && destination.droppableId === 'squad') {
      const player = availablePlayers[source.index];
      if (budget < player.value || mySquad.length >= 11) {
        alert('Insufficient budget or squad limit reached!');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/team/draft`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ playerId: player.id }),
        });
        if (response.ok) {
          setAvailablePlayers(availablePlayers.filter((_, i) => i !== source.index));
          setMySquad([...mySquad, player]);
          setBudget(budget - player.value);
        }
      } catch (error) {
        console.error('Error drafting player:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Draft Your Team (Budget: ${budget.toFixed(1)}m)
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Available Players</h3>
            <Droppable droppableId="available">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-800 p-4 rounded-xl min-h-[400px]"
                >
                  {availablePlayers.map((player, index) => (
                    <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                      {(provided) => (
                        <PlayerCard
                          player={player}
                          index={index}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          innerRef={provided.innerRef}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">My Squad</h3>
            <Droppable droppableId="squad">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-800 p-4 rounded-xl min-h-[400px]"
                >
                  {mySquad.map((player, index) => (
                    <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                      {(provided) => (
                        <PlayerCard
                          player={player}
                          index={index}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          innerRef={provided.innerRef}
                        />
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