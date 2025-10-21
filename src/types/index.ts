export interface Validation {
  type: 'text' | 'checkbox' | 'number' | string;
  value: string | boolean | number;
  placeholder?: string;
  label: string;
  code: string;
}

export interface FormField {
  id: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'color'
    | 'radio'
    | 'checkbox'
    | 'range'
    | 'select'
    | 'button'
    | string;
  placeholder?: string;
  render?:any,
  value?: string | number | boolean;
  validations?: Validation[];
  options?: { label: string; value: string }[];
}

export interface FormSchema {
  id: string;
  name: string;
  fields: FormField[];
}

export interface FormCollection {
  forms: FormSchema[];
}
