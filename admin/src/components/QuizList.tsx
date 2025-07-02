import { List, DataTable } from 'react-admin';

 export  const QuizList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="title" />
      <DataTable.Col source="description" />
    </DataTable>
  </List>
);


