import { Main } from "@/components/common/main";
import { Header } from "@/components/common/header";
import { ItemLesson } from "@/components/common/item-lesson";
import { FilterDataTeacher } from "@/components/common/filter-data-teacher";

import { useLessonStore } from "@/stores/useLessonStore";


export default function WatchedPage() {
  const { lessons, suggestions, isLoading } = useLessonStore();

  return (
    <>
      <Header />
      <Main>
        <div className="flex flex-col justify-center items-center">
          <section className="w-full bg-[#f5f6f9] flex justify-center flex-col items-center">
            <div className="container">
              <FilterDataTeacher />
            </div>

            <div className="container">
              <div className="w-full p-4">
                {isLoading ? (
                  <div className="flex justify-center items-center py-6">
                    <div className="h-6 w-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : suggestions ? (
                  <div>
                    <h2 className="text-[20px] leading-[20px] text-[#313140] font-bold mb-[20px]">
                      List of suggestions
                    </h2>
                    <ItemLesson data={suggestions} />
                  </div>
                ) : null}

                <h2 className="mt-5 text-[20px] leading-[20px] text-[#313140] font-bold mb-[20px]">
                  Course List
                </h2>
                <ItemLesson data={lessons} />
              </div>
            </div>
          </section>
        </div>
      </Main>
    </>
  );
}
