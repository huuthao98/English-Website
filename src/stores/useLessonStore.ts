import { LessonFetchParams } from "@/interfaces/lessons.interface";
import { dataMock } from "@/pages/home-page/data/data";
import { getLessonsService } from "@/services/lessons.service";
import axios from "axios";
import create from "zustand";

interface LessonItem {
  post_id: number;
  name: string;
  specialties: string[];
  speaks: string[];
  post_url: string;
  title: string;
  create_at: string;
  excerpt: string;
  img_url: string;
  learning_language: string;
  price: string;
  lessons: string;
}

const mockData: LessonItem[] = dataMock;

interface LessonState {
  isLoading: boolean;
  error: string | null;
  lessons: LessonItem[];
  suggestions: LessonItem[] | null;
  getLessons: (params?: LessonFetchParams) => Promise<void>;
  getSuggestions: (userId: string) => Promise<void>;
}

export const useLessonStore = create<LessonState>((set) => ({
  error: null,
  isLoading: false,
  lessons: [],
  suggestions: null,

  getLessons: async (params?: LessonFetchParams) => {
    let dataMock = [...mockData];
    set({ isLoading: true, error: null });
    try {
      const result = await getLessonsService(params);
      set({
        lessons: result.data || dataMock,
      });
    } catch (err: any) {
      console.log("get failed ", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  getSuggestions: async (userId: string) => {
    // Giả lập gọi API suggestions
    let dataMock = [...mockData];
    set({ isLoading: true, error: null });
    try {
      // fake delay 3s
      await new Promise((res) => setTimeout(res, 3000));
      const result = await axios(`/api/suggestions?userId=${userId}`);
      set({
        suggestions: result.data.data || dataMock,
      });
    } catch (err: any) {
      console.log("get failed ", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },
}));
