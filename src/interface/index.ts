export interface iSpecialty {
  id: string;
  title: string;
  icon: string;
}

export interface iDoctor {
  id: string
  name: string
  email: string
  profilePhoto: string
  contactNumber: string
  address: string
  registrationNumber: string
  experience: number
  averageRating: number
  gender: string
  appointmentFee: number
  qualification: string
  currentWorkingPlace: string
  designation: string
  isDeleted: false;
  createdAt: string
  updatedAt: string
  doctorSpecialties?: [];
}
