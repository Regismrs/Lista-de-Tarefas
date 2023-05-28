import { NumberFormatStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent {

    public tarefas:Array<any> = []
    public newtodoValue:string = ''
    public tarefasCompleted:number = 0

    constructor() {

    }

    ngOnInit() {
        // loading from localStorage()
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

    onComplete(index:number, complete:boolean) {
        console.info("Complete")
        let tarefa = this.tarefas[index]
        if (complete) {
            this.tarefas?.splice(index, 1)
            this.tarefasCompleted++
            setTimeout( () => this.tarefas?.push(tarefa), 100)
        }
        else
        {
            this.tarefas?.splice(index, 1)
            this.tarefasCompleted--
            setTimeout( () => this.tarefas?.unshift(tarefa), 10)
        }
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
