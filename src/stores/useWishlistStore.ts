import  create  from "zustand";

interface WishlistState {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  loadFromStorage: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],

  toggleWishlist: (productId) => {
    const current = get().wishlist;
    let updated;

    if (current.includes(productId)) {
      updated = current.filter((id) => id !== productId);
    } else {
      updated = [...current, productId];
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
    set({ wishlist: updated });
  },

  isInWishlist: (productId) => {
    return get().wishlist.includes(productId);
  },

  loadFromStorage: () => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    set({ wishlist: stored });
  },
}));
