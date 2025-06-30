import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// --- START: SELF-CONTAINED HELPER COMPONENTS AND HOOKS ---

// Icon Component (Replaces react-icons dependency)
const FiXCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const PrimaryButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    light: 'bg-white text-blue-600 shadow-lg hover:bg-gray-100',
  };
  return (
    <button className={`px-6 py-3 rounded-lg font-bold transition-colors ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// UI Component: BudgetTracker
const BudgetTracker = ({ current, max }) => {
  const percentage = max > 0 ? (current / max) * 100 : 0;
  return (
    <div>
      <h3 className="font-bold text-lg mb-2">Budget Tracker</h3>
      <div className="text-sm text-gray-600 mb-2">
        ${(max - current).toFixed(1)}M / ${max}M remaining
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

// UI Component: FormationPicker
const FormationPicker = ({ onSelect }) => {
  const [selected, setSelected] = useState("4-4-2");
  const formations = ["4-4-2", "4-3-3"];
  const handleSelect = (f) => {
    setSelected(f);
    onSelect(f);
  };
  return (
    <div>
      <h3 className="font-bold text-lg mb-2">Select Formation</h3>
      <div className="flex gap-2 flex-wrap">
        {formations.map((f) => (
          <button key={f} onClick={() => handleSelect(f)} className={`px-4 py-2 rounded-lg text-sm ${selected === f ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}>
            {f}
          </button>
        ))}
      </div>
    </div>
  );
};

