import { FaEdit, FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import dayjs from "dayjs";

const colors = [
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
];

const TimelineJourney = ({ places, setPlaces }) => {
  const [editStates, setEditStates] = useState({});

  const handleDelete = (id) => {
    const updated = places.filter((entry) => entry.id !== id);
    setPlaces(updated);
  };

  const startEditing = (entry) => {
    setEditStates((prev) => ({
      ...prev,
      [entry.id]: { city: entry.city, date: entry.date },
    }));
  };

  const cancelEdit = (id) => {
    setEditStates((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const saveEdit = (id) => {
    const updated = places.map((entry) =>
      entry.id === id ? { ...entry, ...editStates[id] } : entry
    );
    setPlaces(updated);
    setEditStates((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const sortedplaces = [...places]
    .map((c) => ({ ...c }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const firstDate = sortedplaces[0]?.date
    ? dayjs(sortedplaces[0].date)
    : dayjs();

  return (
    <div className="relative bg-white/10 dark:bg-gray-800/40 rounded-lg p-6 shadow-md mt-10 overflow-hidden">
      <h2 className="text-2xl font-semibold mb-6 text-white text-center">
        Your Journey
      </h2>

      {/* Vertical Timeline Line */}
      <div className="absolute top-14 bottom-6 left-4 w-[2px] bg-rose-500/80 z-0" />

      <div className="space-y-10 relative z-10">
        <AnimatePresence>
          {sortedplaces.map((entry, idx) => {
            const dayDiff = dayjs(entry.date).diff(firstDate, "day") + 1;
            const isEditing = !!editStates[entry.id];
            const dayColor = colors[idx % colors.length];

            return (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative flex gap-4 items-center"
              >
                <div className="w-8 flex flex-col items-center">
                  <div className="h-[2px] w-12 border-dotted border-t-2 border-rose-500 ml-2 mt-[9px]" />
                </div>

                <div className="flex-1 bg-gray-900 dark:bg-gray-800 rounded-lg p-4 shadow-md relative">
                  <div className="absolute top-2 right-2 flex gap-3 text-white">
                    {!isEditing && (
                      <>
                        <button
                          onClick={() => startEditing(entry)}
                          className="hover:text-blue-400"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="hover:text-red-400"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Day Label */}
                  <p
                    className="text-sm font-semibold"
                    style={{ color: dayColor }}
                  >
                    Day {dayDiff}
                  </p>

                  {isEditing ? (
                    <div className="flex flex-col gap-2 mt-2">
                      <input
                        type="text"
                        value={editStates[entry.id].place}
                        onChange={(e) =>
                          setEditStates((prev) => ({
                            ...prev,
                            [entry.id]: {
                              ...prev[entry.id],
                              place: e.target.value,
                            },
                          }))
                        }
                        className="p-2 rounded text-black dark:text-white dark:bg-gray-700"
                        placeholder="place"
                      />
                      <input
                        type="date"
                        value={editStates[entry.id].date}
                        onChange={(e) =>
                          setEditStates((prev) => ({
                            ...prev,
                            [entry.id]: {
                              ...prev[entry.id],
                              date: e.target.value,
                            },
                          }))
                        }
                        className="p-2 rounded text-black dark:text-white dark:bg-gray-700"
                      />
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => saveEdit(entry.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => cancelEdit(entry.id)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-white">
                        {entry.place}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Arriving on {dayjs(entry.date).format("MMMM D, YYYY")}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimelineJourney;
