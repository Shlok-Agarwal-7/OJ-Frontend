
# Online Judge Frontend

This repo houses the frontend code for the repo [Online-Judge](https://github.com/Shlok-Agarwal-7/Online-Judge), it is a `Vite + React` Frontend styled with `TailwindCSS` and `Daisy UI`

The backend is hosted on an EC2 instance on AWS and the frontend is hosted on Vercel the live project is live at [link](https://oj-frontend-tawny.vercel.app/)

## Demo

Link to the demo video of the project [Demo](https://www.loom.com/share/d3c534d2aad2441fa076b5dcb583e33a?sid=14ebe362-b710-4f96-8117-905dc8df8962)



## Features

- Syntax Higlighted Code Editor for `C++` `Java` `Python`
- Problem Tag Filtering and search functionalities 
- Praticipation in Live Contests and Live Leaderboards to gain   points 
- AI Hint Help for solving problems  
- Mentor and Student roles with responsibilites and actions 
- Run & Submit Code and view Submissions 
- Mentor can do CRUD operations on problems and Create and manage Contests



## Run Locally

Clone the project

```bash
  git clone https://github.com/Shlok-Agarwal-7/OJ-Frontend.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

This should start the frontend at PORT `5173` 


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_BACKEND_URL` set this to `http://localhost:8000` to connect to the backend which can be run using this [repo](https://github.com/Shlok-Agarwal-7/Online-Judge) 


## Contributing

Contributions are always welcome!


