import { Seeder } from 'mongo-seeding'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const seeder = new Seeder({
	database: process.env.MONGO_URI,
	dropDatabase: true
})
const collections = seeder.readCollectionsFromPath(
	path.resolve('data/initial-seed')
)

seeder
	.import(collections)
	.then(() => console.log('succesfully seeded mongo'))
	.catch(err => console.error('failed to seed mongo', err))
