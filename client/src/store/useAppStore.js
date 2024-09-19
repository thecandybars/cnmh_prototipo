import { create } from "zustand";

const useAppStore = create((set) => ({
  // Niveles de vista del Mapa, number -> 0:pais, 1:region, 2:lugar
  actualView: 0,
  setActualView: (view) => set({ actualView: view }),

  // Macroregion seleccionada, obj -> {fullName: "Andina",id: 2,name: "andina",}
  actualRegion: null,
  setActualRegion: (region) => set({ actualRegion: region }),
}));

export default useAppStore;
