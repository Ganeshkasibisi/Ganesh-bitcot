export interface Contact {
  id: string;
  name: string;
  mobile: string;
  email: string;
}

export interface ContactFormData extends Omit<Contact, 'id'> {}