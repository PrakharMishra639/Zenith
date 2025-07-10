import { courseCategories } from "@/config";
import banner from "../../../assets/hero1.jpg";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";

import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    console.log(getCurrentId);
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between py-8 px-4 md:px-6 lg:px-8 gap-6">
        {/* Text Section */}
        <div className="w-full md:w-1/3 md:pr-8 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Learning that gets you
          </h1>
          <p className="text-base sm:text-lg md:text-xl">
            Skills for your present and your future. Get Started with US
          </p>
        </div>

        {/* Banner Image */}
        <div className="w-full md:w-2/3">
          <img
            src={banner}
            alt="Banner"
            className="w-full max-h-[200px] sm:max-h-[300px] md:max-h-[350px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-8 px-4 md:px-6 lg:px-8 bg-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center md:text-left">
          Course Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              key={categoryItem.id}
              className="justify-start text-sm sm:text-base"
              variant="outline"
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center md:text-left">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                key={courseItem?._id}
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-lg overflow-hidden shadow cursor-pointer hover:shadow-md transition"
              >
                <img
                  src={courseItem?.image}
                  alt={courseItem?.title}
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2 text-sm sm:text-base">
                    {courseItem?.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-bold text-[15px] sm:text-[16px]">
                    ${courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center w-full col-span-full">
              No Courses Found
            </h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
