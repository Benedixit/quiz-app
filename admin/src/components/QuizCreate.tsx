import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, BooleanInput } from 'react-admin';

export const QuizCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <TextInput source="description" fullWidth multiline />

      <ArrayInput source="questions">
        <SimpleFormIterator>
          <TextInput source="text" label="Question Text" fullWidth />
          <ArrayInput source="choices">
            <SimpleFormIterator>
              <TextInput source="text" label="Choice Text" fullWidth />
              <BooleanInput source="is_correct" label="Is Correct?" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

