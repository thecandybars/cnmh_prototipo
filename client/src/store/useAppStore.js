import { create } from "zustand";

const useAppStore = create((set) => ({
  // Niveles de vista del Mapa, number -> 0:pais, 1:region, 2:lugar
  actualView: 0,
  setActualView: (view) => set({ actualView: view }),

  // Macroregion seleccionada, obj -> {fullName: "Andina",id: 2,name: "andina",}
  actualRegion: null,
  setActualRegion: (region) => set({ actualRegion: region }),

  // Macroregion seleccionada, obj -> {fullName: "Andina",id: 2,name: "andina",}
  actualLugar: null,
  setActualLugar: (lugar) => set({ actualLugar: lugar }),

  // Macroregion seleccionada, obj -> {fullName: "Andina",id: 2,name: "andina",}
  selectedMarker: null,
  setSelectedMarker: (marker) => set({ selectedMarker: marker }),

  //
  destination: null,
  setDestination: (destination) => set({ destination: destination }),

  //
  camera: { isMoving: false },
  setIsMoving: (isMoving) =>
    set((state) => ({
      camera: { ...state.camera, isMoving: isMoving },
    })),
}));

export default useAppStore;
