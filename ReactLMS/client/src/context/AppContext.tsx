import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration';

export interface Course {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  isPublished: boolean;
  discount: number;
  courseContent: {
    chapterId: string;
    chapterOrder: number;
    chapterTitle: string;
    chapterContent: {
      lectureId: string;
      lectureTitle: string;
      lectureDuration: number;
      lectureUrl: string;
      isPreviewFree: boolean;
      lectureOrder: number;
    }[];
  }[];
  educator:string;
  enrolledStudents:string[];
  courseRatings:{
    userId: string;
    rating: number;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  courseThumbnail: string;
}

interface AppContextValue {
  currency: any;
  allCourses: Course[];
  navigate: any;
  calculateRating: any;
  isEducator: boolean;
  setIsEducator: any;
}

const defaultValue: AppContextValue = {
  currency: undefined,
  allCourses: [],
  navigate: undefined,
  calculateRating: undefined,
  isEducator: true,
  setIsEducator: undefined,
  
};

export const AppContext = createContext<AppContextValue>(defaultValue);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
 
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Fetch all courses
  const fetchAllCourses = async ()=>{
    setAllCourses(dummyCourses)
  }

  // Function to calculate avarage rating of course
  const calculateRating = (course: { courseRatings: any[]; })=>{
    if(course.courseRatings.length === 0){
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach(rating => {
      totalRating += rating.rating
    })
    return totalRating / course.courseRatings.length
  }

  // Function to calculate course chapter time
  const calculateChapterTime = (chapter: { chapterContent: any[]; }) => {
    let time = 0;
    chapter.chapterContent.map((lecture: { lectureDuration: number; })=> time += lecture.lectureDuration);
    return humanizeDuration(time * 60 * 1000, {units: ["h","m"]})
  }

  // Function to calculate course duration
  const calculateCourseDuration = (course: { courseContent: any[]; }) =>{
    let time = 0;
    course.courseContent.map((chapter: { chapterContent: any[]; })=> chapter.chapterContent.map(
      (lecture: { lectureDuration: number; }) => time += lecture.lectureDuration
    ));
    return humanizeDuration(time * 60 * 1000, {units: ["h","m"]})
  }

  // Function to calculate Number of lectures in the course
  const calculateNoOfLectures = (course: { courseContent: any[]; }) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter: { chapterContent: string | any[]; }) => {
      if(Array.isArray(chapter.chapterContent)){
        totalLectures += chapter.chapterContent.length
      }
    });
    return totalLectures;
  }

  // Fetch User Enrolled Courses
  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses)
  }


  useEffect(()=>{
    fetchAllCourses();
    fetchUserEnrolledCourses();
  },[])

  const value: AppContextValue = {
    currency, allCourses, navigate, calculateRating, isEducator, setIsEducator,
    calculateNoOfLectures, calculateCourseDuration, calculateChapterTime, enrolledCourses, fetchUserEnrolledCourses
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};