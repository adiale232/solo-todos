import { Component, OnInit } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  title: string;
  description: string;
  completed: boolean;

  constructor(private todosService: TodosService) {
    this.todosService.getTodos()
      .subscribe(todos => {
        this.todos = todos;
        console.log(this.todos);
      });
   }

  ngOnInit(): void {  }


  addTodo(event: any){
    event.preventDefault();

    const newTodo: Todo = {
      title:        this.title,
      description:  this.description,
      completed:    false
    };

    this.todosService.addTodo(newTodo)
      .subscribe(todo => {
        this.todos.push(todo);
        this.title = '';
        this.description = ''
      });
  }


  deleteTodo(id: any){
    const response = confirm('Are you sure you want to delete the ToDo?');
    if(response){
      const todos = this.todos;
      this.todosService.deleteTodo(id)
        .subscribe(data => {
          if(data.n == 1){
            for(let i = 0; i < todos.length; i++){
              if(todos[i]._id == id){
                todos.splice(i, 1);
              }
            }
          }
        });
    }
    return;
  }


  updateTodo(todo: Todo){

    const newTodo = {
      _id:          todo._id,
      title:        todo.title,
      description:  todo.description,
      completed:    !todo.completed
    };

    this.todosService.updateTodo(newTodo)
      .subscribe(res => {
        todo.title =        todo.title,
        todo.description =  todo.description,
        todo.completed =    !todo.completed
      });
  }

}
