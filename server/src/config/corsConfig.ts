
const allowedUrls = ['http://localhost:5000']

export const corsOptions = {
  origin: (origin: any, callback:(a:any, b:any) => void) => {
    allowedUrls.includes(origin) ? callback(null, true) : callback(null, new Error('NOT ALLOWED BY CORS'))
  },
  credential: true,
  optionsSuccessStatus: 200
}