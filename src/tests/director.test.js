const request = require("supertest")
const app = require("../app")

const URL_DIRECTOR = '/api/v1/directors'

const director = {
    firstName: 'James',
    lastName: 'Gunn',
    nationality: 'San Luis, Misuri, Estados Unidos',
    image: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRIOsYOJ7cWGBbp6PHv4n5NokHGJfOpLJ9BoK4eE0b8bOHIl_UDpi4a96NnDGofAoT5',
    birthday: '1966-08-05'
}

let directorId

test("POST -> 'URL_DIRECTOR', should return status code 201 and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
        .post(URL_DIRECTOR)
        .send(director)
    directorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)

})

test("GET 'URL_DIRECTOR', should return status code 200, and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_DIRECTOR)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Get One -> 'URL_DIRECTOR/:id', should return status code 200, and res.body.firstName === directors.firstName", async () => {
    const res = await request(app)
      .get(`${URL_DIRECTOR}/${directorId}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("PUT -> 'URL_DIRECTOR/:id', should return status code 200, and res.body.firstName === directorUpdate.firstName", async () => {
    const directorUpdate = {
        firstName: 'Francis'
    }
  
    const res = await request(app)
      .put(`${URL_DIRECTOR}/${directorId}`)
      .send(directorUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
})

test("DELETE -> 'URL_DIRECTOR/:id', should return status code 204", async () => {
  
    const res = await request(app)
      .delete(`${URL_DIRECTOR}/${directorId}`)
  
    expect(res.status).toBe(204)
})