import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

import { Todo } from '../Todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  domain: string = "http://localhost:3000/todos";

  constructor( private http: HttpClient ) { }

  getTodos(){
    return this.http.get<Todo[]>(`${this.domain}/`)
      .pipe(map(res => res));
  }

  addTodo(newTodo: Todo){
    return this.http.post<Todo>(`${this.domain}/`, newTodo)
      .pipe(map(res => res));
  }

  deleteTodo(id: any){
    return this.http.delete<Todo>(`${this.domain}/${id}`)
      .pipe(map(res => res));
  }

  updateTodo(newTodo: Todo){
    return this.http.put(`${this.domain}/${newTodo._id}`, newTodo)
      .pipe(map(res => res));
  }

}
