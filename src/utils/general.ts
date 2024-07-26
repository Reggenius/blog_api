import { AppDataSource } from "../data-source";

const getRepo = (Entity) => {
    return AppDataSource.getRepository(Entity);
}

export default getRepo;