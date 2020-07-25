export default function template(body, data){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>React</title>
        
        <link rel="stylesheet" href="/bootstrap.min.css">
        
        <script 
        src="https://kit.fontawesome.com/493c04fdc4.js" 
        crossorigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            table.table-hover tr{
                cursor: pointer;
            }
            #user-dropdown::after{
                display: none;
            }
            .panel-title a{
                display: block;
                width: 100%;
                cursor: pointer;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div id="Content">${body}</div>
        <script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>

        <script src="/env.js"></script>
        <script src="/vendor.bundle.js"></script>
        <script src="/app.bundle.js"></script>
    </body>
    
    </html>`;
}
