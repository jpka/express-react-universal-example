import { Seeder } from 'mongo-seeding'
import mongoConf from '../config/mongo.json'
import path from 'path'

const seeder = new Seeder({
	database: mongoConf,
	dropDatabase: true
})
const collections = seeder.readCollectionsFromPath(
	path.resolve('data/initial-seed')
)

seeder
	.import(collections)
	.then(() => console.log('succesfully seeded mongo'))
	.catch(err => console.error('failed to seed mongo', err))
