import React from 'react';
import Paper from 'material-ui/Paper';
import { Todo } from '../../common';
import styles from './styles';
import './Todos.css';

const todos = [
  {
    title: 'aweqwfwfasfwfqwfafawfawfwf',
    description: 'lorem ipsum',
    completed: false,
  },
  {
    title: 'todo1',
    description: 'loragasggwwgem ipsum',
    completed: false,
  },
  {
    title: 'todo2',
    description: 'ssssfwwq fqwgqwgasg',
    completed: false,
  },
  {
    title: 'todo3',
    description: 'wfwasf wqf qw sa',
    completed: false,
  },
  {
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
  {
    title: 'todo4',
    description: 'qwd wqd afw wqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqfas f qfa fgqwgasnkifnaksfjaisfj asfaiofhkjdiju asidqopwjhwifjqajfgpoj apjfqiwfgjpqajnbnsfpawf asfijqwpofjapgpojzopj jaspjfgpogjpqwiehnhpwq qf ',
    completed: false,
  },
  {
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
  {
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
  {
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
];

export class Todos extends React.Component {
  render() {
    return (
      <div className="Todos">
        <Paper style={styles.paper} zDepth={0}>
          {todos.map((todo, i) => (
            <Todo todo={todo}
                  key={i}
                  toggleCompleted={() => {console.log('toggle todo')}}
                  edit={() => {console.log('edit todo')}} />
          ))}
        </Paper>
      </div>
    );
  }
}

export default Todos;
