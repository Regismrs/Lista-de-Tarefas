import { NumberFormatStyle } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit, DoCheck {

    public tarefas:Array<any> = []
    public newtodoValue:string = ''
    public tarefasCompleted:number = 0

    constructor() {

    }

    ngOnInit() {
        //this.tarefas = JSON.parse(localStorage.getItem("lista-de-tarefas"))
        const listFromLocalStorage = localStorage.getItem("lista-de-tarefas")
        if (listFromLocalStorage)
            this.tarefas = JSON.parse(listFromLocalStorage)
    }

    ngDoCheck() {
        this.tarefas.sort( (a, b) => { return Number(a.completed) - Number(b.completed) })
        localStorage.setItem("lista-de-tarefas", JSON.stringify(this.tarefas) )
        this.tarefasCompleted = this.tarefas.filter( (t) => t.completed ).length
    }

    onKeyUpEnter() {
        let value = this.newtodoValue
        if (value == '')
        {
            alert("Informe a tarefa e confirme com ENTER. Para cancelar use a tecla ESC")
        }
        else
        {
            this.newtodoValue = ''
            this.tarefas?.unshift({title: value, completed: false})
        }
        console.info(this.tarefas)
    }

    onKeyUpEsc() {
        this.newtodoValue = ''
    }

    onComplete(index:number) {
        //let tarefa = this.tarefas[index]
        //this.tarefas[index].completed = !tarefa.completed
    }

    deleteTodo(index:number) {
        if (window.confirm("Tem certeza que deseja excluir essa tarefa?"))
            if (this.tarefas[index].completed) this.tarefasCompleted--
            this.tarefas.splice(index, 1)
    }

    percentListCompleted () {
        return (100 * this.tarefasCompleted / this.tarefas.length).toFixed(1)
    }
}
