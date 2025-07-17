import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Main } from "@/components/common/main";
import { Header } from "@/components/common/header";
import { ItemLesson } from "@/components/common/item-lesson";
import { FilterDataTeacher } from "@/components/common/filter-data-teacher";

import { LanguageOptions } from "./data/data";
import { useLessonStore } from "@/stores/useLessonStore";

export default function HomePage() {
  const { getLessons, lessons, suggestions, isLoading } = useLessonStore();
  const [dataLesson, setDataLesson] = useState<any>([]);

  const scrollSlider = (direction: number) => {
    const slider = document.getElementById("languageSlider");
    if (slider) {
      const scrollAmount = 300;
      slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  const getLessonData = async () => {
    try {
      await getLessons();
      setDataLesson(dataLesson);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getLessonData();
  }, []);
  return (
    <>
      <Header />
      <Main>
        <div className="flex flex-col justify-center items-center">
          <div className="container">
            <section className="px-4">
              <div className="flex flex-col-reverse m-auto md:flex-row">
                <div className="flex flex-col flex-1 items-center md:items-start ">
                  <h1 className="font-bold text-4xl text-center text-[#313140] text-2xl ">
                    Become fluent in any language
                  </h1>
                  <ul className="flex flex-col list-none gap-1 font-medium text-sm text-gray2 mt-7 text-[#515164]">
                    <li className="flex gap-2 items-center">
                      <img src="/redx2.webp" alt="dot" width={12}></img>
                      <span>
                        Take customizable 1-on-1 lessons trusted by millions of
                        users
                      </span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <img src="/redx2.webp" alt="dot" width={12}></img>
                      <span>
                        Learn from certified teachers that fit your budget and
                        schedule
                      </span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <img src="/redx2.webp" alt="dot" width={12}></img>
                      <span>
                        Connect with a global community of language learners
                      </span>
                    </li>
                  </ul>
                  <Button
                    variant="destructive"
                    className="mt-5 sm:mt-7 w-[200px]"
                  >
                    Start now
                  </Button>
                </div>
                <div className="shrink-0 me-3">
                  <img src="/bg-1.webp" width={560} height={320}></img>
                </div>
              </div>
              <div className="mt-8 mx-auto px-4 md:px-6 max-w-grid-12">
                <div
                  style={{ border: "1px solid #E5E8ED" }}
                  className="bg-white rounded-sm py-4 flex justify-end items-center"
                >
                  <div className="relative w-full px-4">
                    <button
                      onClick={() => scrollSlider(-1)}
                      className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
                    >
                      <ArrowLeft />
                    </button>

                    <div
                      id="languageSlider"
                      className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar py-4"
                    >
                      {LanguageOptions.map((item) => (
                        <div
                          key={item.id}
                          className="flex-none w-48 snap-start border rounded-lg p-4 shadow flex gap-4 items-center bg-white"
                        >
                          <img
                            src={item.img}
                            alt={item.label}
                            className="w-10 h-10"
                          />
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-gray-500">
                              {item.teacher} Teachers
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => scrollSlider(1)}
                      className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
                    >
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <div className="flex items-center gap-3">
                  <span className="md:text-[22px] text-[16px]">Excellent</span>
                  <img
                    src="/star.svg"
                    alt="star"
                    className="md:w-[130px] w-[100px]"
                  />
                  <img
                    src="one-star.svg"
                    alt="one-star"
                    className="md:w-[130px] w-[100px]"
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="flex flex-col md:flex-row items-center justify-between bg-white pt-10 px-4 pb-6">
                <div>
                  <h2 className="text-[40px] leading-[40px] text-[#313140] font-bold mb-[20px]">
                    Find your educational course or product online
                  </h2>
                  <p className="text-[16px] text-[#515164] font-[500]">
                    At antoree, we offer a variety of high-quality educational
                    courses and products, taught by experienced and certified
                    instructors. Our online platform allows you to easily browse
                    and choose learning options that suit your goals, interests,
                    and schedule.
                  </p>
                </div>
                <div className="w-full flex justify-center md:justify-end">
                  <img
                    src="/bg_logo.svg"
                    alt="bg-logo"
                    className="w-[250px] h-[250px]"
                  />
                </div>
              </div>
            </section>
          </div>
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
