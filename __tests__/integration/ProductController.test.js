const supertest = require('supertest');
const dbHandler = require('../utils/db-handler');
const server = require('../../src/server');
const request = supertest(server);
const Product = require('../../src/models/Product');

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('inicio dos testes do controlador de produtos', () => {

    const product = {
        id: 1,
        name: 'cadeira'
    }

    it('deveria gravar e retornar status code 200', async () =>{

        const response = await request.post('/products').send(product).set('Accept', 'application/json');

        const getProduct = await Product.findOne({id: product.id});

        expect(response.status).toBe(200);

        expect(getProduct).not.toBe(null);
    })

    it('deveria retornar a lista de produtos', async () => {

        await Product.create(product);
        await Product.create(product);
        await Product.create(product);

        const response = await request.get('/products');     

        const list = response.body;

        expect(list).not.toBe(null);
    })

    it('deveria editar e retornar status code 200', async () => {

        await Product.create(product)

        const productEdit = {
            id: 1,
            name: 'mesa'
        }

        const response = await request.put('/products').send(productEdit).set('Accept', 'application/json');

        expect(response.status).toBe(200);

        expect(response.body.name).not.toBe(productEdit.name);
    })

    it('deveria deletar e retornar status code 200', async () => {

        await Product.create(product);

        const response = await request.delete('/products').send(product).set('Accept', 'application/json');

        const getProduct = await Product.findOne({ id: product.id });

        expect(response.status).toBe(200);

        expect(getProduct).toBe(null);
    })

})