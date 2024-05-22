const req = require("supertest");
const app = require("./src/app.js");
const { Restaurant } = require("./models");
const syncSeed = require("./seed.js");
const express = require("express");

let restQuantity;

beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll({});
    restQuantity = restaurants.length;
});

describe("get", () => {
    test("returns all restaurants", async () => {
        const res = await request(app).get("/restaurants");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty("cuisine");
    });
    test("returns correct number of restaurants", async () => {
        const res = await request(app).get("/restaurants");
        expect(res.body.length).toEqual(restQuantity);
    });
    test("returns correct data", async () => {
        const res = await request(app).get("/restaurants");
        expect(res.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            })
        );
    });
    test("returns correct data", async () => {
        const res = await request(app).get("/restaurants/1");
        expect(res.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: "AppleBees",
                location: "Texas",
                cuisine: "FastFood"
            })
        );
    });

});


describe("post", () => {
    test("can add items to array", async () => {
        const res = await request(app)
        .post("/restaurants")
        .send({ name: "qwe", location: "asd", cuisine: "zxc"});
    expect(res.body.length).toEqual(restQuantity+1);
    });
});


describe("put", () => {
    test("should update first item in database", async () => {
        await request(app)
        .put("/restaurants/1")
        .send({ name: "qwe", location: "asd", cuisine: "zxc"});
        const restaurant = await Restaurant.findByPk(1);
        expect(restaurant.name).toEqual("qwe");
    });
});


describe("delete", () => {
    test("deletes first item in database", async () => {
        await request(app).delete("/restaurants/1");
        const restaurants = await Restaurant.findAll({});
        expect(restaurants.length).toEqual(restQuantity);
        expect(restaurants[0].id).not.toEqual(1);
    })
});

syncSeed();

module.exports = syncSeed;