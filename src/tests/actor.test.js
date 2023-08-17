const request = require("supertest")
const app = require("../app")

const URL_ACTOR = '/api/v1/actors'

const actor = {
    firstName: 'Chris',
    lastName: 'Hemsworth',
    nationality: 'Ciudad de Melbourne, Australia',
    image: 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRFvb914G4vrHju77YpNyFrK-kirzzZdlm6HAlnC-L3KyJ--XMn24PfV2bDPyROkUzM',
    birthday: "1983-08-11"
}

let actorId

test("POST -> 'URL_ACTOR', should return status code 201 and res.body.name === actor.name", async () => {
    const res = await request(app)
        .post(URL_ACTOR)
        .send(actor)
    actorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
})

test("GET 'URL_ACTOR', should return status code 200, and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_ACTOR)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

test("Get One -> 'URL_ACTOR/:id', should return status code 200, and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
      .get(`${URL_ACTOR}/${actorId}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("PUT -> 'URL_ACTOR/:id', should return status code 200, and res.body.firstName === actorUpdate.firstName", async () => {
    const actorUpdate = {
      firstName: "Pedro"
    }
  
    const res = await request(app)
      .put(`${URL_ACTOR}/${actorId}`)
      .send(actorUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
})

test("DELETE -> 'URL_ACTOR/:id', should return status code 204", async () => {
  
    const res = await request(app)
      .delete(`${URL_ACTOR}/${actorId}`)
  
    expect(res.status).toBe(204)
})