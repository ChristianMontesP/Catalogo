import { Request, Response } from 'express';
import { QueryResult } from 'pg'; // Asegúrate de importar QueryResult desde 'pg'

import pool from '../database';

class GamesController {

    public async list(req: Request, res: Response): Promise<void> {
        const games: QueryResult<any> = await pool.query('SELECT * FROM game');
        res.json(games.rows); // Accede a la propiedad 'rows'
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games: QueryResult<any> = await pool.query('SELECT * FROM game WHERE id = $1', [id]);
        console.log(games.rows.length); // Accede a la propiedad 'rows'
        if (games.rows.length > 0) {
            return res.json(games.rows[0]); // Accede a la propiedad 'rows'
        }
        res.status(404).json({ text: "The game doesn't exist" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO game (title, description, image) VALUES ($1, $2, $3)', [req.body.title, req.body.description, req.body.image]);
        res.json({ message: 'Game Saved' });
      }
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const {title,description,image} = req.body;
        await pool.query('UPDATE game SET title = $1, description = $2, image = $3 WHERE id = $4', [title,description,image, id]);
        res.json({ message: "The game was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM game WHERE id = $1', [id]);
        res.json({ message: "The game was deleted" });
    }
}

const gamesController = new GamesController();
export default gamesController;
