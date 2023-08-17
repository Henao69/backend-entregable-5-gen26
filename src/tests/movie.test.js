const request = require("supertest")
const app = require("../app")
const Genre = require("../models/Genre")
const Actor = require("../models/Actor")
const Director = require("../models/Director")

require("../models")

const URL_MOVIES = '/api/v1/movies'

const movie = {
    name: 'Guardianes',
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLIFeyzz2E6C_e7KdGTIWmwbOU6AmC07nqYnZ1rcQXrbcgJcxe',
    synopsis: 'Un aventurero espacial se convierte en la presa de unos cazadores de tesoros después de robar el orbe de un villano traicionero',
    releaseYear: 2014
}

let movieId

test("POST -> 'URL_MOVIES', should return status code 201 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(URL_MOVIES)
        .send(movie)
    movieId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("GET 'URL_MOVIES', should return status code 200, and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_MOVIES)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

test("Get One -> 'URL_MOVIES/:id', should return status code 200, and res.body.name === movie.name", async () => {
    const res = await request(app)
      .get(`${URL_MOVIES}/${movieId}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("PUT -> 'URL_MOVIES/:id', should return status code 200, and res.body.name === movieUpdate.name", async () => {
    const movieUpdate = {
      name: "Guardianes de la Galaxia"
    }
  
    const res = await request(app)
      .put(`${URL_MOVIES}/${movieId}`)
      .send(movieUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
})

test("POST -> 'URL_MOVIES/:id/genres', should return status code 200 and res.body.length === 1", async () => {
  const genre = {
    name: "Fantasy"
  }
  const createGenre = await Genre.create(genre)

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/genres`)
    .send([createGenre.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createGenre.id)

  await createGenre.destroy()
})

test("POST -> 'URL_MOVIES/:id/actors', should return status code 200 and res.body.length === 1", async () => {
  const actor = {
    firstName: 'Chris',
    lastName: 'Hemsworth',
    nationality: 'Ciudad de Melbourne, Australia',
    image: 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRFvb914G4vrHju77YpNyFrK-kirzzZdlm6HAlnC-L3KyJ--XMn24PfV2bDPyROkUzM',
    birthday: "1983-08-11"
  }
  const createActor = await Actor.create(actor)

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/actors`)
    .send([createActor.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createActor.id)

  await createActor.destroy()
})

test("POST -> 'URL_MOVIES/:id/directors', should return status code 200 and res.body.length === 1", async () => {
  const director = {
    firstName: 'James',
    lastName: 'Gunn',
    nationality: 'San Luis, Misuri, Estados Unidos',
    image: 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRIOsYOJ7cWGBbp6PHv4n5NokHGJfOpLJ9BoK4eE0b8bOHIl_UDpi4a96NnDGofAoT5',
    birthday: '1966-08-05'
  }
  const createDirector = await Director.create(director)

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/directors`)
    .send([createDirector.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createDirector.id)

  await createDirector.destroy()
})

test("DELETE -> 'URL_MOVIES/:id', should return status code 204", async () => {
  
    const res = await request(app)
      .delete(`${URL_MOVIES}/${movieId}`)
  
    expect(res.status).toBe(204)
})