import { Admin, Resource, ListGuesser } from 'react-admin';
import { QuizCreate } from './components/QuizCreate'
import dataProvider from './dataProvider';

const App = () => (
  
  <Admin dataProvider={dataProvider} disableTelemetry>
    <Resource name="quizzes" list={ListGuesser}  create={QuizCreate} />
  </Admin>
);


export default App;

/** 

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="quizzes" list={ListGuesser} create={QuizCreate} />
      <Resource name="questions" list={ListGuesser} create={QuestionCreate} />
      <Resource name="options" list={ListGuesser} create={OptionCreate} />
    </Admin>
  );
}

export default App;

*/