// Data Hook: useTeamBuilders
const useTeamBuilders = () => {
    const [team, setTeam] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const [budget, setBudget] = useState(100.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAuthHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('access_token')}` });
    const api = axios.create({ baseURL: 'http://localhost:5000', headers: getAuthHeaders() });

    const fetchData = useCallback(async () => {
        try {
            const [teamRes, playersRes] = await Promise.all([api.get('/team'), api.get('/players')]);
            setTeam(teamRes.data.players || []);
            setBudget(teamRes.data.budget_left || 100.0);
            setAllPlayers(playersRes.data || []);
        } catch (err) {
            setError("Could not load team data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const addPlayer = async (player) => {
        if (team.some(p => p.id === player.id)) return;
        try {
            await api.post('/team/draft', { player_id: player.id });
            await fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Could not draft player.");
        }
    };

    const removePlayer = async (playerId) => {
        try {
            await api.post('/team/remove_player', { player_id: playerId });
            await fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Could not remove player.");
        }
    };

    const availablePlayers = allPlayers.filter(p => !team.some(tp => tp.id === p.id));

    return { team, budget, addPlayer, removePlayer, availablePlayers, loading, error };
};

// --- Reusable formatting function ---
function formatCurrency(value) {
  if (typeof value !== 'number') return '$0.0M';
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
}

// --- Draggable Player Card for the list ---
const DraggablePlayerCard = ({ player }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PLAYER',
    item: { player },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-grab ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-sm">{player.name}</p>
          <p className="text-xs text-gray-500">{player.team}</p>
        </div>
        <p className="font-bold text-blue-600">{formatCurrency(player.value)}</p>
      </div>
    </div>
  );
};

// --- Formation Slot on the Pitch ---
const FormationSlot = ({ slot, player, onDrop, onRemove }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'PLAYER',
    drop: (item) => onDrop(item.player, slot.id),
    canDrop: () => !player, 
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const getSlotBgColor = () => {
    if (isOver && canDrop) return 'bg-green-200';
    if (isOver && !canDrop) return 'bg-red-200';
    return 'bg-black/20';
  };

  return (
    <div ref={drop} style={{ gridArea: slot.id }} className={`relative rounded-md flex items-center justify-center text-white transition-colors ${getSlotBgColor()}`}>
      {player ? (
        <div className="text-center">
          <button onClick={() => onRemove(slot.id, player.id)} className="absolute top-0 right-0 -mt-1 -mr-1 text-white bg-red-500 rounded-full hover:bg-red-700">
            <FiXCircle />
          </button>
          <img src={player.photo} alt={player.name} className="w-10 h-10 rounded-full mx-auto border-2 border-white" />
          <p className="text-xs font-bold mt-1 truncate w-20">{player.name}</p>
        </div>
      ) : (
        <span className="text-sm font-bold opacity-50">{slot.position}</span>
      )}
    </div>
  );
};

// --- Main Team Builder Component ---
const TeamBuilderInternal = () => {
  const { team, budget, addPlayer, removePlayer, availablePlayers, loading, error } = useTeamBuilders();
  
  const [formation, setFormation] = useState('4-4-2');
  const [pitchLayout, setPitchLayout] = useState({});

  useEffect(() => {
    if (team.length > 0 && Object.keys(pitchLayout).length === 0) {
      const initialLayout = {};
      const formationSlots = getFormationSlots(formation);
      team.slice(0, 11).forEach((p, i) => {
        if (formationSlots[i]) {
            initialLayout[formationSlots[i].id] = p;
        }
      });
      setPitchLayout(initialLayout);
    }
  }, [team, formation]);

  const handleDrop = (player, slotId) => {
    if (team.length >= 11 && !team.some(p => p.id === player.id)) {
      alert("Your squad is full. Remove a player before adding a new one.");
      return;
    }
    setPitchLayout(prev => ({ ...prev, [slotId]: player }));
    addPlayer(player);
  };

  const handleRemoveFromPitch = async (slotId, playerId) => {
    setPitchLayout(prev => {
      const newLayout = { ...prev };
      delete newLayout[slotId];
      return newLayout;
    });
    await removePlayer(playerId);
  };

  const handleSaveTeam = () => {
    if (Object.values(pitchLayout).filter(Boolean).length !== 11) {
      alert('You must have 11 players on the pitch to save.');
      return;
    }
    alert('Team saved successfully!');
    console.log({
        formation: formation,
        players: pitchLayout
    });
  };

  const getFormationSlots = (fmt) => {
    const layouts = {
      '4-4-2': [
        { id: 'GK', position: 'GK' },
        { id: 'DEF1', position: 'LB' }, { id: 'DEF2', position: 'CB' }, { id: 'DEF3', position: 'CB' }, { id: 'DEF4', position: 'RB' },
        { id: 'MID1', position: 'LM' }, { id: 'MID2', position: 'CM' }, { id: 'MID3', position: 'CM' }, { id: 'MID4', position: 'RM' },
        { id: 'FWD1', position: 'ST' }, { id: 'FWD2', position: 'ST' },
      ],
      '4-3-3': [
        { id: 'GK', position: 'GK' },
        { id: 'DEF1', position: 'LB' }, { id: 'DEF2', position: 'CB' }, { id: 'DEF3', position: 'CB' }, { id: 'DEF4', position: 'RB' },
        { id: 'MID1', position: 'CM' }, { id: 'MID2', position: 'CM' }, { id: 'MID3', position: 'CM' },
        { id: 'FWD1', position: 'LW' }, { id: 'FWD2', position: 'ST' }, { id: 'FWD3', position: 'RW' },
      ],
    };
    return layouts[fmt] || layouts['4-4-2'];
  };

  if (loading) return <div className="text-center p-10">Loading Team Builder...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Team Builder</h1>
              <p className="text-lg opacity-90">Build your dream team within the 100M budget</p>
            </div>
            <PrimaryButton variant="light" onClick={handleSaveTeam}>Save Team</PrimaryButton>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Available Players */}
          <div className="lg:col-span-3 bg-white p-4 rounded-xl shadow-md">
            <h2 className="font-bold text-lg mb-4">Available Players</h2>
            <div className="space-y-2 h-[600px] overflow-y-auto pr-2">
              {availablePlayers.map(player => <DraggablePlayerCard key={player.id} player={player} />)}
            </div>
          </div>

          {/* Center Panel: The Pitch */}
          <div className="lg:col-span-6 bg-green-600 bg-[url('https://www.transparenttextures.com/patterns/grass.png')] p-4 rounded-xl shadow-lg">
            <div className={`h-full grid gap-4 grid-rows-4 grid-cols-5 formation-${formation}`}>
              {getFormationSlots(formation).map(slot => (
                <FormationSlot key={slot.id} slot={slot} player={pitchLayout[slot.id]} onDrop={handleDrop} onRemove={handleRemoveFromPitch} />
              ))}
            </div>
          </div>

          {/* Right Panel: Team Tools & Squad */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <BudgetTracker current={100 - budget} max={100} />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <FormationPicker onSelect={setFormation} />
            </div>
             <div className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="font-bold text-lg mb-2">Your Squad ({team.length}/11)</h2>
                <div className="space-y-2 h-64 overflow-y-auto pr-2">
                    {team.map(p => (
                        <div key={p.id} className="text-sm p-2 bg-gray-50 rounded-md flex justify-between">
                            <span className="font-semibold">{p.name}</span>
                            <span className="text-gray-500">{p.position}</span>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TeamBuilder() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TeamBuilderInternal />
    </DndProvider>
  )
}
