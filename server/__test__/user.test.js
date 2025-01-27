const app = require("../app")
const request = require("supertest")
const {test, describe, expect, afterAll, beforeAll} = require("@jest/globals")
const { sequelize } = require("../models")
const { hashing } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
let token

beforeAll(async()=>{
    try {
        await sequelize.queryInterface.bulkInsert("Users",[
            {
                name: "muiz",
                email: "muiz@mail.com",
                password:hashing("123456"),
                role:"admin",
                createdAt:new Date(),
                updatedAt:new Date()
            }
        ], {})
        token = signToken({id:1})
    } catch (error) {
        console.log(error, ">>>>>>>>>>>>>> error bulk insert");
    }
    
})


afterAll(async()=>{
    await sequelize.queryInterface.bulkDelete("Users", null, {
        truncate:true,
        cascade:true,
        restartIdentity:true
    })
})

describe("POST users", ()=>{
    //REGISTER SUCCESS CASE
    test("POST user should be able to create new user", async()=>{
        const data = {
            name: "rahmat",
            email: "rahmat@mail.com",
            password:"123456",
            role:"admin"
        }

        const response = await request(app).post("/users/register")
        .send(data)
        
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "User registeres successfully")
    })

    //REGISTER ERROR CASE
    test("POST user should be error because name is empty", async()=>{
        const data = {
            email: "rahmat@mail.com",
            password:"123456",
            role:"admin"
        }

        const response = await request(app).post("/users/register")
        .send(data)

        expect(response.status).toBe(400)
        expect(response.body).toMatch("name is required")
    })

    test("POST user should be error because email not unique", async()=>{
        const data = {
            name: "rahmat",
            email:"rahmat@mail.com",
            password:"123456",
            role:"admin"
        }

        const response = await request(app).post("/users/register")
        .send(data)

        expect(response.status).toBe(400)
        expect(response.body).toMatch("email must be unique")
    })

    test("POST user should be error because email is empty", async()=>{
        const data = {
            name: "rahmat",
            password:"123456",
            role:"admin"
        }

        const response = await request(app).post("/users/register")
        .send(data)

        expect(response.status).toBe(400)
        expect(response.body).toMatch("email is required")
    })

    test("POST user should be error because invalid email format", async()=>{
        const data = {
            name: "rahmat",
            email:"rahmatS",
            password:"123456",
            role:"admin"
        }

        const response = await request(app).post("/users/register")
        .send(data)

        expect(response.status).toBe(400)
        expect(response.body).toMatch("incorrect email format")
    })

    test("POST user should be error because less password", async()=>{
        const data = {
            name: "sultan",
            email: "sultan@mail.com",
            password:"1256",
            role:"admin"
        }

        const response = await request(app).post("/users/register")
        .send(data)
        
        expect(response.status).toBe(400)
        expect(response.body).toMatch("password must be at least 6 characters long")
    })

    test("POST user should be error because password is empty", async()=>{
        const data = {
            name: "adi",
            email: "adi@mail.com",
            role:"admin"
        }

        const response = await request(app).post("/users/register")
        .send(data)
        
        expect(response.status).toBe(400)
        expect(response.body).toMatch("password is required")
    })

    test("POST user should be error because role is empty", async()=>{
        const data = {
            name: "hardin",
            email: "hardin@mail.com",
            password:"123456",
        }

        const response = await request(app).post("/users/register")
        .send(data)
        
        expect(response.status).toBe(400)
        expect(response.body).toMatch("role is required")
    })

    //LOGIN SUCCESS CASE
    test("POST user should be able to login", async()=>{
        const data = {
            email:"muiz@mail.com",
            password:"123456",
        }

        const response = await request(app).post("/users/login")
        .send(data)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("token", expect.any(String))
    })

    //LOGIN ERROR CASE
    test("POST user login should be error because empty email", async()=>{
        const data = {
            email:"",
            password:"123456"
        }

        const response = await request(app).post("/users/login")
        .send(data)

        expect(response.status).toBe(400)
        expect(response.body).toMatch("request body required!")
    })

    test("POST user login should  be error because empty password", async()=>{
        const data = {
            email:"muiz@mail.com",
            password:""
        }

        const response = await request(app).post("/users/login")
        .send(data)

        expect(response.status).toBe(400)
        expect(response.body).toMatch("request body required!")
    })

    test("POST user login should be error wrong email", async()=>{
        const data = {
            email:"Brian@mail.com",
            password:"123456"
        }

        const response = await request(app).post("/users/login")
        .send(data)

        expect(response.status).toBe(401)
        expect(response.body).toMatch("invalid email or password")
    })

    test("POST user login should be error wrong password", async()=>{
        const data = {
            email:"muiz@mail.com",
            password:"xxxxx"
        }

        const response = await request(app).post("/users/login")
        .send(data)

        expect(response.status).toBe(401)
        expect(response.body).toMatch("invalid email or password")
    })
})

describe("GET users", ()=>{
    test("GET users should be able for get user data", async()=>{
    const response = await request(app).get("/users/profile")
    .set(`authorization`, `Bearer ${token}`)

    expect(response.status).toBe(200)
    })
})

describe("PUT users", ()=>{
    test("PUT users should be able for update user data", async()=>{
        const newData = {
            name:"mardin",
            email:"mardin@mail.com",
            password:"456789"
        }

        const response = await request(app).put("/users/update")
        .set("authorization", `Bearer ${token}`)
        .send(newData)

        expect(response.status).toBe(200)
    })
})