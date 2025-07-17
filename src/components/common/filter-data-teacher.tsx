import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debounce";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  ChevronsUpDown,
  DollarSign,
  MessageSquareDot,
  X,
} from "lucide-react";
import { LanguageOptions } from "../../pages/home-page/data/data";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { useLessonStore } from "@/stores/useLessonStore";

export function FilterDataTeacher() {
  const { getSuggestions, getLessons } = useLessonStore();
  const [valueSearchQParam, setValueSearchQParam] = useState<string | null>(
    null
  );

  const debouncedSearchQParam = useDebounce(valueSearchQParam, 500);
  const getDataTeacher = async (name: any) => {
    getLessons(name);
  };

  useEffect(() => {
    getDataTeacher({
      name: debouncedSearchQParam,
    });
  }, [debouncedSearchQParam]);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleValue = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const maxLimit = 100_000;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxLimit);
  const [openPrice, setOpenPrice] = useState(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value.replace(/\D/g, ""));
    setMinPrice(Math.min(val, maxPrice));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value.replace(/\D/g, ""));
    setMaxPrice(Math.max(val, minPrice));
  };

  
  const handleClear = () => {
    setMinPrice(0);
    setMaxPrice(maxLimit);
  };
  const handleSuggest = async () => {
    //fake user id
    const userID = "1231237137713";
    try {
      await getSuggestions(userID);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full px-4 py-2">
      <div className="flex flex-row flex-col-reverse md:flex-row gap-2 items-start gap-y-2 ">
        <Input
          placeholder="Name/Course/Interests"
          value={valueSearchQParam || ""}
          onChange={(event) => setValueSearchQParam(event.target.value)}
          className="h-[40px] w-[180px]"
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "!h-[40px] w-[200px] justify-between",
                selectedValues.length === 0 && "text-muted-foreground"
              )}
            >
              <MessageSquareDot />
              {selectedValues.length > 0
                ? `Speaks: ${selectedValues.length} selected`
                : "Speaks"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandGroup>
                {LanguageOptions.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => toggleValue(item.value)}
                  >
                    <div
                      className={cn(
                        "mr-2 h-4 w-4 rounded-sm border border-primary",
                        selectedValues.includes(item.value) &&
                          "bg-primary text-primary-foreground"
                      )}
                    >
                      {selectedValues.includes(item.value) && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>

                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              {selectedValues.length > 0 && (
                <div className="flex flex-col gap-2 p-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedValues([])}
                  >
                    <X className="mr-1 h-4 w-4" /> Clear filters
                  </Button>
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => setOpen(false)}
                  >
                    Apply
                  </Button>
                </div>
              )}
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={openPrice} onOpenChange={setOpenPrice}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-[40px] w-[200px] justify-between"
            >
              <DollarSign />
              {minPrice === 0 && maxPrice === maxLimit
                ? "Price"
                : `${minPrice / 1_000_00} - ${maxPrice / 1_000_0} Usd`}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[360px] space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-xs mb-1 block">Minimum price</label>
                <div className="relative">
                  <Input
                    value={minPrice.toLocaleString("vi-VN")}
                    onChange={handleMinChange}
                    className="pr-6"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                    $
                  </span>
                </div>
              </div>
              <span className="text-sm">-</span>
              <div className="flex-1">
                <label className="text-xs mb-1 block">Maximum price</label>
                <div className="relative">
                  <Input
                    value={maxPrice.toLocaleString("vi-VN")}
                    onChange={handleMaxChange}
                    className="pr-6"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                    $
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClear}
              >
                Clear filters
              </Button>
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setOpen(false)}
              >
                Apply
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Button onClick={handleSuggest}>Course suggestions</Button>
      </div>
    </div>
  );
}
