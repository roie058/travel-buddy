import dbConnect from '../../../lib/dbConnect'
import  User from '../../../models/User'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler (req:NextApiRequest, res:NextApiResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        // @ts-ignore
        const users = await User.find({})
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        // @ts-ignore
        const user = await User.create(req.body)
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}