export interface Coach {
  id: string;
  name: string;
  role: string;
  specialty: string;
  photo: string;
  photoAlt: string;
  bio: string;
  background: string[];
  specialties: string[];
  languages: string[];
  certifications?: string[];
  contact: {
    phone: string;
    email: string;
    instagram?: string;
  };
}
