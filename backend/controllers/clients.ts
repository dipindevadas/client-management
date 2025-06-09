import { Request, Response } from "express";
import { pool } from "../db/db";

export const createClient = async (req: Request, res: Response) => {
  const { name, email, password, job, rate, isactive } = req.body;

  try {
    const response = await pool.query(
      `
            INSERT INTO clients (name, email, password, job, rate, isactive)
           VALUES ($1,$2,$3,$4,$5,$6)
            returning *`,
      [name, email, password, job, rate, isactive]
    );

    res.status(201).json({
      message: "client created successfully",
      data: response.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: "client creation failed",
      error: error.message,
    });
  }
};

// export const getAllClients = async (req: Request, res: Response) => {
//   try {
//     const response = await pool.query(`
//             SELECT * from clients order by created_at desc`);

//     res.status(201).json({
//       message: "Data fetched successfully",
//       data: response.rows,
//       success: true,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       message: "client data fetching failed",
//       error: error.message,
//       success: false,
//     });
//   }
// };

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const response = await pool.query(
      `SELECT * FROM clients ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await pool.query(`SELECT COUNT(*) FROM clients`);
    const total = parseInt(countResult.rows[0].count);

    res.status(200).json({
      message: "Data fetched successfully",
      data: response.rows,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Client data fetching failed",
      error: error.message,
      success: false,
    });
  }
};


export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await pool.query(
      `
            SELECT * from clients where id = $1`,
      [id]
    );

    res.status(200).json({
      message: "Data fetched successfully",
      data: response.rows,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "client data fetching failed",
      error: error.message,
      success: false,
    });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await pool.query(`DELETE from clients where id = $1`, [
      id,
    ]);

    res.status(200).json({
      message: "client Deleted successfully",
      data: response.rows,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "client Deleted request failed",
      error: error.message,
      success: false,
    });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, job, rate, isactive } = req.body;

  try {
    const response = await pool.query(
      `
            UPDATE clients SET name =$1, email = $2, password = $3, job = $4, rate = $5, isactive = $6 where id = $7 returning *`,
      [name, email, password, job, rate, isactive, id]
    );

    res.status(200).json({
      message: "client updated successfully",
      data: response.rows[0],
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "client update request failed",
      error: error.message,
      success: false,
    });
  }
};

export const searchClients = async (req: Request, res: Response) => {
  const { name, email } = req.query;

  try {
    let query = `SELECT * FROM clients WHERE 1=1`;
    const values: any[] = [];
    let index = 1;

    if (name) {
      query += ` AND name ILIKE $${index++}`;
      values.push(`%${name}%`);
    }

    if (email) {
      query += ` AND email ILIKE $${index++}`;
      values.push(`%${email}%`);
    }

    const response = await pool.query(query, values);

    res.status(200).json({
      message: "Filtered clients fetched successfully",
      data: response.rows,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error while searching clients",
      error: error.message,
      success: false,
    });
  }
};



export const clientCreated = async(req:Request, res:Response)=>{

    const sort = (req.query.sort as string)?.toUpperCase() === 'DESC'? "DESC" : "ASC"; 
    try {
        const response = await pool.query(`
            SELECT * FROM clients order by created_at ${sort}`)

        res.status(200).json({
            message: "Filtered clients fetched successfully",
            data: response.rows,
            success: true
        })
        
    } catch (error: any) {
        res.status(500).json({
            message: "Error while searching clients",
            error: error.message,
            success: false
        })
        
    }
}
