import { useEffect } from "react";
import { HeartIcon } from "lucide-react";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { HeartFilledIcon } from "@radix-ui/react-icons";

const WishlistButton = ({ productId }: { productId: string }) => {
  const { toggleWishlist, isInWishlist, loadFromStorage } = useWishlistStore();
  const isWished = isInWishlist(productId);

  useEffect(() => {
    loadFromStorage(); // đảm bảo store có dữ liệu khi load lần đầu
  }, []);

  return (
    <button onClick={() => toggleWishlist(productId)}>
      {isWished ? (
        <HeartFilledIcon width={24} height={24} className="text-red-500" />
      ) : (
        <HeartIcon width={24} height={24} />
      )}
    </button>
  );
};

export default WishlistButton;
