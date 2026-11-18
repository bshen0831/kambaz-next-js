"use client";

import { create } from "zustand";

export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

type EnrollmentsStore = {
  enrollments: Enrollment[];
  setEnrollments: (enrollments: Enrollment[]) => void;
  enroll: (enrollment: Enrollment) => void;
  unenroll: (userId: string, courseId: string) => void;
};

export const useEnrollmentsStore = create<EnrollmentsStore>((set) => ({
  enrollments: [],
  setEnrollments: (enrollments) => set({ enrollments }),
  enroll: (enrollment) =>
    set((state) => ({
      enrollments: [
        ...state.enrollments.filter((e) => e._id !== enrollment._id),
        enrollment,
      ],
    })),
  unenroll: (userId, courseId) =>
    set((state) => ({
      enrollments: state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId),
      ),
    })),
}));
