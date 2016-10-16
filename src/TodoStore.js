class TodoStore {
    todos = []

    get completedTodosCount(){
        return this.todos.filter(
             todo => todo.completed
        )
    }

}