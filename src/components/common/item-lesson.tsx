import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import WishlistButton from "./wishlist-button";

interface ItemType {
  post_id: any;
  post_url: string;
  title: string;
  create_at: Date;
  excerpt: string;
  img_url: string;
  learning_language: string;
  name: string;
  speaks: any;
  lessons: string;
  price: string;
}

export const ItemLesson = (data: any) => {
  const [dataShow, setDataShow] = useState<any[]>(data.data);

  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddToWatchedList = (productId: string, item: ItemType) => {
    // ✅ thêm vào watched list
    const watched = JSON.parse(localStorage.getItem("watchedList") || "[]");
    if (!watched.includes(productId)) {
      const updated = [productId, ...watched].slice(0, 20);
      localStorage.setItem("watchedList", JSON.stringify(updated));
    }

    // ✅ mở dialog
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    setDataShow(data.data);
  }, [data.data]);

  return (
    <div className="flex flex-col gap-4">
      {dataShow?.map((item: any) => {
        return (
          <Card
            key={item.post_id}
            className="flex items-center  flex-col px-6 md:px-4 md:flex-row"
          >
            <div className="flex flex-col gap-2 items-center  self-start md:self-center w-full">
              <img
                src={item.img_url || ""}
                alt=""
                className="rounded-[50%] w-[76px] h-[76px]"
              />
              <div className="flex items-center">
                <img src="/star-yellow.svg" alt="" className="w-[16px]" />
                <span className="text-[#ffc400] font-[500]">5.0</span>
              </div>
              <div className="text-[16px] font-[300] whitespace-nowrap">
                {item.lessons} Lessons
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="text-[#515164] font-[500] text-[16px]">
                {item.name}
              </div>
              <span className="text-[#9c9cac] font-[500] text-[16px] flex items-center gap-2">
                <span>Professional Teacher</span>{" "}
                <span>
                  <img src="/verify_icon.svg" alt="verify" />
                </span>
              </span>
              <div className="font-medium text-tiny text-gray3 uppercase flex items-center">
                <span className="whitespace-nowrap self-start">Speaks :</span>
                <div className="flex items-center gap-2 mx-1 h6 flex-wrap">
                  {item.speaks.map((item: any) => {
                    return (
                      <div key={item} className="flex items-center gap-2">
                        <div className="whitespace-nowrap flex items-center gap-2">
                          <span>{item}</span>
                          <Badge className=" text-[#00b3bd] text-center bg-[#E6F7F8] px-2 py-1 rounded-full min-w-[50px] whitespace-nowrap">
                            Native
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="text-sm font-medium break-words text-gray3">
                {item.excerpt}
              </div>
              <div className="mt-10 flex justify-between">
                <div className="text-[16px] text-gray1 font-bold text-base">
                  USD {item.price}.00
                  <span className="text-[#9c9cac] text-sm font-medium">
                    / trial
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <WishlistButton productId={item.post_id} />
                  <Button
                    onClick={() => handleAddToWatchedList(item.post_id, item)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <div className="flex flex-col gap-2 items-center self-start">
            <img
              src={selectedItem?.img_url || ""}
              alt=""
              className="rounded-[50%] w-[76px] h-[76px]"
            />
            <DialogTitle>{selectedItem?.name}</DialogTitle>
            <div className="flex items-center">
              <img src="/star-yellow.svg" alt="" className="w-[16px]" />
              <span className="text-[#ffc400] font-[500]">5.0</span>
            </div>
            <div className="text-[16px] font-[300] whitespace-nowrap">
              {selectedItem?.lessons} Lessons
            </div>
          </div>
          <div className="w-full flex flex-col">
            <span className="text-[#9c9cac] font-[500] text-[16px] flex items-center gap-2">
              <span>Professional Teacher</span>
              <span>
                <img src="/verify_icon.svg" alt="verify" />
              </span>
            </span>
            <div className="font-medium text-tiny text-gray3 uppercase flex items-center wrap">
              <span className="whitespace-nowrap self-start">Speaks :</span>
              <div className="flex items-center gap-2 mx-1 h6 flex-wrap">
                {selectedItem?.speaks.map((item: any) => {
                  return (
                    <div key={item} className="flex items-center gap-2">
                      <div className="whitespace-nowrap flex items-center gap-2">
                        <span>{item}</span>
                        <Badge className=" text-[#00b3bd] text-center bg-[#E6F7F8] px-2 py-1 rounded-full min-w-[50px] whitespace-nowrap">
                          Native
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-sm font-medium break-words text-gray3">
              {selectedItem?.excerpt}
            </div>
            <div className="mt-10 flex justify-between">
              <div className="text-[16px] text-gray1 font-bold text-base">
                USD {selectedItem?.price}.00
                <span className="text-[#9c9cac] text-sm font-medium">
                  / trial
                </span>
              </div>
              <WishlistButton productId={selectedItem?.post_id || ""} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
