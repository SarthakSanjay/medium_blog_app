import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();

app.get('/', (c) => {
 
  return c.text('Hello Hono!')
})
// POST /api/v1/signup
// POST /api/v1/signin
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog

app.post('/api/v1/signup',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json()
  const existingUser = await prisma.user.findUnique({
    where:{email:body.email}
  })
  if(existingUser){
    return c.json({
      msg:"user is already register"
    })
  }
  try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
    const token =await sign({id:user.id} , c.env.JWT_SECRET )

		return c.json({
      jwt : token
    })
	} catch(e) {
		return c.status(403);
	}
})
app.post('/api/v1/signin',(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json()
  const existingUser = await prisma.user.findUnique({
    where:{email:body.email}
  })
  if(!existingUser){
    return c.json({
      msg:"register first"
    })
  }
  try {
		
    const token =await sign({id:user.id} , c.env.JWT_SECRET )

		return c.json({
      jwt : token
    })
	} catch(e) {
		return c.status(403);
	}
})
app.post('/api/v1/blog',(c)=>{

  return 
})
app.put('/api/v1/blog',(c)=>{

  return 
})
app.get('/api/v1/blog/:id',(c)=>{
  const id = c.req.param('id')
  return 
})

export default app
