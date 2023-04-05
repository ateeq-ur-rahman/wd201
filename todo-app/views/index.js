<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="<%= csrfToken %>" >
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="./css/styles.css" rel="stylesheet"> 
    <title>TO-DO Manager</title>
    <script>
        var token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
        function updateTodo(id)
        {
            // console.log('/todos/${id}/markAsCompleted');
            fetch(`/todos/${id}/markAsCompleted`, {
                method: "put",
                Headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    "_csrf":token
                })
            })
            .then((res) =>
            {
                window.location.reload();
            })
            .catch((err) => console.error(err));
        }
        function deleteTodo(id)
        {
            fetch(`/todos/${id}`,{
                method:"delete",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    "_csrf":token
                })
            })
            .then((res) => {
                if(res.ok){
                    window.location.reload();
                }
            })
            .catch((err)=>console.error(err))
        }
    </script>
</head>
<body>
    <div class="grid grid-cols-6">
        <div class="col-start-3 col-span-2">
            <%- include('header.ejs') %>
            <form action="/todos" method="post">
                <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
                <div class="flex gap-2 py-4">
                    <div class="flex-auto">
                        <input type="text" name="title" placeholder="whats next?" class="border border-gray-300 rounded text-gray-900 w-full p-2 text-sm" required />
                    </div>
                
                    <div class="flex-auto">
                        <input type="date" name="dueDate" class="border border-gray-300 rounded text-gray-900 w-full p-2 text-sm leading-4">
                    </div>
                
                
                    <div class="flex-none">
                        <button type="submit" class="bg-green-500 text-white px-5 py-2 rounded font-medium mr-2 py1.5">Add</button>
                    </div>
                </div>
                
               
                
            </form>
           
            <%- include("todos.ejs") %>
            <!-- <%- include('footer.ejs') %> -->
        </div>
    </div>
    
</body>
</html>
