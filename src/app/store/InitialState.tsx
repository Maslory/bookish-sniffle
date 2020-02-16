const initialState: {
  array_case: Array<{
    id: number;
    name: string;
    email: string;
    address: Array<{
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: Array<{ lat: string; lng: string }>;
      phone: string;
      website: string;
      company: Array<{
        name: string;
        catchPhrase: string;
        bs: string;
      }>;
    }>;
  }>;
  array_todo: Array<{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }>;
  request: any;
  selectId: any;

  edit_todo: any;
} = {
  array_case: [],
  array_todo: [],
  request: false,
  selectId: {},
  edit_todo: {}
};

export default initialState;
