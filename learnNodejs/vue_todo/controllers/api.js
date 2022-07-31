const APIError = require('../rest').APIError;

var gid = 0;

function nextId() {
    gid++;
    return 't' + gid;
}

var todos = [
    {
        id: nextId(),
        name: 'Learn Git',
        description: 'Learn how to use git as distributed version control'
    },
    {
        id: nextId(),
        name: 'Learn JavaScript',
        description: 'Learn JavaScript, Node.js, NPM and other libraries'
    },
    {
        id: nextId(),
        name: 'Learn Python',
        description: 'Learn Python, WSGI, asyncio and NumPy'
    },
    {
        id: nextId(),
        name: 'Learn Java',
        description: 'Learn Java, Servlet, Maven and Spring'
    }
];

module.exports = {
    'GET /api/todos': async (ctx, next) => {
        ctx.rest({
            todos: todos
        });
    },

    'POST /api/todos': async (ctx, next) => {
        var t = ctx.request.body;
        var todo;

        if (!t.name || !t.name.trim()) {
            throw new APIError('invalid_input', 'Missing name');
        }

        if (!t.description || !t.description.trim()) {
            throw new APIError('invalid_input', 'Missing description');
        }

        todo = {
            id: nextId(),
            name: t.name.trim(),
            description: t.description.trim()
        };
        todos.push(todo);
        ctx.rest(todo);
    },

    'PUT /api/todos/:id': async (ctx, next) => {
        var t = ctx.request.body;
        var index = -1;
        var todo;

        if (!t.name || !t.name.trim()) {
            throw new APIError('invalid_input', 'Missing name');
        }

        if (!t.description || !t.description.trim()) {
            throw new APIError('invalid_input', 'Missing description');
        }

        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id === ctx.params.id) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            throw new APIError('notfound', 'Todo not found by id: ' + ctx.params.id);
        }

        todo = todos[index];
        todo.name = t.name.trim();
        todo.description = t.description.trim();
        ctx.rest(todo);
    },

    'DELETE /api/todos/:id': async (ctx, next) => {
        var index = -1;
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id === ctx.params.id) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            throw new APIError('notfound', 'Todo not found by id: ' + ctx.params.id);
        }
        ctx.rest(todos.splice(index, 1)[0]);
    }
};