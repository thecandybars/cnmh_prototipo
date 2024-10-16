import { create } from "zustand";

const useAppStore = create((set) => ({
  // Niveles de vista del Mapa, number -> 0:pais, 1:region, 2:lugar
  actualView: 1,
  setActualView: (view) => set({ actualView: view }),
  // Macroregion seleccionada, obj -> {fullName: "Andina",id: 2,name: "andina",}
  actualRegion: { fullName: "Amazonia", id: 5, name: "amazonia" },
  setActualRegion: (region) => set({ actualRegion: region }),
  //
  actualLugar: null,
  setActualLugar: (lugar) => set({ actualLugar: lugar }),
  //
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
  //
  openDialogLugar: false,
  setOpenDialogLugar: (isOpen) => set({ openDialogLugar: isOpen }),
  //
  activeFilters: [],
  setActiveFilters: (activeFilters) => set({ activeFilters: activeFilters }),
}));

export default useAppStore;
