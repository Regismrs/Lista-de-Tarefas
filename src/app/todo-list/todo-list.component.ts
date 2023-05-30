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

    ngOnInit() {
        const listFromLocalStorage = localStorage.getItem("lista-de-tarefas")
        if (listFromLocalStorage)
            this.tarefas = JSON.parse(listFromLocalStorage)
    }

    ngDoCheck() {
        this.tarefas = this.tarefas.sort( (a, b) => { return Number(a.completed) - Number(b.completed) })
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
            this.tarefas?.unshift({uid: this.shuffleId(), title: value, completed: false})
        }
    }

    onKeyUpEsc() {
        this.newtodoValue = ''
    }

    removeTarefa(index:number):void{
        const resposta =  confirm("Tem certeza que deseja excluir essa tarefa?")
        console.info(resposta)
            
    }

    percentListCompleted () {
        return (100 * this.tarefasCompleted / this.tarefas.length).toFixed(1)
    }

    trackByID(index:number, item:any):string {
        return item.uid
    }

    shuffleId (len:number=5):string {
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const array = chars.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('').substring(0, len)
    }
}
