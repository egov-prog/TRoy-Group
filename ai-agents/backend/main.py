from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def root():
    return {"message": "TRoy Group AI Agents Ready"}

@app.get("/trometry")
def tromet():
    return {"message": "TRoyMAR online"}

@app.get("/troygo")
def troygo():
    return {"message": "TRoyGo online"}

@app.get("/troyt")
def troyt():
    return {"message": "TRoyTR online"}

@app.get("/troygar")
def troygar():
    return {"message": "TRoyGAR online"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
