from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, dashboard

app = FastAPI()

app.include_router(auth.router, prefix="/auth")
app.include_router(dashboard.router, prefix="/dashboard")

origins = [
    "http://localhost:4200",
    "http://garmentwise-angular",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)