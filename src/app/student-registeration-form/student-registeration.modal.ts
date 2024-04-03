export class studentRegisteration {
  studentName: string;
  studentDoB: Date;
  studentEmail: string;
  studentCurrentAddress: string;
  studentPermanentAddress: string;
  studentMobileCountryCode: string;
  studentMobileNumber: string;
  studentGender: string;
  studentSubjects: { name: string; mark: number }[];
  studentEnrollmentNumber: string;
  studentSchoolName: string;
  constructor(
    studentName: string,
    studentDoB: Date,
    studentEmail: string,
    studentCurrentAddress: string,
    studentPermanentAddress: string,
    studentMobileCountryCode: string,
    studentMobileNumber: string,
    studentGender: string,
    studentSubjects: { name: string; mark: number }[],
    studentEnrollmentNumber: string,
    studentSchoolName: string
  ) {
    this.studentName = studentName;
    this.studentDoB = studentDoB;
    this.studentEmail = studentEmail;
    this.studentCurrentAddress = studentCurrentAddress;
    this.studentPermanentAddress = studentPermanentAddress;
    this.studentMobileCountryCode = studentMobileCountryCode;
    this.studentMobileNumber = studentMobileNumber;
    this.studentGender = studentGender;
    this.studentSubjects = studentSubjects;
    this.studentEnrollmentNumber = studentEnrollmentNumber;
    this.studentSchoolName = studentSchoolName;
  }
}
