export default function updateStudentGradeByCity(list, city, newGrades) {
    if (!Array.isArray(list)) return [];
    const grades = Array.isArray(newGrades) ? newGrades : [];
  
    const gradeMap = new Map(
      grades.map(({ studentId, grade }) => [studentId, grade]),
    );
  
    return list
      .filter((student) => student.location === city)
      .map((student) => ({
        ...student,
        grade: gradeMap.has(student.id) ? gradeMap.get(student.id) : 'N/A',
      }));
  }
  