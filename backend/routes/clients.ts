import express from "express";
import { clientCreated, createClient, deleteClient, getAllClients, getClientById, searchClients, updateClient } from "../controllers/clients";
const router = express.Router();

router.post('/', createClient)

router.get('/', getAllClients)

router.get('/search', searchClients)

router.get('/created', clientCreated)

router.get('/:id', getClientById)

router.delete('/:id', deleteClient )

router.put('/:id', updateClient)




export default router;