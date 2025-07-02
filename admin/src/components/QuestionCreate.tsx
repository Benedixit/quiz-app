import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const QuestionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="quizId" />
      <TextInput source="text" />
      <NumberInput source="order" />
    </SimpleForm>
  </Create>
);
