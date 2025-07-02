import { Create, SimpleForm, TextInput, BooleanInput } from 'react-admin';

export const OptionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="questionId" />
      <TextInput source="text" />
      <BooleanInput source="isCorrect" />
    </SimpleForm>
  </Create>
);
