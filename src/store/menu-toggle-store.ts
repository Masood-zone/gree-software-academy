import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MenuToggleState {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const useMenuToggleStore = create<MenuToggleState>()(
  persist(
    (set) => ({
      isOpen: true,
      openMenu: () => set({ isOpen: true }),
      closeMenu: () => set({ isOpen: false }),
      toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "dashboard-menu-toggle",
    }
  )
);
