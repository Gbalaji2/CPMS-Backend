export const UserDetail = async (req, res) => {
  const user = req.user;

  return res.json({
    id: user.id,
    first_name: user.first_name,
    middle_name: user.middle_name,
    last_name: user.last_name,
    email: user.email,
    number: user.number,
    password: user.password,
    profile: user.profile,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    createdAt: user.createdAt,

    fullAddress: {
      address: user.fullAddress?.address,
      pincode: user.fullAddress?.pincode,
    },

    role: user.role,
    isProfileCompleted: user.isProfileCompleted,

    studentProfile: {
      rollNumber: user.studentProfile?.rollNumber,
      uin: user.studentProfile?.UIN,
      department: user.studentProfile?.department,
      year: user.studentProfile?.year,
      addmissionYear: user.studentProfile?.addmissionYear,
      gap: user.studentProfile?.gap,
      liveKT: user.studentProfile?.liveKT,
      resume: {
        filename: user.studentProfile?.resume?.filename,
        filepath: user.studentProfile?.resume?.filepath,
        contentType: user.studentProfile?.resume?.contentType,
      },
      SGPA: {
        sem1: user.studentProfile?.SGPA?.sem1,
        sem2: user.studentProfile?.SGPA?.sem2,
        sem3: user.studentProfile?.SGPA?.sem3,
        sem4: user.studentProfile?.SGPA?.sem4,
        sem5: user.studentProfile?.SGPA?.sem5,
        sem6: user.studentProfile?.SGPA?.sem6,
        sem7: user.studentProfile?.SGPA?.sem7,
        sem8: user.studentProfile?.SGPA?.sem8,
      },
      pastQualification: {
        ssc: {
          board: user.studentProfile?.pastQualification?.ssc?.board,
          percentage: user.studentProfile?.pastQualification?.ssc?.percentage,
          year: user.studentProfile?.pastQualification?.ssc?.year,
        },
        hsc: {
          board: user.studentProfile?.pastQualification?.hsc?.board,
          percentage: user.studentProfile?.pastQualification?.hsc?.percentage,
          year: user.studentProfile?.pastQualification?.hsc?.year,
        },
        diploma: {
          board: user.studentProfile?.pastQualification?.diploma?.board,
          percentage: user.studentProfile?.pastQualification?.diploma?.percentage,
          year: user.studentProfile?.pastQualification?.diploma?.year,
        },
      },
    },
  });
};