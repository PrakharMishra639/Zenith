const StudentCourses = require("../../models/StudentCourses");

const getCoursesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const studentBoughtCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    if (!studentBoughtCourses || !Array.isArray(studentBoughtCourses.courses)) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: studentBoughtCourses.courses,
    });
  } catch (error) {
    console.error("Error in getCoursesByStudentId:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getCoursesByStudentId };
