from main import *
import uvicorn


if __name__=='__main__':
    port=int(os.getenv('PORT')) if os.getenv('PORT') else 8000
    uvicorn.run('main:app',reload=True,workers=1,port=port)
